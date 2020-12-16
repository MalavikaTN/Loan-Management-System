using LoanManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LoanManagementSystem.Controllers
{
    public class ManagerController : ApiController
    {
        LMSEntities1 context = new LMSEntities1();
        public IEnumerable<ClientManager> GetManagers()
        {
            return context.ClientManagers;
        }
        public IEnumerable<ClientManager> GetManagers(int id)
        {
            return context.ClientManagers.Where(i =>i.Id==id);
        }
        [HttpPost]
        public HttpResponseMessage Create(ClientManager manager)
        {
            try
            {
                context.ClientManagers.Add(manager);
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(ClientManager manager)
        {
            try
            {
                
                {
                    context.Entry(manager).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);

                }
                
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                ClientManager foo = context.ClientManagers.Find(id);
                context.ClientManagers.Remove(foo);
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
