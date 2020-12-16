using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LoanManagementSystem.Models;
using System.Data.Entity;
namespace LoanManagementSystem.Controllers
{
    [RoutePrefix("Api/User")]
    public class UserController : ApiController
    {
        LMSEntities1 context = new LMSEntities1();

        public object GetUsers()
        {
            var user = from u in context.Users select new { u.AccountNo,u.Name,u.DOB,u.Gender,u.Aadhaar,u.PAN,u.PermanentAddress,u.Phone,u.Email,u.Password };
            
            return user;
        }
        public object GetUsers(long id)
        {
            var user = from u in context.Users where u.AccountNo == id select new { u.AccountNo, u.Name, u.DOB, u.Gender, u.Aadhaar, u.PAN, u.PermanentAddress, u.Phone, u.Email, u.Password };
            return user;
        }
        [Route("ValidateUser")]
        [HttpPost]
        
        public long ValidateUser(Login login)
        {
            if (login.Type == "User")
            {
                var log = context.Users.Where(x => x.Name.Equals(login.Name) && x.Password.Equals(login.Password)).FirstOrDefault();
                if (log != null)
                    return log.AccountNo;
                else
                    return 0;
            }
            else if (login.Type == "Manager")
            {
                var log = context.ClientManagers.Where(x => x.Name.Equals(login.Name) && x.Password.Equals(login.Password)).FirstOrDefault();
                if (log != null)
                    return log.Id;
                else
                    return 0;
            } 
            else if (login.Type == "Admin")
            {
                if (login.Name == "admin" && login.Password == "admin")
                    return 1;
                else return 0;
            }
            return 0;
            
            
        }


        [HttpPost]
        public HttpResponseMessage Create(User user)
        {
            try
            {                
                    context.Users.Add(user);
                    context.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.Created);
                
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(User user)
        {
            try
            {             
                
                    context.Entry(user).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                

            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                context.Users.Remove(context.Users.Find(id));
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}
