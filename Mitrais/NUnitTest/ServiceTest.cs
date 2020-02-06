using MitraisRepo.Interface;
using MitraisRepo.Model;
using MitraisService;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace NUnitTest
{
    public class ServiceTest
    {
        private UserService user_service;

        private UserService service_duplicate;



        #region Test Initializer
        [SetUp]
        public void setup() {
            Mock<IRepository<Users>> mock = new Mock<IRepository<Users>>();

            mock.Setup(repo => repo.Insert(It.IsAny<string>(), It.IsAny<Users>())).Returns(0);

            user_service = new UserService(mock.Object);

            Mock<IRepository<Users>> mock_duplicate = new Mock<IRepository<Users>>();

            mock_duplicate.Setup(repo => repo.Insert(It.IsAny<string>(), It.IsAny<Users>())).Returns(-1);

            service_duplicate = new UserService(mock_duplicate.Object);



        }
        #endregion


        [Test]
        public void When_CreateUser_EmailNoDuplicate_Servvice()
        {
            Users user = new Users
            {                
                Email = "Anonymous@mitrais.com",
                Password = "123123123"
            };

            int result = user_service.AddUser(user);

            Assert.AreEqual(0, result);

        }

        [Test]
        public void When_CreateUser_EmailDuplicate_Servvice()
        {
            Users user = new Users
            {                
                Email = "Anonymous@mitrais.com",
                Password = "123123123"
            };

            int result = service_duplicate.AddUser(user);

            Assert.AreEqual(-1, result);

        }





    }
}
