using LoanManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LoanManagementSystem.Controllers
{
    [RoutePrefix("Api/Pay")]
    public class PayController : ApiController
    {
        LMSEntities1 context = new LMSEntities1();
        [HttpGet]
        public object GetPayss(long id)
        {
            var pay = from p in context.PayLoans join l in context.Loans on p.LoanAccountNo equals l.LoanAccountNo where l.LoanAccountNo==id select new
            {
                l.LoanAmount,
                l.EMI,
                p.LoanAccountNo,
                p.PaymentId,
                p.PaymentDate,
                p.PayingAmount,
                p.Balance,
                p.Fine
            };
            return pay;
        }
        [Route("GetLatestPayment")]
        [HttpGet]
        public DateTime GetLatestPayment(int id)
        {
            var pay = context.PayLoans.Where(x => x.LoanAccountNo == id).ToList().LastOrDefault();
            return ((DateTime)pay.PaymentDate);
        }
        [Route("GetBalance")]
        [HttpGet]
        public object GetBalance(int id)
        {
            var pay = context.PayLoans.Where(x => x.LoanAccountNo == id).ToList().LastOrDefault();
            return pay;
        }
        [Route("GetAllLoan")]
        [HttpGet]
        public object GetAllLoan(int id)
        {
            var all = from l in context.Loans
                      where l.AccountNo == id && l.LoanStatus=="Approved"
                      select new
                      {
                          l.LoanAccountNo,
                          l.LoanAmount,
                          l.Duration,
                          l.EMI,
                          l.ApprovalDate,
                          l.LoanStatus
                      };
            return all;
        }
        [Route("GetClosedLoan")]
        [HttpGet]
        public object GetClosedLoan(int id)
        {
            var all = from l in context.Loans
                      where l.AccountNo == id && (l.LoanStatus=="Closed" || l.LoanStatus == "Pending" || l.LoanStatus == "Accepted")
                      select new
                      {
                          l.LoanAccountNo,
                          l.LoanAmount,
                          l.Duration,
                          l.EMI,
                          l.ApprovalDate,
                          l.LoanStatus
                      };
            return all;
        }
        [Route("GetPendingLoan")]
        [HttpGet]
        public object GetPendingLoan(int id)
        {
            var all = from l in context.Loans
                      where l.AccountNo == id && l.LoanStatus == "Pending"
                      select new
                      {
                          l.LoanAccountNo,
                          l.LoanAmount,
                          l.Duration,
                          l.EMI,
                          l.ApprovalDate
                      };
            return all;
        }
        [Route("GetAcceptedLoan")]
        [HttpGet]
        public object GetAcceptedLoan(int id)
        {
            var all = from l in context.Loans
                      where l.AccountNo == id && l.LoanStatus == "Accepted"
                      select new
                      {
                          l.LoanAccountNo,
                          l.LoanAmount,
                          l.Duration,
                          l.EMI,
                          l.ApprovalDate
                      };
            return all;
        }
        [HttpPost]
        public HttpResponseMessage Create(PayLoan payLoan)
        {
            try
            {
                context.PayLoans.Add(payLoan);
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}
