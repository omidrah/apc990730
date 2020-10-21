
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using System;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Services
{   
    public class ApcSignInManager :
        SignInManager<User>,
        IApcSignInManager
    {
        private readonly IApcUserManager _userManager;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IUserClaimsPrincipalFactory<User> _claimsFactory;
        private readonly IOptions<IdentityOptions> _optionsAccessor;
        private readonly ILogger<ApcSignInManager> _logger;
        private readonly IAuthenticationSchemeProvider _schemes;
        private readonly IUserConfirmation<User> _confirmation;

        public ApcSignInManager(
            IApcUserManager userManager,
            IHttpContextAccessor contextAccessor,
            IUserClaimsPrincipalFactory<User> claimsFactory,
            IOptions<IdentityOptions> optionsAccessor,
            ILogger<ApcSignInManager> logger,
            IAuthenticationSchemeProvider schemes,
            IUserConfirmation<User> confirmation)
            : base((UserManager<User>)userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(_userManager));
            _contextAccessor = contextAccessor ?? throw new ArgumentNullException(nameof(_contextAccessor));
            _claimsFactory = claimsFactory ?? throw new ArgumentNullException(nameof(_claimsFactory));
            _optionsAccessor = optionsAccessor ?? throw new ArgumentNullException(nameof(_optionsAccessor));
            _logger = logger ?? throw new ArgumentNullException(nameof(_logger));
            _schemes = schemes ?? throw new ArgumentNullException(nameof(_schemes));
            _confirmation = confirmation;
        }

        #region BaseClass

        Task<bool> IApcSignInManager.IsLockedOut(User user)
        {
            return base.IsLockedOut(user);
        }

        Task<SignInResult> IApcSignInManager.LockedOut(User user)
        {
            return base.LockedOut(user);
        }

        Task<SignInResult> IApcSignInManager.PreSignInCheck(User user)
        {
            return base.PreSignInCheck(user);
        }

        Task IApcSignInManager.ResetLockout(User user)
        {
            return base.ResetLockout(user);
        }

        Task<SignInResult> IApcSignInManager.SignInOrTwoFactorAsync(User user, bool isPersistent, string loginProvider, bool bypassTwoFactor)
        {
            return base.SignInOrTwoFactorAsync(user, isPersistent, loginProvider, bypassTwoFactor);
        }

        #endregion

        #region CustomMethods

        public bool IsCurrentUserSignedIn()
        {
            return IsSignedIn(_contextAccessor.HttpContext.User);
        }

        public Task<User> ValidateCurrentUserSecurityStampAsync()
        {
            return ValidateSecurityStampAsync(_contextAccessor.HttpContext.User);
        }

        #endregion
    }
}
