
using System.Collections.Generic;

namespace Gerador.Domain.Identity
{
    public class Role : Microsoft.AspNetCore.Identity.IdentityRole<int>
    {
        public virtual List<UserRole> UserRoles { get; set; }
    }
}
