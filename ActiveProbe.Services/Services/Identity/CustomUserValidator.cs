using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Utils.ViewModel.Identity.Settings;
using ActiveProbe.Utils.Extentions;

namespace ActiveProbe.Services
{
    
    public class CustomUserValidator : UserValidator<User>
    {
        public CustomUserValidator(
            IdentityErrorDescriber errors,// How to use CustomIdentityErrorDescriber
            IOptionsSnapshot<SiteSettings> configurationRoot
            ) : base(errors)
        {
            if (configurationRoot == null) throw new ArgumentNullException(nameof(configurationRoot));          
        }

        public override async Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            var result = await base.ValidateAsync(manager, user);
            var errors = result.Succeeded ? new List<IdentityError>() : result.Errors.ToList();
            // Extending the built-in validator         
            validateUserName(user, errors);

            return !errors.Any() ? IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }

        private static void validateUserName(User user, List<IdentityError> errors)
        {
            var userName = user?.UserName;
            if (string.IsNullOrWhiteSpace(userName))
            {
                if (string.IsNullOrWhiteSpace(userName))
                {
                    errors.Add(new IdentityError
                    {
                        Code = "UserIsNotSet",
                        Description = "لطفا اطلاعات کاربری را تکمیل کنید."
                    });
                }
                return;  // base.ValidateAsync() will cover this case
            }

            if (userName.IsNumeric() || userName.ContainsNumber())
            {
                errors.Add(new IdentityError
                {
                    Code = "BadUserNameError",
                    Description = "نام کاربری وارد شده نمی‌تواند حاوی اعداد باشد."
                });
            }
         
        }
    }
}