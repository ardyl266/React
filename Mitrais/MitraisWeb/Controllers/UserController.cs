using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MitraisRepo.Model;
using MitraisService.Interface;

namespace MitraisWeb.Controllers
{
    
    public class UserController : ControllerBase{        

        private readonly IUserService user_service;
        // private readonly RoleManager<IdentityRole> roleManager;
        private IConfiguration _config;
        public UserController(IUserService user_service, IConfiguration _config){
            this.user_service = user_service;
            // this.roleManager = roleManager;
            this._config = _config;
        }

        public UserController(IUserService user_service)
        {
            this.user_service = user_service;            
        }

        [HttpPost]  
        [Route("api/User")]  
        public IActionResult AddUser([FromBody]Users User)  
        {  
            try{
                
                int result = user_service.AddUser(User);

            }
            catch(Exception ex){

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            
            return StatusCode(StatusCodes.Status200OK, "Success");
            
        }  
        

        [AllowAnonymous]      
        [HttpPost]  
        [Route("api/Authenticate")]
        public IActionResult Login([FromBody]Users login)  
        {
            IActionResult response = NotFound();
            var user = user_service.AuthenticateUser(login);  
  
            if (user != null)  
            {  
                var tokenString = GenerateJSONWebTokenAsync(user);  
                response = Ok(new { token = tokenString });  
            }  
  
            return response;  
        }        

        private string GenerateJSONWebTokenAsync(Users userInfo)  
        {
            String jwt = _config["Jwt:Key"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));  
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);  

            var role_name = from names in userInfo.roles select names.Name;                        

            List<Claim> claims = new List<Claim> {  
                new Claim("Name", userInfo.Name),  
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),                  
                new Claim("ID", userInfo.UserId.ToString())                
            };  
           
           foreach(var name in role_name.ToList()){
                claims.Add(new Claim("role", name));
           }            
           
  
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],  
              _config["Jwt:Issuer"],  
              claims,  
              expires: DateTime.Now.AddMinutes(120),  
              signingCredentials: credentials);  
  
            return new JwtSecurityTokenHandler().WriteToken(token);  
        } 
    }
}