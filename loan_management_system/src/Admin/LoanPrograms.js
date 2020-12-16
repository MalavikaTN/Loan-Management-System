import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Admin.css';
export default class LoanPrograms extends Component {
    constructor(props){
        super(props);
        this.delLP=this.delLP.bind(this);
    }
    delLP(e){
        Axios.delete('https://localhost:44328/api/LoanProgram/'+this.props.obj.Id)
        .then(response =>{
            console.log(response.data);            
            window.location.reload();
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        return (
            <div className="card cardLP">
                <div className="card-header"><b>{this.props.obj.LoanType}</b> ({this.props.obj.Interest}%)</div>
                <div className="card-body">
                    <h6><u>Description</u></h6>
                    <p>{this.props.obj.Description}</p>
                </div>
                <div className="card-footer" style={{textAlign:"center"}}>
                    <Link to={{pathname:'/EditLP',state: this.props.obj.Id}} type="button" className="btn bLink" style={{padding:2,paddingBottom:2,paddingTop:2,width:50}} >Edit</Link>
                    <button type="button" className="btn bbtn" style={{padding:0,paddingBottom:2,paddingTop:2}} onClick={this.delLP}>Delete</button>
                </div>
            </div>            
        )
    }
}
