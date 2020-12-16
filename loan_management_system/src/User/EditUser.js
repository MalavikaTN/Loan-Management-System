import React, { Component } from 'react'
import axios from 'axios';
import './User.css';
import {format} from 'date-fns';
export default class EditUser extends Component {
    
    constructor(props){
        super(props);
        this.id=this.props.location.state;
        this.dob='';
        this.onChangeName=this.onChangeName.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.EditDetails=this.EditDetails.bind(this);
        this.state={            
            AccountNo:'',
            Name:'',
            DOB:'',
            Gender:'',
            Aadhaar:'',
            PAN:'',
            PermanentAddress:'',            
            Phone:null,
            Email:'',
            Password:''
        };
        
    }
    componentDidMount(){
        document.getElementById("login").style.display="none";
       document.getElementById("home2").style.display="block";
       document.getElementById("home").style.display="none";
       document.getElementById("about").style.display="none";
       document.getElementById("contact").style.display="none";
       document.getElementById("userIcon").style.display="block";

        axios.get('https://localhost:44328/Api/User/'+this.id)
        .then(response=>{
            //console.log(response.data[0].Name);
            
            var gen = response.data[0].Gender;
            var dob=response.data[0].DOB;
            dob=format(new Date(dob),'yyyy-MM-dd');
            console.log(dob);
            document.getElementById("DOB").value=dob;
            document.getElementById(gen).checked=true;
            this.setState({
                
                AccountNo:this.id,
                Name:response.data[0].Name,
                DOB:dob,
                Gender:response.data[0].Gender,
                Aadhaar:response.data[0].Aadhaar,
                PAN:response.data[0].PAN,
                PermanentAddress:response.data[0].PermanentAddress,
                
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
    onChangeName =(e)=>{
        this.setState({
            Name:e.target.value
        });
    }

    EditDetails(e){
        debugger;
        e.preventDefault();
        

        var gen;
        if(document.getElementById("Male").checked)
            gen=document.getElementById("Male").value;
        else if(document.getElementById("Female").checked)
            gen=document.getElementById("Female").value;
        else
            gen=document.getElementById("Other").value;
        console.log("name: "+this.state.name)
        const obj={
            AccountNo:this.state.AccountNo,
                Name:this.state.Name,
                DOB:this.state.DOB,
                Gender:gen,
                Aadhaar:this.state.Aadhaar,
                PAN:this.state.PAN,
                PermanentAddress:this.state.PermanentAddress,                
                Phone:this.state.Phone,
                Email:this.state.Email,
                Password:this.state.Password
        };
        
        axios.put('https://localhost:44328/Api/User/',obj)
        .then(res=>{
            console.log(res.data);
            alert("Update..!");
            this.props.history.push({
                pathname:'/UserHomePage',
            state:{res:this.id}
        })
    })
    }
    showPwd(e){
        var pBox=document.getElementById("Password");
        if(pBox.type==="password")
            pBox.type="text"
        else
            pBox.type="password"
    }
    
    render() {
        return (
            <div style={{marginTop:70}}>
                
                <form onSubmit={this.EditDetails}>                              
                <div className="col-md-4 offset-md-4">
                <div className="card " style={{height:920}}>
                    <div className="mycard">
        <h4 style={{textAlign:"center"}}>Edit profile</h4>  
                <div className="form-group">
                    <label>AccountNo : </label>
                    <input type="number" readOnly className="form-control" name="AccountNo" id="AccountNo" placeholder="Enter AccountNo" onChange={this.handleChange} value={this.state.AccountNo}/>
                </div>

                <div className="form-group">
                    <label>UserName : </label>
                    <input type="text" required className="form-control" name="Name" id="Name" placeholder="Enter name" onChange={this.onChangeName} value={this.state.Name}/>
                </div>                

                <div className="form-group">
                    <label>Password : </label>
                    <input type="password" required className="form-control" minLength="6" maxLength="15" name="Password" id="Password" placeholder="Enter password" onChange={this.handleChange} value={this.state.Password}/>                    
                </div>
                <div className="form-group" style={{fontSize:13,marginTop:2}}>                
                <input type="checkbox" id="check" onClick={this.showPwd} style={{width:10,height:10,marginLeft:5,marginRight:3}}/>
                <label >Show password</label>
                </div>

                <div className="form-group">
                    <label>DOB : </label>
                    <input type="date" required className="form-control" name="DOB" id="DOB" placeholder="Enter DOB" onChange={this.handleChange} value={this.state.DOB}/>
                </div>

                <div className="form-group">
                    <label>Gender : </label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Male" id="Male" />Male</label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Female" id="Female"/>Female</label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Other" id="Other"/>Other</label>
                    {/* <input type="text" className="form-control" name="Gender" id="Gender" placeholder="Enter name" onChange={this.handleChange} value={this.state.Gender}/> */}
                </div>

                <div className="form-group">
                    <label>Aadhaar No : </label>
                    <input type="text" required className="form-control" name="Aadhaar" id="Aadhaar" pattern="[1-9]{1}[0-9]{11}" placeholder="Enter Aadhaar Number" onChange={this.handleChange} value={this.state.Aadhaar}/>
                </div>

                <div className="form-group">
                    <label>PAN : </label>
                    <input type="text" required className="form-control" name="PAN" id="PAN" placeholder="Enter PAN" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" onChange={this.handleChange} value={this.state.PAN}/>
                </div>

                <div className="form-group">
                    <label>Permanent Address : </label>
                    <input type="text" required className="form-control" name="PermanentAddress" id="PermanentAddress" placeholder="Enter name" onChange={this.handleChange} value={this.state.PermanentAddress}/>
                </div>

                <div className="form-group">
                    <label>Phone : </label>
                    <input type="text" pattern="^[6-9][0-9]{9}$" required className="form-control" name="Phone" id="Phone" placeholder="Enter name" onChange={this.handleChange} value={this.state.Phone}/>
                </div>

                <div className="form-group">
                    <label>Email : </label>
                    <input type="text" required className="form-control" name="Email" id="Email" pattern="^[a-z0-9_.]+@[a-z0-9]+.[a-z.]{2,5}$" placeholder="Enter name" onChange={this.handleChange} value={this.state.Email}/>
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
