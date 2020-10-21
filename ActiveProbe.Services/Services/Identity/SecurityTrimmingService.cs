
using ActiveProbe.Services.Interfaces;

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ActiveProbe.Services
{    
    public class SecurityTrimmingService : ISecurityTrimmingService
    {
        private readonly HttpContext _httpContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMvcActionsDiscoveryService _mvcActionsDiscoveryService;

        public SecurityTrimmingService(
            IHttpContextAccessor httpContextAccessor,
            IMvcActionsDiscoveryService mvcActionsDiscoveryService)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(_httpContextAccessor));
            _httpContext = _httpContextAccessor.HttpContext;
            _mvcActionsDiscoveryService = mvcActionsDiscoveryService ?? throw new ArgumentNullException(nameof(_mvcActionsDiscoveryService));
        }

        public bool CanCurrentUserAccess(string area, string controller, string action)
        {
            return _httpContext != null && CanUserAccess(_httpContext.User, area, controller, action);
        }

        public bool CanUserAccess(ClaimsPrincipal user, string area, string controller, string action)
        {
            var currentClaimValue = $"{area}:{controller}:{action}";
            var securedControllerActions = _mvcActionsDiscoveryService.GetAllSecuredControllerActionsWithPolicy(ConstantPolicies.dynKkomAuthorization);
            if (!securedControllerActions.SelectMany(x => x.MvcActions).Any(x => x.ActionId == currentClaimValue))
            {
                throw new KeyNotFoundException($"Don't Access To  area={area}/controller={controller}/action={action}.Contact with Administartor");
            }

            if (!user.Identity.IsAuthenticated)
            {
                return false;
            }

            if (user.IsInRole(ConstantRoles.Admin))
            {
                // Admin users have access to all of the pages.
                return true;
            }

            // Check for dynamic permissions
            // A user gets its permissions claims from the `ApplicationClaimsPrincipalFactory` class automatically and it includes the role claims too.
            return user.HasClaim(claim => claim.Type == ConstantPolicies.dynKkomAuthorizationClaimType &&
                                          claim.Value == currentClaimValue);
        }
    }
}