using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MitraisRepo.Interface;
using MitraisRepo.Model;
using MitraisService;
using MitraisService.Interface;
using MitraisWeb.Controllers;
using Moq;
using NUnit.Framework;
using System;
using System.Text.Json;

namespace NUnitTest
{

    [TestFixture]
    public class Tests
    {

        [TestCase]
        public void When_CreateUser_EmailNoDuplicate()
        {
            var mock = new Mock<IUserService>();

            Users user = new Users { 
                UserId = Guid.NewGuid(),
                Email = "Anonymous@mitrais.com",
                Password = "123123123"
            };

            UserController controller = new UserController(mock.Object);

            ObjectResult result = (ObjectResult)controller.AddUser(user);

            //Assert.Pass();
            
            Assert.AreEqual(200, (int)result.StatusCode);
        }

        [TestCase]
        public void When_Login_Success()
        {
            var mock = new Mock<IUserService>();

            var config = new Mock<IConfiguration>();


            dynamic options = new System.Dynamic.ExpandoObject(); 
            options.Key = "MitraisCDCProgram";
            options.Issuer = "CDCTrainer";
            
            var x = config.Object;
            config.SetupGet(m => m[It.Is<string>(s => s == "Jwt:Key")]).Returns("MitraisCDCProgram");
            config.SetupGet(m => m[It.Is<string>(s => s == "Jwt:Issuer")]).Returns("CDCTrainer");
            //config.Setup(a => a.GetSection(It.Is<string>(s => s == "Jwt"))).Returns(new Mock<IConfigurationSection>().Object);            

            Users user = new Users
            {                
                UserId = Guid.NewGuid(),
                Name = "Anonymous",
                Email = "Anonymous@mitrais.com",
                Password = "123123123",
                roles = new System.Collections.Generic.List<MasterRole> { 
                    new MasterRole(){
                        Id = Guid.NewGuid(),
                        Name = "SUPER ADMIN",
                    },
                    new MasterRole(){
                        Id = Guid.NewGuid(),
                        Name = "USER",
                    }
                }
            };

            mock.Setup(a => a.AuthenticateUser(It.IsAny<Users>())).Returns(user);
            UserController controller = new UserController(mock.Object, config.Object);

            //var result = controller.GenerateJSONWebTokenAsync(user);
            var result = controller.Login(user);

            Assert.IsNotNull(result);

            
        }

        [TestCase]
        public void When_Login_Failed()
        {
            var mock = new Mock<IUserService>();

            var config = new Mock<IConfiguration>();                        
            
            UserController controller = new UserController(mock.Object, config.Object);

            NotFoundResult result = (NotFoundResult) controller.Login(new Users());

            Assert.AreEqual(404, (int)result.StatusCode);

            //Assert.Pass();


        }
    }
}