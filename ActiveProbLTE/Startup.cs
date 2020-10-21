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
            //Util.ConnectionStrings = Configuration.GetConnectionString("localConnection");
            Util.ConnectionStrings = Configuration.GetConnectionString("localConnection");

            services.AddHttpContextAccessor();
            services.AddDbContext<ActiveProbeCoreContext>(
                //options => options.UseSqlServer(Configuration.GetConnectionString("localConnection"))
                options => options.UseSqlServer(Util.ConnectionStrings)
            );
            services.AddCors();            
            services.Configure<ConfigurationsVm>(Configuration.GetSection(ConfigurationsVm.Project));
            CustomIdentity(services);            
            CustomDIContainer(services);            
            CustomAuthorize(services);
            //CustomCookie(services);
            CustomJwt(services);
            services.AddControllers().
                AddNewtonsoftJson(x => 
                      x.SerializerSettings.ReferenceLoopHandling =
                     Newtonsoft.Json.ReferenceLoopHandling.Ignore);                //Add for looping

            enableImmediateLogout(services);
            services.AddHostedService<TimedHostedService>();
        }

        private void CustomJwt(IServiceCollection services)
        {
            services.Configure<BearerTokens>(options => Configuration.GetSection("BearerTokens").Bind(options));
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
                    ValidIssuer = Configuration["BearerTokens:Issuer"],
                    ValidAudience = Configuration["BearerTokens:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["BearerTokens:Key"])),
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
        private void CustomCookie(IServiceCollection services)
        {
            services.AddAuthentication(options => {
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });
            services.ConfigureApplicationCookie(identityOptionsCookies =>
            {                
                var provider = services.BuildServiceProvider();                                
                setCookieOptions(provider, identityOptionsCookies);
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
            services.AddScoped<IIdentityDbInitializer,IdentityDbInitializer>();            
            services.AddScoped<ISecurityTrimmingService, SecurityTrimmingService>();
            services.AddScoped<IAppLogItemsService, AppLogItemsService>();

            //ActiveProbe

            services.AddScoped<ICookieValidatorService, CookieValidatorService>();

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
                IdnOpt.SignIn.RequireConfirmedPhoneNumber=false;
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
        private void setCookieOptions(ServiceProvider provider, CookieAuthenticationOptions idnCookie)
        {
            
            idnCookie.Cookie.Name = "kkom-activeprobe";
            idnCookie.Cookie.HttpOnly = true;
            idnCookie.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
            idnCookie.Cookie.SameSite = SameSiteMode.Lax;
            idnCookie.Cookie.IsEssential = true; //  this cookie will always be stored regardless of the user's consent
            idnCookie.ExpireTimeSpan = TimeSpan.FromDays(5);
            idnCookie.SlidingExpiration = true;
            idnCookie.LoginPath = "/login";
            idnCookie.LogoutPath = "/logout";
            idnCookie.AccessDeniedPath = "/admin";
            idnCookie.Events = new CookieAuthenticationEvents
            {
                OnValidatePrincipal = context =>
                {
                    var cookieValidatorService = context.HttpContext.RequestServices.GetRequiredService<ICookieValidatorService>();
                    return cookieValidatorService.ValidateAsync(context);
                }
            };
        }
         private static void enableImmediateLogout(IServiceCollection services)
        {
            services.Configure<SecurityStampValidatorOptions>(options =>
            {
                // enables immediate logout, after updating the user's stat.
                options.ValidationInterval = TimeSpan.Zero;
                options.OnRefreshingPrincipal = principalContext =>
                {
                    // Invoked when the default security stamp validator replaces the user's ClaimsPrincipal in the cookie.

                    //var newId = new ClaimsIdentity();
                    //newId.AddClaim(new Claim("PreviousName", principalContext.CurrentPrincipal.Identity.Name));
                    //principalContext.NewPrincipal.AddIdentity(newId);

                    return Task.CompletedTask;
                };
            });
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
