import Axios from 'axios';
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class LoanRequestTable extends Component {
    constructor(props){
        super(props);
        this.acceptReq=this.acceptReq.bind(this);
        this.rejectReq=this.rejectReq.bind(this);
       this.state={
           date:''
       }
    this.goToModal=this.goToModal.bind(this);
    }
    changeDate =(e)=>{
        this.setState({
            date:e.target.value
        });
    }
    goToModal(e){
        document.getElementById("temp").value=this.props.obj.LoanAccountNo;
        
    }
    acceptReq(e){
        var b=document.getElementById("temp").value;
        // var b1= document.getElementsByName(this.props.obj.LoanAccountNo);
        // var b2=document.getElementById(this.props.obj.LoanAccountNo);
        //var val=b1.value;
        console.log(b);
        var b1=document.getElementsByName(b);
        var b2=document.getElementById(b);
        console.log(b1);
        Axios.put('https://localhost:44328/api/Loan/UpdateToAccepted?id='+b+'&sdate='+this.state.date)
        .then(response =>{
            console.log(response.data);          
            b1[0].innerHTML="Accepted";
            b1[0].disabled=true;            
            b2.disabled=true;
        })
        .catch(function(error){
            console.log(error);
        })
    }
    rejectReq(e){
        var b1= document.getElementsByName(this.props.obj.LoanAccountNo);
        var b2=document.getElementById(this.props.obj.LoanAccountNo);
        Axios.put('https://localhost:44328/api/Loan/UpdateToRejected?id='+this.props.obj.LoanAccountNo)
        .then(response =>{
            console.log(response.data);          
            b2.innerHTML="Rejected";
            b1[0].disabled=true;            
            b2.disabled=true;
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (<>
            <tr>                
                 
                <td>{this.props.obj.LoanAccountNo}</td>
                <td>{this.props.obj.LoanType}</td>
                <td>{this.props.obj.Name}</td> 
                <td>{this.props.obj.Aadhaar}</td> 
                <td>{this.props.obj.PAN}</td>                
                <td>{this.props.obj.Occupation}</td>
                <td>{this.props.obj.CurrentAddress}</td> 
                <td>{this.props.obj.AnnualIncome}</td>
                <td>₹{this.props.obj.LoanAmount}</td>
                <td>{this.props.obj.Duration}</td>   
                <td className="hidetext">{this.props.obj.Password}</td>                               
                <td>
                    <button type="button" name={this.props.obj.LoanAccountNo}  className="btn btn-success" onClick={this.goToModal} data-toggle="modal" data-target="#dateModal">Accept</button>
                </td>
                <td>
                    <button type="button" id={this.props.obj.LoanAccountNo}  className="btn btn-danger" onClick={this.rejectReq} >Reject</button>
                </td>
            </tr>


            <div class="modal fade" id="dateModal" tabindex="-1"  role="dialog"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Select date</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Choose a date to conduct interview for document verification and loan approval.</p>
                            <input id="temp" hidden/>
                            <input type="date" className="form-control" id="date" value={this.state.date} onChange={this.changeDate} />
                        </div>
                        <div class="modal-footer">
        
                            <button type="button" class="btn btn-primary"  onClick={this.acceptReq} data-dismiss="modal" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            </>
        )
    }
}
