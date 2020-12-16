import React, { Component } from 'react'
import axios from 'axios';
import './User.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
export default class UserRegistration extends Component {
    constructor(props){
        super(props);
        this.state={
            AccountNo:null,
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
        this.AddUser=this.AddUser.bind(this);
    }
    

    AddUser=(e)=>{
        e.preventDefault();
        var gen;
        if(document.getElementById("Male").checked)
            gen=document.getElementById("Male").value;
        else if(document.getElementById("Female").checked)
            gen=document.getElementById("Female").value;
        else if(document.getElementById("Other").checked)
            gen=document.getElementById("Other").value;
        else
            alert("You have not selected gender");
        axios.post('https://localhost:44328/Api/User/',{AccountNo:this.state.AccountNo,Name:this.state.Name,DOB:this.state.DOB,Gender:gen,Religion:this.state.Religion,PAN:this.state.PAN,PermanentAddress:this.state.PermanentAddress,CurrentAddress:this.state.CurrentAddress,Phone:this.state.Phone,Email:this.state.Email,Password:this.state.Password,Aadhaar:this.state.Aadhaar})
        .then(response =>{
            alert("Data added");
            this.props.history.push('/UserLogin');
        })
        .catch(error => console.log(error))
        
    }
    handleChange =(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    componentDidMount(){
        var aadhaar=document.getElementById("Aadhaar");
        aadhaar.oninvalid=function(e){
            e.target.setCustomValidity("Enter 12 digit Aadhaar number");
            
        };
        aadhaar.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        var acNo=document.getElementById("AccountNo");
        acNo.oninvalid=function(e){
            e.target.setCustomValidity("Enter 10 digit Account number");
            
        };
        acNo.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        var pNo=document.getElementById("PAN");
        pNo.oninvalid=function(e){
            e.target.setCustomValidity("Enter valid PAN number (ex:ABCDE1234F)");
            
        };
        pNo.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        var pwd=document.getElementById("Password");
        pwd.oninvalid=function(e){
            e.target.setCustomValidity("Password length\nMin:6\tMax:15");
            
        };
        pwd.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        var phno=document.getElementById("Phone");
        phno.oninvalid=function(e){
            e.target.setCustomValidity("Enter valid phone number(10 digits)");
            
        };
        phno.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        var em=document.getElementById("Email");
        em.oninvalid=function(e){
            e.target.setCustomValidity("Invalid format");
            
        };
        em.onkeyup=function(e){
            e.target.setCustomValidity("");
            
        };
        document.getElementById("login").style.display="block";        
        document.getElementById("home").style.display="block";
        document.getElementById("userIcon").style.display="none";        
        document.getElementById("about").style.display="block";
        document.getElementById("contact").style.display="block";
    }

    render() {
        return (<>
        
            <form style={{marginTop:10}} onSubmit={this.AddUser}>                              
                <div className="col-md-4 offset-md-4">
                <div className="card "  style={{height:920}}>
                    <div className="mycard">
                <h4 style={{textAlign:"center"}}>Registration Form</h4>  
                <div className="form-group">
                    <label>AccountNo : </label>
                    <input type="text" required className="form-control" pattern="[1-9]{1}[0-9]{9}" name="AccountNo" id="AccountNo"  placeholder="Enter AccountNo" onChange={this.handleChange} value={this.state.AccountNo}/>
                </div>

                <div className="form-group">
                    <label>UserName : </label>
                    <input type="text" pattern="[a-zA-Z]+" required className="form-control" name="Name" id="Name" placeholder="Enter name" onChange={this.handleChange} value={this.state.Name}/>
                </div>                

                <div className="form-group">
                    <label>Password : </label>
                    <input type="password" required className="form-control" minLength="6" maxLength="15" name="Password" id="Password" placeholder="Enter password" onChange={this.handleChange} value={this.state.Password}/>
                </div>

                <div className="form-group">
                    <label>DOB : </label>
                    <input type="date" required className="form-control" name="DOB" id="DOB" placeholder="Enter DOB" onChange={this.handleChange} value={this.state.DOB}/>
                </div>

                {/* <div className="form-group">
                    <label>Gender : </label>
                    <input type="text" className="form-control" name="Gender" id="Gender" placeholder="Enter name" onChange={this.handleChange} value={this.state.Gender}/>
                </div> */}
                <div className="form-group">
                    <label>Gender : </label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Male" id="Male" />Male</label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Female" id="Female"/>Female</label>
                    <label class="radio-inline rbutton"><input type="radio" name="Gender" value="Other" id="Other"/>Other</label>
                    {/* <input type="text" className="form-control" name="Gender" id="Gender" placeholder="Enter name" onChange={this.handleChange} value={this.state.Gender}/> */}
                </div>


                <div className="form-group">
                    <label>Aadhar : </label>
                    <input type="text" required className="form-control" pattern="[1-9]{1}[0-9]{11}" name="Aadhaar" id="Aadhaar"  oninvalid="this.setCustomValidity('Enter 12 digit Aadhaar number')" placeholder="Enter Aadhaar" onChange={this.handleChange} value={this.state.Aadhaar}/>
                </div>

                <div className="form-group">
                    <label>PAN : </label>
                    <input type="text" required className="form-control" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" name="PAN" id="PAN" placeholder="Enter PAN" onChange={this.handleChange} value={this.state.PAN}/>
                </div>

                <div className="form-group">
                    <label>Permanent Address : </label>
                    <input type="text" required className="form-control" name="PermanentAddress" id="PermanentAddress" placeholder="Enter Permanent Address" onChange={this.handleChange} value={this.state.PermanentAddress}/>
                </div>

           
                <div className="form-group">
                    <label>Phone : </label>
                    <input type="text" required pattern="^[6-9][0-9]{9}$" className="form-control" name="Phone" id="Phone" placeholder="Enter Phone number" onChange={this.handleChange} value={this.state.Phone}/>
                </div>

                <div className="form-group">
                    <label>Email : </label>
                    <input type="text" className="form-control" pattern="^[a-z0-9_.]+@[a-z0-9]+.[a-z.]{2,5}$" name="Email" id="Email" placeholder="Enter Email" onChange={this.handleChange} value={this.state.Email}/>
                </div>


                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                </div>
                </div>
                </div>
            </form>
            <Footer/>
            </>
        )
    }
}
