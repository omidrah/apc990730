using ActiveProbe.Domain.AuditableEntity;
using Microsoft.AspNetCore.Identity;

namespace ActiveProbe.Domain.Identity
{
    
    public class RoleClaim : IdentityRoleClaim<int>, IAuditableEntity
    {
        public virtual Role Role { get; set; }
    }
}