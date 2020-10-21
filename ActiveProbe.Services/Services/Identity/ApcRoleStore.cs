using System;
using System.Security.Claims;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ActiveProbe.Services
{    
    public class ApcRoleStore :
        RoleStore<Role, ActiveProbeCoreContext, int, UserRole, RoleClaim>,
        IApcRoleStore
    {
        private readonly IUnitOfWork _uow;
        private readonly IdentityErrorDescriber _describer;

        public ApcRoleStore(
            IUnitOfWork uow,
            IdentityErrorDescriber describer)
            : base((ActiveProbeCoreContext)uow, describer)
        {
            _uow = uow ?? throw new ArgumentNullException(nameof(_uow));
            _describer = describer ?? throw new ArgumentNullException(nameof(_describer));
        }

        #region BaseClass

        protected override RoleClaim CreateRoleClaim(Role role, Claim claim)
        {
            return new RoleClaim
            {
                RoleId = role.Id,
                ClaimType = claim.Type,
                ClaimValue = claim.Value
            };
        }

        #endregion

        #region CustomMethods

        #endregion
    }
}