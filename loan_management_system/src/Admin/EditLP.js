import Axios from 'axios';
import React, { Component } from 'react'

export default class EditLP extends Component {
    constructor(props){
        super(props);
        this.id=this.props.location.state;
        this.state={
            LoanType:'',Interest:'',Description:'',Id:''
        }
        this.editLP=this.editLP.bind(this);
    }
    componentDidMount(){
        document.getElementById("home2").style.display="block";
        Axios.get('https://localhost:44328/api/LoanProgram/'+this.id)
        .then(response =>{
            console.log(response.data);            
            this.setState({
                Id:this.id,
                LoanType:response.data[0].LoanType,
                Interest:response.data[0].Interest,
                Description:response.data[0].Description
            })
            
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
    editLP(e){
        e.preventDefault();
        const obj={
            Id:this.id,
            LoanType:this.state.LoanType,
            Interest:this.state.Interest,
            Description:this.state.Description
        }

        Axios.put('https://localhost:44328/api/LoanProgram/',obj)
        .then(response =>{
            console.log(response.data);            
            alert("Edited");
            this.props.history.push('AdminHomePage');
            
        })
        .catch(function(error){
            console.log(error);
        }) 
    }
    render() {
        return (
            <div className="col-md-10 offset-md-1" style={{marginTop:20,height:500}}>
            <div className="card mycard2">
            
                            <form onSubmit={this.editLP}>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="">Loan Type :</label>
                                    <input type="text" class="form-control" value={this.state.LoanType} onChange={this.handleChange} id="LoanType" placeholder="Enter type of loan program"/>
                                </div>                                
                                <div class="form-group col-md-6">
                                    <label for="">Rate of Interest :</label>
                                    <input type="number" class="form-control" value={this.state.Interest} id="Interest" placeholder="Enter Interest" onChange={this.handleChange}/>
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
