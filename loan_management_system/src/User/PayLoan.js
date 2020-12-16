import Axios from 'axios';
import React, { Component } from 'react'
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

export default class PayLoan extends Component {
    constructor(props){
        super(props);
        this.AC=this.props.location.state.ac;
        this.LAC=this.props.location.state.lac;
        this.EMI=this.props.location.state.emi;
        this.LA=this.props.location.state.lm;

        console.log(this.EMI+" "+this.LA);
        this.state={
            LoanAmount:this.lm,LoanAccountNo:this.LAC,EMI:this.EMI,PayingAmount:'',Balance:'',Fine:''
        }
        this.payAmount=this.payAmount.bind(this);
    }

    componentDidMount(){
        document.getElementById("home2").style.display="block";

        Axios.get('https://localhost:44328/api/Pay/GetBalance?id='+this.LAC)
        .then(response =>{
            console.log(response.data.Balance);            
            if(response.data==null){
                console.log("abc");
                this.setState({
                    Balance:this.LA,
                    
                });
                
            }
            else{
                this.setState({
                    Balance:response.data.Balance-this.state.PayingAmount
                });
            }
                
            
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
    payAmount(e){
        e.preventDefault();
        var date=format(new Date(),'yyyy/MM/dd');
        var balance=this.state.Balance-this.state.PayingAmount;
        
        
        console.log("h--"+balance); 
        Axios.post('https://localhost:44328/api/Pay/',{LoanAccountNo:this.LAC,PayingAmount:this.state.PayingAmount,PaymentDate:date,Balance:balance,Fine:0})
        .then(response =>{
            console.log(response.data);            
            alert("Payed");
            this.props.history.push({
                pathname:'/UserHomePage',
            state:{res:this.AC}
        })
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (
            <div className="col-md-10 offset-md-1" style={{marginTop:20,height:550}}>
            <div className="card" style={{height:400}}>
                <div style={{textAlign:"right",margin:10}}>
                 
                 
                </div> 
                <div>
                <form onSubmit={this.payAmount}>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="">Loan Account No :</label>
                                    <input type="number" readOnly class="form-control" value={this.state.LoanAccountNo}  id="LoanAccountNo" />
                                </div>                                
                                <div class="form-group col-md-3">
                                    <label for="">EMI :</label>
                                    <input type="number" readOnly class="form-control" value={this.state.EMI} id="EMI" />
                                </div>
                                <div class="form-group col-md-5">
                                    <label for="">Paying Amount :</label>
                                    <input type="text" required class="form-control" id="PayingAmount" value={this.state.PayingAmount} placeholder="Enter Paying Amount" onChange={this.handleChange}/>
                                </div>
                            </div>
                            
                            <div style={{textAlign:"center"}}>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </div>

                            </form>
                </div>
            </div>
            </div>
        )
    }
}
