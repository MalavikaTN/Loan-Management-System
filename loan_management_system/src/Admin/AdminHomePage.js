import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Admin.css';
import LoanPrograms from './LoanPrograms';
import ManagerTable from './ManagerTable';
export default class AdminHomePage extends Component {
    constructor(props){
        super(props);        
        this.state={manager:[],loanReq:[],loanPgms:[],Name:'',Email:'',Password:'',Phone:'',DOB:'',Address:'',
                            LoanType:'',Interest:'',Description:''}
        this.createManager=this.createManager.bind(this);
        
        
    }
    componentDidMount(){
        document.getElementById("login").style.display="none";
        document.getElementById("about").style.display="none";
        document.getElementById("contact").style.display="none";
        document.getElementById("home2").style.display="block";
       document.getElementById("home").style.display="none";
       document.getElementById("userIcon").style.display="block";

        Axios.get('https://localhost:44328/api/Loan')
        .then(response =>{
            console.log(response.data);            
            this.setState({loanReq:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })

        Axios.get('https://localhost:44328/api/Manager')
        .then(response =>{
            console.log(response.data);            
            this.setState({manager:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })

        Axios.get('https://localhost:44328/api/LoanProgram')
        .then(response =>{
            console.log(response.data);            
            this.setState({loanPgms:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
    handleChange =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    createManager(e){
        console.log("here");
        e.preventDefault();
        Axios.post('https://localhost:44328/api/Manager/',{Name:this.state.Name,Email:this.state.Email,Phone:this.state.Phone,DOB:this.state.DOB,Address:this.state.Address,Password:this.state.Password})
        .then(response =>{
            console.log(response.data);            
            alert("Added");
            window.location.reload();
        })
        .catch(function(error){
            console.log(error);
        })
    }
    

    
    render() {
        return (
            <div style={{marginTop:10}}> 
                <nav className="" >
                    <div class="navA nav nav-tabs " id="nav-tab" role="tablist">
                         <a class="nav-item nav-link active" id="nav-home-tab" style={{color:"black",fontWeight:500}} data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">View Loan requests</a>
                         <a class="nav-item nav-link " id="nav-viewManager-tab" style={{color:"black",fontWeight:500}} data-toggle="tab" href="#nav-viewManager" role="tab" aria-controls="nav-viewManager" aria-selected="true">View Managers details</a>
                         <a class="nav-item nav-link " id="nav-addManager-tab" style={{color:"black",fontWeight:500}} data-toggle="tab" href="#nav-addManager" role="tab" aria-controls="nav-addManager" aria-selected="true">Add Client Manager</a>
                         <a class="nav-item nav-link " id="nav-viewLP-tab" style={{color:"black",fontWeight:500}} data-toggle="tab" href="#nav-viewLP" role="tab" aria-controls="nav-viewLP" aria-selected="true">View Loan Programs</a>
                         
                         
                    </div>                    
                </nav>

                <div class="tab-content mytab" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-home-tab">
                        <table className="table " style={{marginTop:10}}>
                            <thead className="table-secondary">
                                <tr>                            
                                    <th>Account No</th>
                                    <th>Loan Account No</th> 
                                    <th>Name</th>
                                    <th>Loan Type</th>                                                             
                                    <th>Occupation</th>                                                             
                                    <th>Annual Income</th>
                                    <th>Loan Amount</th>                         
                                    <th>Duration</th>
                                    <th>Status</th>                             
                                </tr>
                            </thead>
                            <tbody>
                             
                                {
                                                                  
                                    this.state.loanReq.map(function(object,i){
                                    return    object.LoanStatus=="Rejected"?(
                                        <tr className="table-danger">                
                                            <td>{object.AccountNo}</td>
                                            <td>{object.LoanAccountNo}</td>
                                            <td>{object.Name}</td>
                                            <td>{object.LoanType}</td>
                                            <td>{object.Occupation}</td>
                                            <td>₹{object.AnnualIncome}</td>
                                            <td>₹{object.LoanAmount}</td>                
                                            <td>{object.Duration}</td>
                                            <td>{object.LoanStatus}</td>                
                
                                        </tr>):(<tr className="table-default">                
                                            <td>{object.AccountNo}</td>
                                            <td>{object.LoanAccountNo}</td>
                                            <td>{object.Name}</td>
                                            <td>{object.LoanType}</td>
                                            <td>{object.Occupation}</td>
                                            <td>₹{object.AnnualIncome}</td>
                                            <td>₹{object.LoanAmount}</td>                
                                            <td>{object.Duration}</td>
                                            <td>{object.LoanStatus}</td>                
                
                                        </tr>)
                                    })
                                }  
                                            
                            </tbody>
                        </table>
                    </div> 

                    <div class="tab-pane fade show container" id="nav-viewManager" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-viewManager-tab">
                    <div className="col-md-10 offset-1">
                    <table className="table table-striped" style={{marginTop:10}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email Id</th>                                                             
                                    <th>Date of Birth</th>                                                             
                                    <th>Phone</th>
                                    <th>Address</th>                        
                                </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.manager.map(function(object,i){
                            return <ManagerTable obj={object} key={i} />
                                                                  })
                            }
                                                                          
                            </tbody>
                        </table>
                    </div>
                    </div>  

                    <div class="tab-pane fade show" id="nav-addManager" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-addManager-tab">
                        <div className="col-md-10 offset-md-1" >
                            <div className="card mycard">
                            <form onSubmit={this.createManager}>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="">Name :</label>
                                    <input type="text" required class="form-control" pattern="[a-zA-Z]+" value={this.state.Name} onChange={this.handleChange} id="Name" placeholder="Enter Name"/>
                                </div>                                
                                <div class="form-group col-md-4">
                                    <label for="">Password :</label>
                                    <input type="password" required minLength="5" class="form-control" value={this.state.Password} id="Password" placeholder="Enter temporary password" onChange={this.handleChange}/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">Email Id :</label>
                                    <input type="email" pattern="^[a-z0-9_.]+@[a-z0-9]+.[a-z.]{2,5}$" required class="form-control" id="Email" value={this.state.Email} placeholder="Enter Email Id" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="">Phone number :</label>
                                    <input type="text" pattern="^[6-9][0-9]{9}$" class="form-control" id="Phone" value={this.state.Phone} placeholder="Enter Phone no" onChange={this.handleChange}/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">Date of Birth :</label>
                                    <input type="date" required class="form-control" id="DOB" value={this.state.DOB} onChange={this.handleChange}/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">Address :</label>
                                    <input type="text" class="form-control" id="Address" value={this.state.Address} placeholder="Enter Address" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div style={{textAlign:"center"}}>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </div>

                            </form>
                            </div>
                        </div>
                    </div> 
                
                    <div class="tab-pane fade show " id="nav-viewLP" style={{minHeight:450}} role="tabpanel" aria-labelledby="nav-viewLP-tab">
                        
                        <div className="col-md-10 offset-md-1" style={{textAlign:"center"}}>
                        <div style={{textAlign:"right"}}>
                            <Link className="btn btn-info" to={"/AddLP"} style={{marginBottom:5}}  >Add Loan Program</Link>
                        </div>
                                {
                                                                  
                                    this.state.loanPgms.map(function(object,i){
                                       return <LoanPrograms obj={object} key={i} />
                                    })
                                }  
                                            
                        </div>   
                    </div>

                    
                
                </div>
            </div>
        )
    }
}
