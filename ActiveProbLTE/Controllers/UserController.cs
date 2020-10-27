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
using ActiveProbe.DataLayer.Context;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _uow;
        private readonly ITokenFactoryService _tokenFactoryService;
        private readonly IApcSignInManager _signInManager;
        private readonly ITokenStoreService _tokenStore;
        private readonly IApcUserManager _userManager;
        
        public UserController(
            IApcSignInManager signInManager,                  
            IUnitOfWork uow,
        ITokenStoreService tokenStore,
                    ITokenFactoryService tokenFactoryService,
            IApcUserManager userManager,
            IApcRoleManager roleManager,
            ILogger<UserController> logger)
        {
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(_signInManager));        
            _userManager = userManager ?? throw new ArgumentNullException(nameof(_userManager));
            _tokenStore = tokenStore ?? throw new ArgumentNullException(nameof(_tokenStore));
            _tokenFactoryService = tokenFactoryService ?? throw new ArgumentNullException(nameof(_tokenFactoryService));
            _logger = logger ?? throw new ArgumentNullException(nameof(_logger));
            _uow = uow;
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
                var result2 = await _tokenFactoryService.CreateJwtTokensAsync(user, ConstantPolicies.dynKkomAuthorizationClaimType).ConfigureAwait(false);
                await _tokenStore.AddUserTokenAsync(user, result2.RefreshTokenSerial, result2.AccessToken, null).ConfigureAwait(false);
                await _uow.SaveChangesAsync();
                return Ok(new { access_token = result2.AccessToken, refresh_token = result2.RefreshToken });
            }
            return BadRequest(new APIResult<bool>{ 
                          Succeed=true, 
                          Message="Invalid username or password", Result=false});
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<bool> LogOff(string refreshToken)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userIdValue = claimsIdentity.FindFirst(ClaimTypes.UserData)?.Value;
            // The Jwt implementation does not support "revoke OAuth token" (logout) by design.
            // Delete the user's tokens from the database (revoke its bearer token)
            await _tokenStore.RevokeUserBearerTokensAsync(userIdValue, refreshToken).ConfigureAwait(false);
            await _uow.SaveChangesAsync().ConfigureAwait(false);
            return true;
        }
        [AllowAnonymous]
        [IgnoreAntiforgeryToken]
        [HttpPost("[action]")]
        public async Task<IActionResult> RefreshToken([FromBody] Token2 model)
        {
            var refreshTokenValue = model.RefreshToken;
            if (string.IsNullOrWhiteSpace(refreshTokenValue))
            {
                return BadRequest("refreshToken is not set.");
            }

            var token = await _tokenStore.FindTokenAsync(refreshTokenValue).ConfigureAwait(false);
            if (token == null)
            {
                return Unauthorized();
            }
            var result = await _tokenFactoryService.CreateJwtTokensAsync(token.User,ConstantPolicies.dynKkomAuthorizationClaimType).ConfigureAwait(false);
            await _tokenStore.AddUserTokenAsync(token.User, result.RefreshTokenSerial, result.AccessToken, _tokenFactoryService.GetRefreshTokenSerial(refreshTokenValue)).ConfigureAwait(false);
            await _uow.SaveChangesAsync().ConfigureAwait(false);
            return Ok(new { access_token = result.AccessToken, refresh_token = result.RefreshToken });
        }

        [HttpGet("[action]"), HttpPost("[action]")]
        public bool IsAuthenticated()
        {
            return User.Identity.IsAuthenticated;
        }

        [HttpGet("[action]"), HttpPost("[action]")]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return Ok(new { Username = claimsIdentity.Name });
        }

    }
}