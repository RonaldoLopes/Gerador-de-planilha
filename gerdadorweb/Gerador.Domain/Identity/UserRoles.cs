
namespace Gerador.Domain.Identity
{
    public class UserRole : Microsoft.AspNetCore.Identity.IdentityUserRole<int>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
