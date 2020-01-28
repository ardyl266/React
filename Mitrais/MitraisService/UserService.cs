using MitraisRepo.Interface;
using MitraisRepo.Model;
using MitraisService.Interface;
using System;
using System.Collections.Generic;

namespace MitraisService
{
    public class UserService : IUserService
    {
        private readonly IRepository<Users> user_repo;

        public UserService(IRepository<Users> user_repo){
            this.user_repo = user_repo;
        }    
        public int AddUser(Users user)
        {
            try{
                user.UserId = Guid.NewGuid();
                return user_repo.Insert("ID",user);
            }catch(Exception ex){
                return 0;
            }
        }
    }
}