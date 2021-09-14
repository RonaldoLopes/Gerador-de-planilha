using System.ComponentModel.DataAnnotations;

namespace Gerador.WebAPI.Dto
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string FullName { get; set; }
    }
}
