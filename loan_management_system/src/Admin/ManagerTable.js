import Axios from 'axios';
import React, { Component } from 'react'
import './Admin.css';
export default class ManagerTable extends Component {
    constructor(props){
        super(props);
        this.delManager=this.delManager.bind(this);
    }
    delManager(e){
        console.log(this.props.obj.Id);
        Axios.delete('https://localhost:44328/api/Manager/'+this.props.obj.Id)
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
            <tr>
                 <td>{this.props.obj.Name}</td>
                 <td>{this.props.obj.Email}</td>
                 <td>{this.props.obj.DOB}</td>
                 <td>{this.props.obj.Phone}</td>        
                 <td>{this.props.obj.Address}</td>                
                 <td>
                    <button type="button" className="btn btn-danger" onClick={this.delManager}>Delete</button>
                 </td>
            </tr>
        )
    }
}
