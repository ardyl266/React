using System;
using NPoco;

namespace MitraisRepo.Model
{
    [TableName("UserRole")]
    [PrimaryKey("Id")]
    public class UserRole
    {
        public Guid Id{get;set;}

        public Guid UserId{get;set;}

        public Guid RoleId{get;set;}
        
    }
}