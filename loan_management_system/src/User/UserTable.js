import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './User.css'
export default class UserTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                
                <td>{this.props.obj.AccountNo}</td>
                <td>{this.props.obj.Name}</td>
                <td>{this.props.obj.DOB}</td>
                <td>{this.props.obj.Gender}</td>
                <td>{this.props.obj.Aadhaar}</td>
                <td>{this.props.obj.PAN}</td>
                <td>{this.props.obj.PermanentAddress}</td>                
                <td>{this.props.obj.Phone}</td>
                <td>{this.props.obj.Email}</td>
                <td className="hidetext">{this.props.obj.Password}</td>
                <td>
                    <Link to={{pathname: '/EditUser',state: this.props.obj.AccountNo}} st className="btn btn-success">Edit</Link>
                </td>
            </tr>
        )
    }
}
