using LoanManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LoanManagementSystem.Controllers
{
    public class LoanProgramController : ApiController
    {
        LMSEntities1 context = new LMSEntities1();
        [HttpGet]
        public object GetLoanPrograms()
        {
            var Programs = from lp in context.LoanPrograms select new { lp.Id,lp.LoanType,lp.Interest,lp.Description };

            return Programs;
        }
        public object GetLoanProgram(long id)
        {
            var Programs = from lp in context.LoanPrograms where lp.Id == id select new { lp.Id, lp.LoanType, lp.Interest, lp.Description };
            return Programs;
        }
        [HttpPost]
        public HttpResponseMessage Create(LoanProgram loanProgram)
        {
            try
            {
                context.LoanPrograms.Add(loanProgram);
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(LoanProgram loanProgram)
        {
            try
            {

                
                {
                    context.Entry(loanProgram).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                

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
                context.LoanPrograms.Remove(context.LoanPrograms.Find(id));
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
