using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gerador.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName = "varchar(150)")]
        public string FullName { get; set; }
        public virtual List<UserRole> UserRoles { get; set; }
        // user ID from AspNetUser table.

    }
}
