using System.Transactions;
using ActiveProbeCore.BL;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using ActiveProbe.DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services;
using Microsoft.AspNetCore.Http;
using ActiveProbe.Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Security.Principal;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services.Identity.Logger;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;
using ActiveProbeCore.HostedService;
using ActiveProbe.Utils.Tools.Mail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ActiveProbeCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public const string EmailConfirmationTokenProviderName = "KKOMAsia@99_06_28";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddLogging((opt) =>
            {
                opt.ClearProviders();
                opt.AddConsole(); //write log on console
                opt.AddDebug();   //write log on debug mode             
                opt.AddFile(Configuration.GetSection("Logging")); //log write in this file
                                                                  // opt.AddTraceSource("ActiveProbe Logger ");            
            });
            // omid-add , handle https Redirection Port
            // services.AddHttpsRedirection(Option=>{
            //     Option.HttpsPort = 50012;
            //     Option.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
            // });
            // In production, the Angular files will be served from this directory

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            AddCustomOptions(services);           
            CustomIdentity(services);
            CustomDIContainer(services);
            CustomJwt(services);
            CustomAuthorize(services);
            services.AddHttpContextAccessor();
            services.AddCors();
            services.AddControllers().AddNewtonsoftJson(x =>
                     x.SerializerSettings.ReferenceLoopHandling =
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore);                //Add for looping

            services.AddHostedService<TimedHostedService>();
        }
        public void AddCustomOptions(IServiceCollection services)
        {
            Util.ConnectionStrings = Configuration.GetConnectionString("localConnection");
            services.AddDbContext<ActiveProbeCoreContext>(
             //options => options.UseSqlServer(Configuration.GetConnectionString("localConnection"))
             options => options.UseSqlServer(Util.ConnectionStrings)
             );
            services.AddOptions<BearerTokens>()
               .Bind(Configuration.GetSection("Project:BearerTokens"))
               .Validate(bearerTokens =>
               {
                   return bearerTokens.AccessTokenExpirationMinutes < bearerTokens.RefreshTokenExpirationMinutes;
               },
               "RefreshTokenExpirationMinutes is less than AccessTokenExpirationMinutes. Obtaining new tokens using the refresh token should happen only if the access token has expired.");
            services.AddOptions<ApiSettings>().Bind(Configuration.GetSection("Project:ApiSettings"));

            services.Configure<ConfigurationsVm>(Configuration.GetSection(ConfigurationsVm.Project));
        }
        private void CustomJwt(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = Configuration["Project:BearerTokens:Issuer"],
                    ValidAudience = Configuration["Project:BearerTokens:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Project:BearerTokens:Key"])),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                cfg.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        var logger = context.HttpContext.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger(nameof(JwtBearerEvents));
                        logger.LogError("Authentication failed.", context.Exception);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        var tokenValidatorService = context.HttpContext.RequestServices.GetRequiredService<ITokenValidatorService>();
                        return tokenValidatorService.ValidateAsync(context);
                    },
                    OnMessageReceived = context =>
                    {
                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        var logger = context.HttpContext.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger(nameof(JwtBearerEvents));
                        logger.LogError("OnChallenge error", context.Error, context.ErrorDescription);
                        return Task.CompletedTask;
                    }
                };
            });
            ;
        }
        private void CustomAuthorize(IServiceCollection services)
        {
            services.AddScoped<IAuthorizationHandler, KkomAuthorizationHandler>();
            services.AddAuthorization(opts =>
            {
                opts.AddPolicy(
                   name: ConstantPolicies.dynKkomAuthorization,
                   configurePolicy: policy =>
                   {
                       policy.RequireAuthenticatedUser();
                       policy.Requirements.Add(new KkomAuthorize());
                   });

            });
        }      
        private void CustomDIContainer(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //Custom class for find contoller and action dynamic
            services.AddSingleton<IMvcActionsDiscoveryService, MvcActionsDiscoveryService>();

            services.AddScoped<IPrincipal>(provider =>
                provider.GetService<IHttpContextAccessor>()?.HttpContext?.User ?? ClaimsPrincipal.Current);

            services.AddTransient<IMailService, MailService>();
            //Identity
            services.AddScoped<IApcRoleStore, ApcRoleStore>();
            services.AddScoped<RoleStore<Role, ActiveProbeCoreContext, int, UserRole, RoleClaim>,
                                      ApcRoleStore>();

            services.AddScoped<IApcRoleManager, ApcRoleManager>();
            services.AddScoped<RoleManager<Role>, ApcRoleManager>();

            services.AddScoped<IApcUserStore, ApcUserStore>();
            services.AddScoped<UserStore<User, Role, ActiveProbeCoreContext, int, UserClaim, UserRole, UserLogin, UserToken, RoleClaim>, ApcUserStore>();

            services.AddScoped<IApcUserManager, ApcUserManager>();
            services.AddScoped<UserManager<User>, ApcUserManager>();

            services.AddScoped<IApcSignInManager, ApcSignInManager>();
            services.AddScoped<SignInManager<User>, ApcSignInManager>();

            services.AddScoped<IUserClaimsPrincipalFactory<User>, ApcClaimsPrincipalFactory>();
            services.AddScoped<UserClaimsPrincipalFactory<User, Role>, ApcClaimsPrincipalFactory>();
            services.AddScoped<IIdentityDbInitializer, IdentityDbInitializer>();
            services.AddScoped<ISecurityTrimmingService, SecurityTrimmingService>();
            services.AddScoped<IAppLogItemsService, AppLogItemsService>();

            services.AddSingleton<ISecurityService, SecurityService>();
            services.AddScoped<ITokenStoreService, TokenStoreService>();
            services.AddScoped<ITokenValidatorService, TokenValidatorService>();
            services.AddScoped<ITokenFactoryService, TokenFactoryService>();

            //ActiveProbe
            services.AddScoped<ILogErrService, LogErrService>();
            services.AddScoped<IUnitOfWork, ActiveProbeCoreContext>();
            services.AddScoped<ITestService, TestService>();
            services.AddScoped<IMachineService, MachineService>();
            services.AddScoped<IMachineGroupService, MachineGroupService>();
            services.AddScoped<IMachineTypeService, MachineTypeService>();
            services.AddScoped<IMachineVersionService, MachineVersionService>();
            services.AddScoped<IMachineVersionDetailService, MachineVersionDetailService>();
            services.AddScoped<IMachineVersionGroupService, MachineVersionGroupService>();
            services.AddScoped<ITestTypeService, TestTypeService>();
            services.AddScoped<IDefinedTestMachineService, DefinedTestMachineService>();
            services.AddScoped<IDefinedTestMachineGroupService, DefinedTestMachineGroupService>();
            services.AddScoped<IOTTService, OTTService>();
            services.AddScoped<IOTTServiceTest, OTTServiceTestService>();
            services.AddScoped<ITestDataTypeService, TestDataTypeService>();
            services.AddScoped<ITestDataService, TestDataService>();
            services.AddScoped<IBandService, BandService>();
            services.AddScoped<IChannelService, ChannelService>();
            services.AddScoped<ICommandOnMediaService, CommandOnMediaService>();
            services.AddScoped<ICommandService, CommandService>();
            services.AddScoped<IDateTestModelService, DateTestModelService>();
            services.AddScoped<IDirectionService, DirectionService>();
            services.AddScoped<IFieldColorThresholdService, FieldColorThresholdService>();
            services.AddScoped<IInfoPacketService, InfoPacketService>();
            services.AddScoped<IIPTypeService, IPTypeService>();
            services.AddScoped<ILogFilePartitionTypeService, LogFilePartitionTypeService>();
            services.AddScoped<IMachineConnectionHistoryService, MachineConnectionHistoryService>();
            services.AddScoped<IMinSpeedService, MinSpeedService>();
            services.AddScoped<INetworkService, NetworkService>();
            services.AddScoped<INetworkTestResultFildService, NetworkTestResultFildService>();
            services.AddScoped<IOperatorService, OperatorService>();
            services.AddScoped<IRepeatTypeService, RepeatTypeService>();
            services.AddScoped<ISyncDetailService, SyncDetailService>();
            services.AddScoped<ISyncMasterService, SyncMasterService>();
            services.AddScoped<ITestResultService, TestResultService>();
            services.AddScoped<IZonePointService, ZonePointService>();
            services.AddScoped<IZonesService, ZonesService>();
            services.AddScoped<IZonesKmlService, ZonesKmlService>();
            services.AddScoped<IRecievedCommandService, RecievedCommandService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<INotificationService, NotificationService>();
            //initDB
            services.BuildServiceProvider().GetRequiredService<IIdentityDbInitializer>().SeedData();
        }
        private void CustomIdentity(IServiceCollection services)
        {
            services.AddIdentity<User, Role>(IdnOpt =>
            {
                //password
                IdnOpt.Password.RequireDigit = false;
                IdnOpt.Password.RequireLowercase = false;
                IdnOpt.Password.RequireUppercase = false;
                IdnOpt.Password.RequireNonAlphanumeric = false;
                IdnOpt.Password.RequiredLength = 3;
                //confirm email    
                IdnOpt.SignIn.RequireConfirmedEmail = false;
                IdnOpt.SignIn.RequireConfirmedPhoneNumber = false;
                //user
                IdnOpt.User.RequireUniqueEmail = false;
                //Lockout
                IdnOpt.Lockout.AllowedForNewUsers = true;

            })
              .AddUserStore<ApcUserStore>()
              .AddUserManager<ApcUserManager>()
              .AddRoleStore<ApcRoleStore>()
              .AddRoleManager<ApcRoleManager>()
              .AddSignInManager<ApcSignInManager>()
              .AddErrorDescriber<CustomIdentityErrorDescriber>()
              .AddDefaultTokenProviders()
              .AddTokenProvider<ConfirmEmailDataProtectorTokenProvider<User>>(EmailConfirmationTokenProviderName);
        }
       
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDatabaseErrorPage();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            //app.UseHttpsRedirection();//redirect http to https
            app.UseStaticFiles();

            //Addeby omid 98-12-15,
            //he second call enables directory browsing of the wwwroot/Share
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Share")),
                RequestPath = "/Share"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Share", "Voices")),
                RequestPath = "/Voices"
            });
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
