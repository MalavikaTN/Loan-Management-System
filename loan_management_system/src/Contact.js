import React, { Component } from 'react'
import {AiOutlineMail} from 'react-icons/ai'
import { FaMobileAlt } from 'react-icons/fa'
import Footer from './Footer';
export default class Contact extends Component {
    componentDidMount(){
        document.getElementById("login").style.display="block";
    document.getElementById("home2").style.display="none";
    document.getElementById("home").style.display="block";
    document.getElementById("about").style.display="block";
    document.getElementById("contact").style.display="block";
    document.getElementById("userIcon").style.display="none";
    }
    render() {
        return (
            <div style={{marginTop:60}}>
              <div className="col-md-4 offset-md-4 " style={{textAlign:"center",height:500}}>
                <div className="card" style={{height:250}}>
                <img class="card-img-top" src="https://www.ashokleyland.com/documents/1305159/1312286/Contact+us_topbanner_cropped.jpg/97407cec-b0fb-6e71-0062-76d3b367f6d2?t=1523961063566" alt="Card image cap"/> 
                <div className="card-body">
                    <p>P-42, 6th Main, 10th Sector, ABC Colony, Nagarabhavi, Bangalore 560075</p>
                    <p><AiOutlineMail style={{height:15,width:15,color:"maroon",marginTop:0}}/>loanmart@gmail.com</p>
                    <p><FaMobileAlt/>9986822163</p>
                </div>
                </div>    
              </div> 
              <Footer/> 
            </div>
        )
    }
}
