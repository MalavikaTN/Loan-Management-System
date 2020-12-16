import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Manager.css';
export default class Profile extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>                
                
                <td>{this.props.obj.Name}</td>
                <td>{this.props.obj.DOB}</td>
                <td>{this.props.obj.Email}</td>                
                <td>{this.props.obj.Phone}</td>
                <td>{this.props.obj.Address}</td> 
                <td className="hidetext">{this.props.obj.Password}</td>                               
                <td>
                    <Link to={{pathname: '/EditManager',state: this.props.obj.Id}}  className="btn btn-success">Edit</Link>
                </td>
            </tr>
        )
    }
}
