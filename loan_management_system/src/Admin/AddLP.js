import Axios from 'axios';
import React, { Component } from 'react'
import './Admin.css';
export default class AddLP extends Component {
    constructor(props){
        super(props);      
        this.state={
            LoanType:'',Interest:'',Description:''
        }
        this.createLP=this.createLP.bind(this);
    }
    handleChange =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    componentDidMount(){
        document.getElementById("home2").style.display="block";
    }
    createLP(e){
        e.preventDefault();
        Axios.post('https://localhost:44328/api/LoanProgram/',{LoanType:this.state.LoanType,Interest:this.state.Interest,Description:this.state.Description})
        .then(response =>{
            console.log(response.data);            
            alert("Added");
            this.props.history.push('/AdminHomePage')
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (
            <div className="col-md-10 offset-md-1" style={{marginTop:10,height:490}}>
            <div className="card mycard2">
            <h5 style={{fontWeight:300,textAlign:"center"}}>Add new loan program</h5>
                            <form onSubmit={this.createLP}>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="">Loan Type :</label>
                                    <input type="text" required class="form-control" value={this.state.LoanType} onChange={this.handleChange} id="LoanType" placeholder="Enter type of loan program"/>
                                </div>                                
                                <div class="form-group col-md-6">
                                    <label for="">Rate of Interest :</label>
                                    <input type="number" required class="form-control" value={this.state.Interest} id="Interest" placeholder="Enter Interest" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div class="form-row">                                
                                <div class="form-group col-md-8 offset-md-2">
                                    <label for="">Description :</label>
                                    <textarea class="form-control" id="Description" value={this.state.Description} rows="4" placeholder="Enter some description about loan type" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div style={{textAlign:"center"}}>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </div>

                            </form>
                            </div></div>
        )
    }
}
