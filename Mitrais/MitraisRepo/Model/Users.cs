using System;
using System.Collections.Generic;
using NPoco;

namespace MitraisRepo.Model
{
    [TableName("Users")]
    [PrimaryKey("UserId")]
    public class Users
    {
        public Guid? UserId { get; set; }  
        public string Name { get; set; }  
        public string Email { get; set; }  
        public string Password { get; set; }

        public List<MasterRole> roles {get; set;}
        
    }
}