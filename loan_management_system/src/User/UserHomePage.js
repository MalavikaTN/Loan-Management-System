import React, { Component } from 'react'
import axios from 'axios';
import UserTable from './UserTable';
import './User.css';
import {format} from 'date-fns';
import LoanCard from './LoanCard';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class UserHomePage extends Component {
    
    constructor(props){
        super(props);
        this.id=this.props.location.state.res;
        console.log("hi "+this.id);
        
        this.state={details:[],allLoan:[],clLoan:[],loanPgms:[],LoanId:'',AccountNo:this.id,Occupation:'',CurrentAddress:'',AnnualIncome:'',LoanAmount:'',Duration:'',DateOfRequest:'',LoanStatus:'Pending'
                };
        this.sendLoanRequest=this.sendLoanRequest.bind(this);
        this.sliderFunc=this.sliderFunc.bind(this);
        this.handleChange=this.handleChange.bind(this);
         this.checkBalance=this.checkBalance.bind(this);
    }
    componentDidMount(){
       document.getElementById("login").style.display="none";
       document.getElementById("home2").style.display="block";
       document.getElementById("home").style.display="none";
       document.getElementById("about").style.display="none";
       document.getElementById("contact").style.display="none";
       document.getElementById("userIcon").style.display="block";
       
       document.getElementById("AccNobox").value=this.id;
       

       
       axios.get('https://localhost:44328/api/User/'+this.id)
        .then(response =>{
            //console.log(response.data);
            
            this.setState({details:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
        var selbox=document.getElementById("LoanId");
        axios.get('https://localhost:44328/api/LoanProgram')
        .then(response=>{
            this.setState({loanPgms:response.data});
            this.state.loanPgms.map(function(object,i){
                var option=document.createElement("option");
                option.text=object.LoanType;
                option.value=object.Id;
                option.id=object.Id;
                selbox.appendChild(option);
            });
        }) 
        
        axios.get('https://localhost:44328/api/Pay/GetAllLoan?id='+this.id)
        .then(response =>{
            console.log(response.data);            
            this.setState({allLoan:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('https://localhost:44328/api/Pay/GetClosedLoan?id='+this.id)
        .then(response =>{
            console.log(response.data);            
            this.setState({clLoan:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
        
    }
    sliderFunc(e){
        let tenure=document.getElementById("tenure").value;
        console.log(tenure+" months");
        document.getElementById("spanValue").innerHTML=tenure+" months";
    }
    calcEMI(e){
        e.preventDefault();
        var rate=0;
        rate=document.getElementById("interest").value;
        var pAmount=0;
        pAmount=document.getElementById("loanAmt").value;
        var tenure=0;
        tenure=document.getElementById("tenure").value;
        let interest=rate/1200;
        let top=Math.pow((1+interest),tenure);
        let ratio=top/(top-1);
        let EMI=Math.round(pAmount*interest*ratio);
        let tEMI=Math.round(EMI*tenure-pAmount);
        let total=Math.round(EMI*tenure);
        console.log("EMI "+EMI);
        document.getElementById("EMI").innerHTML=EMI;
        document.getElementById("intPay").innerHTML=tEMI;
        document.getElementById("totalPay").innerHTML=total;
    }
    handleChange =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    sendLoanRequest(e){
        e.preventDefault();        
        var date=format(new Date(),"yyyy/MM/dd");
        console.log("ln 82: "+this.state.LoanId)
        axios.post('https://localhost:44328/api/Loan/',{AccountNo:this.id,LoanId:this.state.LoanId,Occupation:this.state.Occupation,CurrentAddress:this.state.CurrentAddress,AnnualIncome:this.state.AnnualIncome,LoanAmount:this.state.LoanAmount,Duration:this.state.Duration,DateOfRequest:date,LoanStatus:this.state.LoanStatus})
        .then(response =>{
            alert("Loan Request Sent");
            document.getElementById("Occupation").value="";
            document.getElementById("CurrentAddress").value="";
            document.getElementById("AnnualIncome").value="";
            document.getElementById("LoanAmount").value="";
        })
        .catch(error => console.log(error))
    }

    checkBalance=(lac)=>{

        Axios.get('https://localhost:44328/api/Pay/GetBalance?id='+lac)
        .then(response=>{
            document.getElementById("titleBox").innerHTML="Loan Account number: "+lac;
            document.getElementById("bBox").innerHTML="Remaining amount to be paid is Rs."+response.data.Balance;
            })
        .catch(error => console.log(error))
    }
   
    render() {
        
        return (<>
            <div style={{marginTop:10}} className="Uhome">       
         
                
             
        <nav className="" >
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
    <a class="nav-item nav-link " id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Calculate EMI</a>
    <a class="nav-item nav-link " id="nav-reqLoan-tab" data-toggle="tab" href="#nav-reqLoan" role="tab" aria-controls="nav-reqLoan" aria-selected="false">Apply for Loan</a>
    <a class="nav-item nav-link active" id="nav-loan-tab" data-toggle="tab" href="#nav-loan" role="tab" aria-controls="nav-loan" aria-selected="false">Loan</a>
  </div>
</nav>
<div class="tab-content mytab" id="nav-tabContent">

  <div class="tab-pane fade show container" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
  {/* <h5 style={{fontWeight:400,textAlign:"center"}}>Our loan programs</h5> */}
        <div className="row ">            
        {
        
        this.state.loanPgms.map(function(object,i){
            
        return <LoanCard obj={object} key={i}/>
       })}

        </div>
  </div>

  <div class="tab-pane fade" id="nav-profile" style={{height:450}} role="tabpanel" aria-labelledby="nav-profile-tab">
  <table className="table table-striped" style={{marginTop:10}}>
                    <thead className="table-secondary">
                        <tr>
                            <th>AccountNo</th>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Gender</th>
                            <th>Aadhaar</th>
                            <th>PAN</th>
                            <th>Permanent Address</th>                            
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>                      

                           
                            {
        
         this.state.details.map(function(object,i){
             
         return <UserTable obj={object} key={i}/>
        })}
                       
                    </tbody>
                </table>

  </div>
  <div class="tab-pane fade show " id="nav-contact" style={{height:450}} role="tabpanel" aria-labelledby="nav-contact-tab">
      <div className="row">
      <div className="col-md-4" >
            <div className="card" style={{height:380,marginLeft:40}}>
                <div className="card-header"> EMI calculator  </div>
                <form className="card-body" onSubmit={this.calcEMI}>
                <div class="form-row">
                    <div class="form-group col-md-6">
                         <label for="">Loan Amount</label>
                         <input required type="number" class="form-control" id="loanAmt" placeholder="In rupees"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="">Interest</label>
                        <input required type="text" class="form-control" id="interest" placeholder="Interest"/>
                    </div>
                </div>
                <div class="d-flex justify-content-center my-4">
                  <div class="w-75">
                  <label for="" >Tenure</label>
                        <input required type="range" className="custom-range form-control" id="tenure" min="12" max="72" step="12" onChange={this.sliderFunc} />
                        <span class="font-weight-bold text-primary ml-2 valueSpan2" id="spanValue" style={{float:"right"}}></span>
                 </div>
                 
                </div>
                <div style={{textAlign:"center"}}>
                <button type="submit" className="btn btn-secondary"  >Find</button>
                </div>
                
                </form> 
            </div>
        </div>
        <div className="col-md-1"></div>
        
        <div class="card text-white bg-secondary rseCard mb-3 col-sm-2" >
            <div class="card-header" style={{height:60,textAlign:"center"}}>Loan EMI<small> (₹)</small></div>
                <div class="card-body cbody">
                 <h5 ><label id="EMI" readOnly></label> </h5>
                
             </div>
            </div>
           
         <div class="card text-white bg-secondary rseCard mb-3 col-sm-2" >
            <div class="card-header" style={{height:60}}>Interest payable<small>(₹)</small></div>
                <div class="card-body cbody">
                <h5 ><label id="intPay" ></label>  </h5>
                
             </div>
            </div>
            <div class="card text-white bg-secondary rseCard mb-3 col-sm-2" >
            <div class="card-header " style={{height:60}}>Total payment<small> (₹)</small></div>
                <div class="card-body cbody">
                <h5 ><label id="totalPay"></label> </h5>
                
             </div>
            </div>
            
        
        
     
  </div>
</div>

<div class="tab-pane fade show " id="nav-reqLoan" style={{height:450}} role="tabpanel" aria-labelledby="nav-reqLoan-tab">
<form onSubmit={this.sendLoanRequest}>
    
  <div class="form-row">
  <div class="form-group ">
      <label hidden for="">Account number</label>
      <input hidden type="text" readOnly class="form-control" id="AccNobox" placeholder=""/>
    </div>
    <div class="form-group col-md-4">
      <label for="">Loan Type</label>
      <select required id="LoanId" className="form-control" onChange={this.handleChange}>
      <option selected disabled>(Choose any)</option>
      </select>
    </div>    
    <div class="form-group col-md-4">
      <label for="">Occupation</label>
      <input required pattern="[a-zA-Z]+" type="text"  class="form-control" id="Occupation" placeholder="Enter your occupation" onChange={this.handleChange} value={this.state.Occupation}/>
    </div>
    <div class="form-group col-md-4">
      <label for="">Current Address</label>
      <input type="text" required class="form-control" id="CurrentAddress" placeholder="Enter current address" onChange={this.handleChange} value={this.state.CurrentAddress}/>
    </div>
  </div>
  
  <div class="form-row">
    
    <div class="form-group col-md-4">
      <label for="">Annual Income</label>
      <input type="text" required class="form-control" id="AnnualIncome" placeholder="(in rupees)" onChange={this.handleChange} value={this.state.AnnualIncome} />
    </div>
    <div class="form-group col-md-4">
      <label for="">Loan amount</label>
      <input type="text" required class="form-control" id="LoanAmount" placeholder="(in rupees)" onChange={this.handleChange} value={this.state.LoanAmount}/>
    </div>
    <div class="form-group col-md-4">
      <label for="">Duration</label>
      <select id="Duration" className="form-control" onChange={this.handleChange}>
      <option selected disabled>(In months)</option>
        <option id="12" value="12">12</option>
        <option id="24" value="24">24</option>
        <option id="36" value="36">36</option>
        <option id="48" value="48">48</option>
        <option id="60" value="60">60</option>
      </select>
    </div>
    {/* <div class="form-group col-md-4">
      <label for="">EMI</label>
      <input type="number"  class="form-control" id="genEMI" placeholder="" onChange={this.handleChange} value={this.state.EMI}/>
    </div> */}
  </div>
  <div class="form-row" style={{marginLeft:200}}>
    
    {/* <div class="form-group col-md-5">
      <label for="">Date of Request</label>
      <input type="date" class="form-control" id="DateOfRequest" onChange={this.handleChange} value={this.state.DateOfRequest} />
    </div> */}
    
  </div>
  <div style={{textAlign:"center"}}>
      
      <button type="submit" className="btn btn-secondary" >Submit</button>
  </div>
  </form>
</div>

<div class="tab-pane fade show active" id="nav-loan" style={{height:450}} role="tabpanel" aria-labelledby="nav-loan-tab">
    <div className="col-md-12">
{this.state.clLoan?.length===0&&this.state.allLoan?.lenght===0?(
    <div> You have not requested for loan </div>
):        (
            
            <table className="table " style={{marginTop:10}}>
                    <thead className="table-secondary">
                        <tr>                            
                            <th>Loan Account No</th>                            
                            <th>Loan Amount</th>
                            <th>Duration </th>
                            {/* <th>EMI</th>
                            <th>Approval Date</th> */}
                            <th>Loan Status</th>
                            <th colSpan="1"></th>
                        </tr>
                    </thead>
                    <tbody>                   
            {
        
         this.state.allLoan.map(function(object,i){
             
         return <tr>
         <td>{object.LoanAccountNo}</td>
         <td>₹{object.LoanAmount}</td>                
         <td>{object.Duration}</td>
       {/*   <td>{object.EMI}</td>
         <td>{object.ApprovalDate}</td> */}
         <td>{object.LoanStatus}</td>
         <td>
             <Link to={{pathname: '/PayLoan',state: {ac:this.id,lac:object.LoanAccountNo,emi:object.EMI,lm:object.LoanAmount}}} st className="btn btn-success">Pay EMI</Link>
             <Link className="btn btn-info" type="button" style={{marginRight:10,marginLeft:10}} to={{pathname: '/payHistory',state: {ac:this.id,lac:object.LoanAccountNo}}}>Payment history</Link>
             <button className="btn btn-info" type="button" onClick={this.checkBalance.bind(this,object.LoanAccountNo)} data-toggle="modal" data-target="#exampleModalCenter">Check balance</button>
         </td>
     </tr>
        },this)}

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleBox"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h6 id="bBox" style={{color:"GrayText",fontWeight:400,fontSize:18}}></h6>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
        
      </div>
    </div>
  </div>
</div>
        
        {(this.state.clLoan.map(function(object,i){
             
            return <tr>
            <td>{object.LoanAccountNo}</td>
            <td>₹{object.LoanAmount}</td>                
            <td>{object.Duration}</td>
          {/*   <td>{object.EMI}</td>
            <td>{object.ApprovalDate}</td> */}
            <td>{object.LoanStatus}</td>
            
            <td>
                <button disabled  className="btn btn-success">Pay EMI</button>
                <Link className="btn btn-info" type="button" style={{marginRight:10,marginLeft:10}} to={{pathname: '/payHistory',state: {ac:this.id,lac:object.LoanAccountNo}}}>Payment history</Link>
                <button disabled className="btn btn-info" type="button" >Check balance</button>
            </td>
        </tr>
           },this))}
                       
                    </tbody>
                </table>
        )}
    </div>
</div>

</div>               
            
</div> </>  
)
    }
}
