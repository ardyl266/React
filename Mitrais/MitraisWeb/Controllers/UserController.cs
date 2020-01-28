using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MitraisRepo.Model;
using MitraisService.Interface;

namespace MitraisWeb.Controllers
{
    
    public class UserController : ControllerBase{        

        private readonly IUserService user_service;
        public UserController(IUserService user_service){
            this.user_service = user_service;
        }

        [HttpPost]  
        [Route("api/User")]  
        public int AddUser([FromBody]Users User)  
        {  
            return user_service.AddUser(User);
        }  

        [HttpGet]  
        [Route("api/get/User")]  
        public void GetUser()  
        {  
            String z = "";
             
        }  
    }
}