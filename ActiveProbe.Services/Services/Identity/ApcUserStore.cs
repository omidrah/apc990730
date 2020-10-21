using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ActiveProbe.Services
{
    public class ApcUserStore :
        UserStore<User, Role, ActiveProbeCoreContext, int, UserClaim, UserRole, UserLogin, UserToken, RoleClaim>,
        IApcUserStore
    {
        private readonly IUnitOfWork _uow;
        private readonly IdentityErrorDescriber _describer;

        public ApcUserStore(
            IUnitOfWork uow,
            IdentityErrorDescriber describer)
            : base((ActiveProbeCoreContext)uow, describer)
        {
            _uow = uow ?? throw new ArgumentNullException(nameof(_uow));
            _describer = describer ?? throw new ArgumentNullException(nameof(_describer));
        }

        #region BaseClass

        protected override UserClaim CreateUserClaim(User user, Claim claim)
        {
            var userClaim = new UserClaim { UserId = user.Id };
            userClaim.InitializeFromClaim(claim);
            return userClaim;
        }

        protected override UserLogin CreateUserLogin(User user, UserLoginInfo login)
        {
            return new UserLogin
            {
                UserId = user.Id,
                ProviderKey = login.ProviderKey,
                LoginProvider = login.LoginProvider,
                ProviderDisplayName = login.ProviderDisplayName
            };
        }

        protected override UserRole CreateUserRole(User user, Role role)
        {
            return new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id
            };
        }

        protected override UserToken CreateUserToken(User user, string loginProvider, string name, string value)
        {
            return new UserToken
            {
                UserId = user.Id,
                LoginProvider = loginProvider,
                Name = name,
                Value = value
            };
        }

        Task IApcUserStore.AddUserTokenAsync(UserToken token)
        {
            return base.AddUserTokenAsync(token);
        }

        Task<Role> IApcUserStore.FindRoleAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            return base.FindRoleAsync(normalizedRoleName, cancellationToken);
        }

        Task<UserToken> IApcUserStore.FindTokenAsync(User user, string loginProvider, string name, CancellationToken cancellationToken)
        {
            return base.FindTokenAsync(user, loginProvider, name, cancellationToken);
        }

        Task<User> IApcUserStore.FindUserAsync(int userId, CancellationToken cancellationToken)
        {
            return base.FindUserAsync(userId, cancellationToken);
        }

        Task<UserLogin> IApcUserStore.FindUserLoginAsync(int userId, string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            return base.FindUserLoginAsync(userId, loginProvider, providerKey, cancellationToken);
        }

        Task<UserLogin> IApcUserStore.FindUserLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            return base.FindUserLoginAsync(loginProvider, providerKey, cancellationToken);
        }

        Task<UserRole> IApcUserStore.FindUserRoleAsync(int userId, int roleId, CancellationToken cancellationToken)
        {
            return base.FindUserRoleAsync(userId, roleId, cancellationToken);
        }

        Task IApcUserStore.RemoveUserTokenAsync(UserToken token)
        {
            return base.RemoveUserTokenAsync(token);
        }

        #endregion

        #region CustomMethods

        // Add custom methods here

        #endregion
    }
}