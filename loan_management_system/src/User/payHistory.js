import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class payHistory extends Component {
    constructor(props){
        super(props);
        this.AC=this.props.location.state.ac;
        this.LAC=this.props.location.state.lac;
        this.state={
            payList:[]
        }
    }
    componentDidMount(){
        document.getElementById("home2").style.display="block";
        Axios.get('https://localhost:44328/api/Pay/'+this.LAC)
        .then(response =>{
            console.log(response.data);            
            this.setState({payList:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (<><div style={{height:500}}>
            <div className="col-md-10 offset-md-1" >
{this.state.payList?.length===0?(
    <div> ---------No payment history--------- </div>
):        (
            
            <table className="table table-striped" style={{marginTop:10}}>
                    <thead className="table-secondary">
                        <tr>                            
                            <th>Loan Account No</th>                            
                            <th>Loan Amount</th>
                            <th>Amount Payed </th>
                            <th>Payment Date</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>                   
            {
        
         this.state.payList.map(function(object,i){
             
         return <tr>
         <td>{object.LoanAccountNo}</td>
         <td>₹{object.LoanAmount}</td>                
         <td>₹{object.PayingAmount}</td>
         <td>{object.PaymentDate}</td>
         <td>₹{object.Balance}</td>
         
     </tr>
        })}
                       
                    </tbody>
                </table>
        )}
        
    </div>
    <div style={{textAlign:"center"}}>
            <Link  className="btn btn-info" type="button" to={{pathname:'/UserHomePage',state:{res:this.AC}}} >OK</Link>
        </div></div>
      </>  )
    }
}
