using ActiveProbe.Domain.AuditableEntity;
using Microsoft.AspNetCore.Identity;
using System;

namespace ActiveProbe.Domain.Identity
{
    public class UserToken : IdentityUserToken<int>, IAuditableEntity
    {   
        public int Id { get; set; }

        public string AccessTokenHash { get; set; }

        public DateTimeOffset AccessTokenExpiresDateTime { get; set; }

        public string RefreshTokenIdHash { get; set; }
        public string RefreshTokenIdHashSource { get; set; }

        public DateTimeOffset RefreshTokenExpiresDateTime { get; set; }

        public virtual User User { get; set; }
    }
}