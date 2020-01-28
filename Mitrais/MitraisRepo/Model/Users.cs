using System;
using NPoco;

namespace MitraisRepo.Model
{
    [TableName("Users")]
    [PrimaryKey("UserId")]
    public class Users
    {
        public Guid UserId { get; set; }  
        public string Name { get; set; }  
        public string Email { get; set; }  
        public string Password { get; set; }
    }
}