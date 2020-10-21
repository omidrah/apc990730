using ActiveProbe.Domain.AuditableEntity;
using Microsoft.AspNetCore.Identity;

namespace ActiveProbe.Domain.Identity
{
    
    public class UserLogin : IdentityUserLogin<int>, IAuditableEntity
    {
        public virtual User User { get; set; }
    }
}