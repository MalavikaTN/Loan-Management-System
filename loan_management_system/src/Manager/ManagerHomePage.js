import React, { Component } from 'react'
import Profile from './Profile';
import axios from 'axios';

import LoanRequestTable from './LoanRequestTable';
import CheckRequests from './CheckRequests';
import { Link } from 'react-router-dom';
import LoanCard from '../User/LoanCard';
export default class ManagerHomePage extends Component {
    constructor(props){
        super(props);
        this.id=this.props.location.state.res;
        this.state={details:[],loanReq:[],accLoan:[],loanPgms:[]}
    }
    componentDidMount(){
        document.getElementById("login").style.display="none";
        document.getElementById("about").style.display="none";
        document.getElementById("contact").style.display="none";
        document.getElementById("home2").style.display="block";
       document.getElementById("home").style.display="none";
       document.getElementById("userIcon").style.display="block";

       axios.get('https://localhost:44328/api/Manager/'+this.id)
        .then(response =>{
            //console.log(response.data);            
            this.setState({details:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })

        axios.get('https://localhost:44328/api/Loan/GetPendingLoan')
        .then(response =>{
            console.log(response.data);            
            this.setState({loanReq:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('https://localhost:44328/api/Loan/GetAcceptedLoan')
        .then(response =>{
            console.log(response.data);            
            this.setState({accLoan:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('https://localhost:44328/api/LoanProgram')
        .then(response=>{
            this.setState({loanPgms:response.data});
            
        }) 
        .catch(function(error){
            console.log(error);
        })

    }
    render() {
        {const mid=this.id}

        return (
            <div style={{marginTop:10}}>
                <nav className="" >
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                         <a class="nav-item nav-link " style={{color:"black",fontWeight:500}} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Loan requests</a>
                         <a class="nav-item nav-link active" id="nav-accept-tab" style={{color:"black",fontWeight:500}} data-toggle="tab" href="#nav-accept" role="tab" aria-controls="nav-accept" aria-selected="true">Take Interview</a>
                         <a class="nav-item nav-link" id="nav-LP-tab" data-toggle="tab" style={{color:"black",fontWeight:500}} href="#nav-LP" role="tab" aria-controls="nav-LP" aria-selected="false">Loan Programs</a>    
                         <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" style={{color:"black",fontWeight:500}} href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>    
                    </div>
                    
                </nav>
                <div class="tab-content mytab" id="nav-tabContent">
                    <div class="tab-pane fade show " id="nav-home" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-home-tab">
                    {this.state.loanReq?.length===0? (
                        <div>No pending requests</div> 
                    ):(
                        <div>
                        Loan Request Table
                        <table className="table" style={{marginTop:10}}>
                            <thead className="table-secondary">
                                <tr>                            
                                    <th>Loan Account No</th>
                                    <th>LoanType</th> 
                                    <th>Name</th>
                                    <th>Aadhaar</th>
                                    <th>PAN</th>                         
                                    <th>Occupation</th> 
                                    <th>Address</th>                         
                                    <th>Annual Income</th>
                                    <th>Loan Amount</th>                         
                                    <th>Duration</th> 
                                    <th colSpan="2"></th>                            
                                </tr>
                            </thead>
                            <tbody> 
                             
                                {
                                                                  
                                    this.state.loanReq.map(function(object,i){
                                        return <LoanRequestTable obj={object} key={i}/>
                                    })
                                }  
                                            
                            </tbody>
                        </table>
                        </div>
                        )}
                    </div>

                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" style={{height:450}} aria-labelledby="nav-profile-tab">
                        <table className="table " style={{marginTop:10}}>
                            <thead className="table-secondary">
                                <tr>                            
                                    <th>Name</th>
                                    <th>Date Of Birth</th>
                                    <th>Email Id</th>
                                    <th>Phone No</th>                            
                                    <th>Address</th>                            
                                    <th>Password</th>
                                    <th colSpan="1"></th>                            
                                </tr>
                            </thead>
                            <tbody>  
                                {
                                    this.state.details.map(function(object,i){
                                        return <Profile obj={object} key={i}/>
                                    })
                                }                 
                            </tbody>
                        </table>
                    </div>

                    <div class="tab-pane fade show active" id="nav-accept" style={{height:450}} role="tabpanel" aria-labelledby="nav-accept-tab">
                    {this.state.accLoan?.length===0? (
                        <div>No interviews</div> 
                    ):(
                        <div>                        
                        <table className="table" style={{marginTop:10}}>
                            <thead className="table-secondary">
                                <tr>                            
                                    <th>Loan Account No</th>
                                    <th>LoanType</th> 
                                    <th>Name</th>
                                    <th>Aadhaar No</th>
                                    <th>PAN No</th>                         
                                    <th>Occupation</th> 
                                    <th>Address</th>                         
                                    <th>Annual Income</th>
                                    <th>Loan Amount</th>                         
                                    <th>Duration</th> 
                                    <th colSpan="2"></th>                              
                                </tr>
                            </thead>
                            <tbody> 
                             
                                {
                                                                  
                                    this.state.accLoan.map(function(object,i){
                                        return <tr>                
                
                <td>{object.LoanAccountNo}</td>
                <td>{object.LoanType}</td>
                <td>{object.Name}</td> 
                <td>{object.Aadhaar}</td> 
                <td>{object.PAN}</td>                
                <td>{object.Occupation}</td>
                <td>{object.CurrentAddress}</td> 
                <td>₹{object.AnnualIncome}</td>
                <td>₹{object.LoanAmount}</td>
                <td>{object.Duration}</td>   
                                        
                                        <td>
                                            <Link to={{pathname: '/CheckRequests',state: {res:object.LoanAccountNo,mId:this.id}}}  className="btn btn-info">Take interview</Link>
                                        </td>
                                    </tr>
                                    },this)
                                }  
                                            
                            </tbody>
                        </table>
                        </div>
                        )}
                    </div>

                    <div class="tab-pane fade show " id="nav-LP" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-LP-tab">
                    <div className="row ">            
        {
        
        this.state.loanPgms.map(function(object,i){
            
        return <LoanCard obj={object} key={i}/>
       })}

        </div>
                    </div>
                </div>
            </div>
        )
    }
}
