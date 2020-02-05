using System;
using NPoco;

namespace MitraisRepo.Model
{
    [TableName("MasterRole")]
    [PrimaryKey("Id")]
    public class MasterRole
    {
        public Guid Id {get;set;}

        public String Name{get;set;}

    }
}