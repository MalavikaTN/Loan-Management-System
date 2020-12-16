import Axios from 'axios';
import React, { Component } from 'react'
import {format} from 'date-fns';
export default class EditManager extends Component {
    constructor(props){
        super(props);
        this.id=this.props.location.state;
        this.dob='';        
        this.handleChange=this.handleChange.bind(this);
        this.EditDetails=this.EditDetails.bind(this);
        this.state={            
            Id:'',
            Name:'',
            DOB:'',
            Address:'',            
            Phone:null,
            Email:'',
            Password:''
        };
    }

    componentDidMount(){
        document.getElementById("home2").style.display="block";
        Axios.get('https://localhost:44328/Api/Manager/'+this.id)
        .then(response=>{
           // console.log(response.data[0].Name);
           var dob=response.data[0].DOB;
            dob=format(new Date(dob),'yyyy-MM-dd');
            console.log(dob);
            document.getElementById("DOB").value=dob;
            this.setState({                
                Id:this.id,
                Name:response.data[0].Name,
                DOB:dob,
                Address:response.data[0].Address,                
                Phone:response.data[0].Phone,
                Email:response.data[0].Email,
                Password:response.data[0].Password
            });
        })
        .catch(function(err){
            console.log(err)
        })
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    EditDetails(e){
        e.preventDefault();
        const obj={
                Id:this.state.Id,
                Name:this.state.Name,
                DOB:this.state.DOB,
                Address:this.state.Address,                
                Phone:this.state.Phone,
                Email:this.state.Email,
                Password:this.state.Password
        };
        Axios.put('https://localhost:44328/Api/Manager/',obj)
        .then(res=>{
            console.log(res.data);
            alert("Updated..!");
            this.props.history.push({
                pathname:'/ManagerHomePage',
            state:{res:this.id}
        })
    })
    }
    render() {
        return (
            <div style={{marginTop:10}}>                
                <form onSubmit={this.EditDetails}>                              
                <div className="col-md-4 offset-md-4">
                <div className="card" style={{height:700}}>
                    <div className="mycard">
                    <h4 style={{textAlign:"center",fontWeight:400}}>Edit your profile</h4>  
                    <div className="form-group">
                        <label>Id : </label>
                        <input type="number" readOnly className="form-control" name="Id" id="Id"  onChange={this.handleChange} value={this.state.Id}/>
                    </div>

                    <div className="form-group">
                        <label>Name : </label>
                        <input type="text" pattern="[a-zA-Z]+" required className="form-control" name="Name" id="Name" placeholder="Enter name" onChange={this.onChangeName} value={this.state.Name}/>
                    </div>                

                    <div className="form-group">
                        <label>Password : </label>
                        <input type="password" required className="form-control" name="Password" minLength="6" maxLength="15" id="Password" placeholder="Enter password" onChange={this.handleChange} value={this.state.Password}/>
                    </div>

                    <div className="form-group">
                        <label>DOB : </label>
                        <input type="date" required className="form-control" name="DOB" id="DOB" placeholder="Enter DOB" onChange={this.handleChange} value={this.state.DOB}/>
                    </div>              
              
                    <div className="form-group">
                        <label>Address : </label>
                        <input type="text" required className="form-control" name="Address" id="Address" placeholder="Enter name" onChange={this.handleChange} value={this.state.Address}/>
                    </div>

                    <div className="form-group">
                        <label>Phone : </label>
                        <input type="text" pattern="^[6-9][0-9]{9}$" required className="form-control" name="Phone" id="Phone" placeholder="Enter name" onChange={this.handleChange} value={this.state.Phone}/>
                    </div>

                    <div className="form-group">
                        <label>Email : </label>
                        <input type="text" required className="form-control" pattern="^[a-z0-9_.]+@[a-z0-9]+.[a-z.]{2,5}$" name="Email" id="Email" placeholder="Enter name" onChange={this.handleChange} value={this.state.Email}/>
                    </div>


                    <button type="submit" className="btn btn-success btn-block" >Apply Changes</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
        )
    }
}
