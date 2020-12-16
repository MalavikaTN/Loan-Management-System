import React, { Component } from 'react'
import Footer from './Footer';

export default class About extends Component {
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
                <div className="col-md-10 offset-md-1" style={{height:800}}>
                <h4 style={{textAlign:"center",marginBottom:25}}>--About Us--</h4>
                <div className="row">
                <div className="col-md-4">
                    <img src="https://www.paisabazaar.com/wp-content/uploads/2019/09/Short-Term-768x511.jpg" style={{height:200,width:270}}/>
                </div>
                <div className="col-md-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDR8PEr0n1nMUfpeUW54VfG-kEQN4CT0mkA&usqp=CAU" style={{height:200,width:270}}/>
                </div>
                <div className="col-md-4">
                    <img src="https://www.tatacapital.com/content/dam/tata-capital/thumbnails/PL_03.jpg" style={{height:200,width:270}}/>
                </div>
                </div>
                <p>LoanMart is among India’s leading online loans marketplace led by a Gurgaon based team of techno-financial experts working on a mission to bring transparency, simplicity and convenience in the way people borrow money. MyLoanCare’s state-of-the-art, home-grown technology platform enables online delivery of loans and related services to customers with speed and transparency.</p>
                <p>LoanMart is among India’s leading online loans marketplace led by a Gurgaon based team of techno-financial experts working on a mission to bring transparency, simplicity and convenience in the way people borrow money. MyLoanCare’s state-of-the-art, home-grown technology platform enables online delivery of loans and related services to customers with speed and transparency.</p>
                <h4 style={{fontWeight:400,fontSize:18,marginTop:10,textAlign:"center"}}>Why do we exist?</h4>
                <p>
Do you agree that EMI's are the largest share of wallet of most working people in the age of 25-40? Yes, most of us spend more on EMI's than we do on all our other expenses put together. MyLoanCare's mission is to help you save something out of your largest spend item. We are India's first focussed online liabilties management firm!
We are a fast growing team of people focussed on bringing a big change. From Sun soaked beaches in Goa to the Himalayas in Guwahati, from tech valley in Bangalore to business hubs in Delhi and Coimbatore, from business-focused Ahmedabad to weekend-focused Gurgaon – we are changing the way people choose and avail loans in India.</p>
                </div>
                <Footer/>
            </div>
        )
    }
}
