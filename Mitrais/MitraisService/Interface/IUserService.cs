using MitraisRepo.Model;

namespace MitraisService.Interface
{
    public interface IUserService
    {
         int AddUser(Users user);

         Users AuthenticateUser (Users user);
         
    }
}