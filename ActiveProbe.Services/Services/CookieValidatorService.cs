

using ActiveProbe.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore.Internal;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ActiveProbe.Services
{
    public class CookieValidatorService : ICookieValidatorService
    {
        private readonly IApcUserManager _usersService;
        public CookieValidatorService(IApcUserManager usersService)
        {
            _usersService = usersService;            
        }

        public async Task ValidateAsync(CookieValidatePrincipalContext context)
        {
            var userPrincipal = context.Principal;

            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
            if (claimsIdentity?.Claims == null || !claimsIdentity.Claims.Any())
            {
                // this is not our issued cookie
                await handleUnauthorizedRequest(context);
                return;
            }

            var serialNumberClaim = claimsIdentity.FindFirst(ClaimTypes.SerialNumber);
            if (serialNumberClaim == null)
            {
                // this is not our issued cookie
                await handleUnauthorizedRequest(context);
                return;
            }

            var userIdString = claimsIdentity.FindFirst(ClaimTypes.UserData).Value;
            if (!int.TryParse(userIdString, out int userId))
            {
                // this is not our issued cookie
                await handleUnauthorizedRequest(context);
                return;
            }

            var user = await _usersService.FindByIdAsync(userId.ToString()).ConfigureAwait(false);
            if (user == null || !user.IsActive)
            {
                // user has changed his/her password/roles/stat/IsActive
                await handleUnauthorizedRequest(context);
            }

            await _usersService.UpdateSecurityStampAsync(user).ConfigureAwait(false);
        }

        private Task handleUnauthorizedRequest(CookieValidatePrincipalContext context)
        {
            context.RejectPrincipal();
            return context.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
