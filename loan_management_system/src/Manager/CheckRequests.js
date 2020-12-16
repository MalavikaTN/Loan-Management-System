import Axios from 'axios';
import React, { Component } from 'react'
import './Manager.css';
export default class CheckRequests extends Component {
    constructor(props){
        super(props);
        this.id=this.props.location.state.res;
        this.mid=this.props.location.state.mId;
        this.approve=this.approve.bind(this);
        this.rejectLoan=this.rejectLoan.bind(this);
        this.state={
            loanReq:[]
        }        
    }

    componentDidMount(){
        document.getElementById("home2").style.display="block";
        Axios.get('https://localhost:44328/api/Loan/'+this.id)
        .then(response =>{                        
            this.setState({loanReq:response.data});
        console.log("ln 17:"+this.id);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    approve(e){
        var a=document.getElementById("cOne");
        var b=document.getElementById("cTwo");
        var c=document.getElementById("cThree");
        var d=document.getElementById("cFour");
        if(a.checked && b.checked && c.checked && d.checked){
            Axios.put('https://localhost:44328/api/Loan/UpdateToApproved?id='+this.id)
            .then(response =>{                        
                
                this.props.history.push({
                    pathname:'/ManagerHomePage',
                state:{res:this.mid}
            })
                console.log("ln 17:"+this.id);
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else {
            alert("Are you sure?\nAll the documents have not been verified.");
        }
    }
    
    rejectLoan(e){
       
        Axios.put('https://localhost:44328/api/Loan/UpdateToRejected?id='+this.id)
        .then(response =>{                        
            alert("Loan request rejected");
            this.props.history.push({
                pathname:'/ManagerHomePage',
            state:{res:this.mid}
        })
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (
            <div className="col-md-8 offset-md-2" style={{marginTop:60,height:450}}>
                <div className="card " style={{height:270,padding:10}}>
                <h5 style={{fontWeight:400,marginLeft:19}}>Verify the documents : </h5>
                {this.state.loanReq.map(function(object,i){
                    return <div className="" style={{padding:10,margin:5}}>
                        
                            <div class="form-check" style={{margin:10}}>
                                <input type="checkbox" id="cOne" class="form-check-input" />
                                <label class="form-check-label" for="exampleCheck1">Verified Identity proof</label>
                            </div>
                            <div class="form-check" style={{margin:10}}>
                                <input type="checkbox" id="cTwo" class="form-check-input" />
                                <label class="form-check-label" for="exampleCheck1">Verified Address proof</label>
                            </div>
                            <div class="form-check" style={{margin:10}}>
                                <input type="checkbox" id="cThree" class="form-check-input" />
                                <label class="form-check-label" for="exampleCheck1">Verified Employment/Income proof</label>
                            </div>
                            <div class="form-check" style={{margin:10}}>
                                <input type="checkbox" id="cFour" class="form-check-input" />
                                <label class="form-check-label" for="exampleCheck1">Verified KYC details</label>
                            </div>                            
                    </div>
                })}
                <div style={{marginLeft:30}}>
                <button type="button" className="btn btn-success" onClick={this.approve}>Approve Loan</button>
                <button className="btn btn-danger" type="button" style={{marginLeft:15}} onClick={this.rejectLoan}>Reject Loan</button>
                </div>
                
                </div>                
            </div>
        )
    }
}
