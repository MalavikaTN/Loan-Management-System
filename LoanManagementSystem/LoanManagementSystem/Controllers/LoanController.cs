using LoanManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LoanManagementSystem.Controllers
{
    [RoutePrefix("Api/Loan")]
    public class LoanController : ApiController
    {
        LMSEntities1 context = new LMSEntities1();

        public object GetLoan()
        {
            var loanlist = from loan in context.Loans
                           join lp in context.LoanPrograms on loan.LoanId equals lp.Id
                           join user in context.Users on loan.AccountNo equals user.AccountNo
                           select new
                           {
                               loan.AccountNo,
                               user.Name,
                               lp.LoanType,
                               loan.LoanAccountNo,
                               loan.Occupation,
                               loan.AnnualIncome,
                               loan.LoanAmount,
                               loan.Duration,
                               loan.LoanStatus
                           };
            return loanlist;
        }
        [Route("GetPendingLoan")]
        [HttpGet]
        public object GetPendingLoan()
        {
            var loanlist = from loan in context.Loans
                           join lp in context.LoanPrograms on loan.LoanId equals lp.Id
                           join user in context.Users on loan.AccountNo equals user.AccountNo
                           where loan.LoanStatus=="Pending"
                           select new
                           {
                               loan.AccountNo,
                               user.Name,
                               user.Aadhaar,
                               user.PAN,
                               lp.LoanType,
                               loan.LoanId,
                               loan.LoanAccountNo,
                               loan.Occupation,
                               loan.CurrentAddress,
                               loan.AnnualIncome,
                               loan.LoanAmount,
                               loan.Duration,
                               loan.LoanStatus,
                               loan.DateOfRequest
                           };
            return loanlist;
        }

        [Route("GetAcceptedLoan")]
        [HttpGet]
        public object GetAcceptedLoan()
        {
            DateTime date = DateTime.Today;
            var loanlist = from loan in context.Loans
                           join lp in context.LoanPrograms on loan.LoanId equals lp.Id
                           join user in context.Users on loan.AccountNo equals user.AccountNo
                           where loan.LoanStatus == "Accepted" && loan.InterviewDate ==date
                           select new
                           {
                               loan.AccountNo,
                               user.Name,
                               user.Aadhaar,
                               user.PAN,
                               lp.LoanType,
                               loan.LoanId,
                               loan.LoanAccountNo,
                               loan.Occupation,
                               loan.CurrentAddress,
                               loan.AnnualIncome,
                               loan.LoanAmount,
                               loan.Duration,
                               loan.LoanStatus,
                               loan.DateOfRequest
                           };
            return loanlist;
        }

        public object GetAcceptedLoan(int id)
        {
            
            var loanlist = from loan in context.Loans
                           join lp in context.LoanPrograms on loan.LoanId equals lp.Id
                           join user in context.Users on loan.AccountNo equals user.AccountNo
                           where loan.LoanAccountNo == id
                           select new
                           {
                               loan.AccountNo,
                               user.Name,
                               user.Aadhaar,
                               user.PAN,
                               lp.LoanType,
                               loan.LoanId,
                               loan.LoanAccountNo,
                               loan.Occupation,
                               loan.CurrentAddress,
                               loan.AnnualIncome,
                               loan.LoanAmount,
                               loan.Duration,
                               loan.LoanStatus,
                               loan.DateOfRequest
                           };
            return loanlist;
        }

        [HttpPost]
        public HttpResponseMessage Create(Loan loan)
        {
            try
            {
                context.Loans.Add(loan);
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);

            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
        [HttpPut]
        public HttpResponseMessage Update(Loan loan)
        {
            try
            {
                
                context.Entry(loan).State = System.Data.Entity.EntityState.Modified;
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
                context.Loans.Remove(context.Loans.Find(id));
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        [Route("UpdateToAccepted")]
        [HttpPut]
        public HttpResponseMessage UpdateToAccepted(int id,DateTime sdate)
        {
            try
            {
                
                var status = context.Loans.Where(x => x.LoanAccountNo == id).FirstOrDefault();
                status.LoanStatus = "Accepted";
                status.InterviewDate = sdate;
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

        }
        [Route("UpdateToRejected")]
        [HttpPut]
        public HttpResponseMessage UpdateToRejected(int id)
        {
            try
            {
                var status = context.Loans.Where(x => x.LoanAccountNo == id).FirstOrDefault();
                status.LoanStatus = "Rejected";
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

        }
        [Route("UpdateToApproved")]
        [HttpPut]
        public HttpResponseMessage UpdateToApproved(int id)
        {
            try
            {
                DateTime sdate = DateTime.Today;
                var status = context.Loans.Where(x => x.LoanAccountNo == id).FirstOrDefault();
                status.LoanStatus = "Approved";
                status.ApprovalDate = sdate;
                
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
