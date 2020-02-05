using MitraisRepo.Interface;
using MitraisRepo.Model;
using MitraisService.Interface;
using System;
using System.Linq;
using System.Collections.Generic;

namespace MitraisService
{
    public class UserService : IUserService
    {
        private readonly IRepository<Users> user_repo;
        private readonly IRepository<UserRole> ur_repo;

        private readonly IRepository<MasterRole> role_repo;

        public UserService(IRepository<Users> user_repo, IRepository<UserRole> ur_repo, IRepository<MasterRole> role_repo){
            this.user_repo = user_repo;
            this.ur_repo = ur_repo;
            this.role_repo = role_repo;
        }    
        public int AddUser(Users user)
        {
            try{
                user.UserId = Guid.NewGuid();
                return user_repo.Insert("ID",user);
            }catch(Exception ex){
                throw new Exception(ex.Message);
            }
        }

        public Users AuthenticateUser(Users user)
        {
            try{

                user = user_repo.FindByCondition("where Email = @Email and Password = @Password", new {@Email = user.Email , @Password = user.Password});                
                
                List<UserRole> user_roles = ur_repo.FindAllByCondition("where UserId = @UserId", new{@UserId = user.UserId});

                var role = from roles in user_roles select roles.RoleId;
                
                user.roles = role_repo.FindAllByCondition("where Id in (@RoleId)", new{ @RoleId = role.ToArray() });
                
                return user;
            }
            catch(Exception ex){
                return null;
            }
        }
    }
}