using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using System;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel.Identity.Settings;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Utils.Extentions;
using DNTCommon.Web.Core;

namespace ActiveProbe.Services
{    
    public class IdentityDbInitializer : IIdentityDbInitializer
    {
        private readonly IOptionsSnapshot<SiteSettings> _adminUserSeedOptions;
        private readonly IApcUserManager _ApcUserManager;
        private readonly ILogger<IdentityDbInitializer> _logger;
        private readonly IApcRoleManager _roleManager;
        private readonly IServiceScopeFactory _scopeFactory;

        public IdentityDbInitializer(
            IApcUserManager ApcUserManager,
            IServiceScopeFactory scopeFactory,
            IApcRoleManager roleManager,
            IOptionsSnapshot<SiteSettings> adminUserSeedOptions,
            ILogger<IdentityDbInitializer> logger
            )
        {
            _ApcUserManager = ApcUserManager;
            _ApcUserManager.CheckArgumentIsNull(nameof(_ApcUserManager));

            _scopeFactory = scopeFactory;
            _scopeFactory.CheckArgumentIsNull(nameof(_scopeFactory));

            _roleManager = roleManager;
            _roleManager.CheckArgumentIsNull(nameof(_roleManager));

            _adminUserSeedOptions = adminUserSeedOptions;
            _adminUserSeedOptions.CheckArgumentIsNull(nameof(_adminUserSeedOptions));

            _logger = logger;
            _logger.CheckArgumentIsNull(nameof(_logger));
        }

        /// <summary>
        /// Applies any pending migrations for the context to the database.
        /// Will create the database if it does not already exist.
        /// </summary>
        public void Initialize()
        {
            _scopeFactory.RunScopedService<ActiveProbeCoreContext>(context =>
                {
                    if (_adminUserSeedOptions.Value.ActiveDatabase == ActiveDatabase.InMemoryDatabase)
                    {
                        context.Database.EnsureCreated();
                    }
                    else
                    {
                        context.Database.Migrate();
                    }
                });
        }

        /// <summary>
        /// Adds some default values to the IdentityDb
        /// </summary>
        public void SeedData()
        {
            _scopeFactory.RunScopedService<IIdentityDbInitializer>(identityDbSeedData =>
            {
                var result = identityDbSeedData.SeedDatabaseWithAdminUserAsync().Result;
                if (result == IdentityResult.Failed())
                {
                    throw new InvalidOperationException(result.DumpErrors());
                }
            });

            _scopeFactory.RunScopedService<ActiveProbeCoreContext>(context =>
            {
                if (!context.Roles.Any())
                {
                    context.Add(new Role(ConstantRoles.Admin));
                    context.SaveChanges();
                }
            });
        }

        public async Task<IdentityResult> SeedDatabaseWithAdminUserAsync()
        {
            var name = "Adminitrator";
            
            var password = "!123456";
            var email = "admin@kkom.ir";
            var roleName = "Admin";
            var description= "Administrator of Kkom";
            var thisMethodName = nameof(SeedDatabaseWithAdminUserAsync);
            var adminUser = await _ApcUserManager.FindByNameAsync(name);
            if (adminUser != null)
            {
                _logger.LogInformation($"{thisMethodName}: adminUser already exists.");
                return IdentityResult.Success;
            }

            //Create the `Admin` Role if it does not exist
            var adminRole = await _roleManager.FindByNameAsync(roleName);
            if (adminRole == null)
            {
                adminRole = new Role(roleName,description);
                var adminRoleResult = await _roleManager.CreateAsync(adminRole);
                if (adminRoleResult == IdentityResult.Failed())
                {
                    _logger.LogError($"{thisMethodName}: adminRole CreateAsync failed. {adminRoleResult.DumpErrors()}");
                    return IdentityResult.Failed();
                }
            }
            else
            {
                _logger.LogInformation($"{thisMethodName}: adminRole already exists.");
            }

            adminUser = new User
            {
                UserName = name,
                Email = email,
                EmailConfirmed = true,
                IsEmailPublic = true,
                LockoutEnabled = true
            };
            var adminUserResult = await _ApcUserManager.CreateAsync(adminUser, password);
            if (adminUserResult == IdentityResult.Failed())
            {
                _logger.LogError($"{thisMethodName}: adminUser CreateAsync failed. {adminUserResult.DumpErrors()}");
                return IdentityResult.Failed();
            }

            var setLockoutResult = await _ApcUserManager.SetLockoutEnabledAsync(adminUser, enabled: false);
            if (setLockoutResult == IdentityResult.Failed())
            {
                _logger.LogError($"{thisMethodName}: adminUser SetLockoutEnabledAsync failed. {setLockoutResult.DumpErrors()}");
                return IdentityResult.Failed();
            }

            var addToRoleResult = await _ApcUserManager.AddToRoleAsync(adminUser, adminRole.Name);
            if (addToRoleResult == IdentityResult.Failed())
            {
                _logger.LogError($"{thisMethodName}: adminUser AddToRoleAsync failed. {addToRoleResult.DumpErrors()}");
                return IdentityResult.Failed();
            }

            return IdentityResult.Success;
        }
    }
}