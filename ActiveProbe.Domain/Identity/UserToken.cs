using ActiveProbe.Domain.AuditableEntity;
using Microsoft.AspNetCore.Identity;

namespace ActiveProbe.Domain.Identity
{
    public class UserToken : IdentityUserToken<int>, IAuditableEntity
    {
        public virtual User User { get; set; }
    }
}