import React, { Component } from "react";
import Footer from "../Footer";
import './User.css';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            Name:'',
            Password:'',
            Type:''
        };
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
   // this.validateUser=this.validateUser.bind(this);
    }

    // validateUser=()=>{
    //     debugger;
    //     axios.post('https://localhost:44328/Api/User/ValidateUser/'+{Name:this.state.Name,Password:this.state.Password,Status:0})
    //     .then(json=>{
    //         if(json.data.Status==="valid"){
    //             console.log(json.data.Status);
    //             alert("Valid");
    //             this.props.history.replace('/UserHomePage');
    //         }
    //         else
    //         alert("invalid")
            
    //     }
            
    //     )
    //     .catch(err => { 
    //         //this.setState({errorMessage: false});
    //         console.log(err);
    //       })
    // }

    componentDidMount(){
        document.getElementById("login").style.display="block";        
        document.getElementById("home").style.display="block";
        document.getElementById("userIcon").style.display="none";        
        document.getElementById("about").style.display="block";
        document.getElementById("contact").style.display="block";
    }

    login=(event) =>{    
        event.preventDefault();
        console.log(document.getElementById("Type").value)    
                debugger;  
                if(document.getElementById("Type").value==="Admin"){
                    if(this.state.Name==="admin" && this.state.Password==="admin")
                        this.props.history.push('/AdminHomePage')                         
                    else
                        alert("Invalid");
                }             
                else {
                fetch('https://localhost:44328/Api/User/ValidateUser', {        
                    method: 'post',        
                    headers: {        
                        'Accept': 'application/json',
        
                        'Content-Type': 'application/json'
                    },        
                    body: JSON.stringify({
        
                        Name: this.state.Name,

                        Password: this.state.Password,
                        Type:this.state.Type
        
                    })        
                }).then((Response) => Response.json())
        
                    .then((result) => {        
                        console.log(result);        
                        if (result === 0){
                            alert('Invalid username/password');
                        }
        
                        else{
                            if(document.getElementById("Type").value==="User"){
                                //alert('valid User');
                                console.log(result);
                                this.props.history.push({
                                    pathname:'/UserHomePage',
                                state:{res:result}
                            });
                            }
                            else if(document.getElementById("Type").value==="Manager"){
                                //alert('valid manager');
                                this.props.history.push({
                                    pathname:'/ManagerHomePage',
                                state:{res:result}
                            });
                            }
                            
                    }                
                   
                }
                )                    
            }             
              
        }    
        

    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    register(){
        this.props.history.push('/UserRegistration');
    }
    render() {
        return (<>
            <div style={{height:530}}>
            <form style={{marginTop:10}} onSubmit={this.login}>
            <div className="col-md-4 offset-md-4">
                <div className="card" style={{height:430}}>
                <div className="mycard">
                <h4 style={{textAlign:"center"}}>Sign In</h4>
                
                <div className="form-group">
                <label >Login as :</label>
<select id="Type" name="Type" onChange={this.handleChange} className="form-control">
  <option selected value="Admin">Admin</option>
  <option value="Manager">Manager</option>
  <option value="User">User</option>
  
</select>
                </div>
                <div className="form-group">
                    <label>UserName : </label>
                    <input required type="text" className="form-control" name="Name" id="Name" placeholder="Enter name" onChange={this.handleChange} value={this.state.Name}/>
                </div>

                <div className="form-group">
                    <label>Password : </label>
                    <input required type="password" className="form-control" name="Password" id="Password" placeholder="Enter password" onChange={this.handleChange} value={this.state.Password}/>
                </div>


                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                <p>New User?</p>
                <button type="button" className="btn btn-default btn-block" onClick={this.register}>Register</button>
                </div>
                </div></div>
            </form></div>
            <Footer/></>
        );
    }
}