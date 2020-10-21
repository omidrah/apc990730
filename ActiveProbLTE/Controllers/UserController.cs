using System.Net;
using System;
using System.Threading.Tasks;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using ActiveProbe.Domain.Identity;
using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IApcSignInManager _signInManager;
        private readonly IApcUserManager _userManager;
        private readonly IApcRoleManager _roleManager;
        public UserController(
            IApcSignInManager signInManager,
            IApcUserManager userManager,
            IApcRoleManager roleManager,
            ILogger<UserController> logger)
        {
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(_signInManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(_roleManager));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(_userManager));
            _logger = logger ?? throw new ArgumentNullException(nameof(_logger));
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Authenticate(loginVm usr)
        {
            var user = await _userManager.FindByNameAsync(usr.UserName).ConfigureAwait(false);
            if (user == null)
            {
                return BadRequest(new { msg = "اکانت مورد نظر وجود ندارد.", state = "failed" });
            }
            if (!user.IsActive)
            {
                return BadRequest(new { msg = "اکانت شما غیرفعال شده‌است.", state = "failed" });
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, usr.Password, true).ConfigureAwait(false);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                
                var cookieClaims = await createCookieClaimsAsync(user).ConfigureAwait(false);
                //await HttpContext.SignInAsync(
                //    CookieAuthenticationDefaults.AuthenticationScheme,
                //    cookieClaims,
                //    new AuthenticationProperties
                //    {
                //        IsPersistent = usr.rememberMe,
                //        IssuedUtc = DateTimeOffset.UtcNow,
                //        ExpiresUtc = DateTimeOffset.UtcNow.AddDays(5)
                //    }
                //).ConfigureAwait(false);
                await _userManager.UpdateSecurityStampAsync(user).ConfigureAwait(false);
                return Ok(cookieClaims);
            }
            return BadRequest(new { msg = "رمز عبور یا نام کاربری وارد شده صحیح نمی باشد.", state = "failed" });
        }
        public async Task<bool> LogOff()
        {
            var user = User.Identity.IsAuthenticated ?
                await _userManager.FindByNameAsync(User.Identity.Name) : null;
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).ConfigureAwait(false);           
            return true;
        }
        [HttpGet("[action]"), HttpPost("[action]")]
        public bool IsAuthenthenticated()
        {
            return User.Identity.IsAuthenticated;
        }
        [HttpGet("[action]"), HttpPost("[action]")]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return Ok(new { Username = claimsIdentity.Name });
        }
        private async Task<ClaimsPrincipal> createCookieClaimsAsync(User user)
        {
            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
            identity.AddClaim(new Claim("DisplayName", user.DisplayName));
            identity.AddClaim(new Claim("LastLoginDate", user.LastVisitDateTime.ToShortPersianDateString()));
            // add roles
            var roles = _roleManager.FindUserRoles(user.Id);
            foreach (var role in roles)
            {   

                identity.AddClaim(new Claim(ClaimTypes.Role, role.Name));
                if (role.Claims != null)
                {
                    foreach (var access in role.Claims)
                    {

                        identity.AddClaim(new Claim(access.ClaimType, access.ClaimValue));
                    }
                }
                
            }
            return new ClaimsPrincipal(identity);
        }
    }
}