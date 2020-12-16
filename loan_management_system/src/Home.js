import Axios from 'axios';
import React, { Component } from 'react'
import './App.css';
import Footer from './Footer';
import './Home.css';
import Navbar from './Navbar';
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      loanPgms:[]
    }
  }
  componentDidMount(){
    document.getElementById("login").style.display="block";
    document.getElementById("home2").style.display="none";
    document.getElementById("home").style.display="block";
    document.getElementById("about").style.display="block";
    document.getElementById("contact").style.display="block";
    document.getElementById("userIcon").style.display="none";

    Axios.get('https://localhost:44328/api/LoanProgram')
        .then(response =>{
            console.log(response.data);            
            this.setState({loanPgms:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        })
    
}
    render() {
        return (<>
         
            <div className="pageBody">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100 img" src="https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724245_960_720.jpg" alt="First slide"/>
      <div class="carousel-caption d-md-block">
    
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 img" src="https://cdnblog.etmoney.com/wp-content/uploads/2019/05/personal-loan-1.jpg" alt="Second slide"/>
      <div class="carousel-caption d-none d-md-block">
    
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 img" src="https://www.lendingkart.com/wp-content/uploads/2020/07/Agriculture-Business-Plan-1024x538.jpg" alt="Third slide"/>
      <div class="carousel-caption d-none d-md-block">
    
  </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
            
            
            <div className="container" style={{marginTop:20}}>
            <hr></hr>
            <div className="row">
              <div className="col-md-6">
                <h5 style={{fontWeight:300,textAlign:"center"}}>--Current Interest Rates--</h5>
              <table className="table " style={{marginTop:20,height:300}}>
                            <thead>
                                <tr className="tHead">                            
                                    <th>Loan Type</th>
                                    <th>Rate %</th> 
                                                                
                                </tr>
                            </thead>
                            <tbody>
                             
                                {
                                                                  
                                    this.state.loanPgms.map(function(object,i){
                                       return <tr className="tBody">                
                                            <td>{object.LoanType}</td>
                                            <td>{object.Interest}</td>
                                            
                
                                        </tr>
                                    })
                                }  
                                            
                            </tbody>
                        </table>
              </div>
              <div className="col-md-6">
              <h5 style={{fontWeight:300,textAlign:"center"}}>--Our News--</h5>
                <div className="card cb " style={{fontSize:13,height:100,marginTop:15}}>
                    <div className="card-title ct" style={{fontWeight:400,fontSize:15,marginLeft:15,marginTop:10,marginBottom:0}}>
                      <img src="https://img.icons8.com/carbon-copy/2x/new.png" style={{height:20,width:20}}/>Home loan
                    </div>
                    <div className="card-body" style={{height:30}}>
                      We have added home loan to our loan programs & we are providing it at very low rate.
                    </div>
                </div>
                <div className="card cb" style={{fontSize:13,height:100}}>
                    <div className="card-title ct" style={{fontWeight:400,fontSize:15,marginLeft:15,marginTop:10,marginBottom:0}}>
                     Loan
                    </div>
                    <div className="card-body">
                    KYC Documents like PAN, Aadhaar should be submitted
                    </div>
                </div>
                <div className="card cb" style={{fontSize:13,height:100}}>
                    <div className="card-title ct" style={{fontWeight:400,fontSize:15,marginLeft:15,marginTop:10,marginBottom:0}}>
                      Gold loan
                    </div>
                    <div className="card-body">
                    Gold Loan can be availed by anyone who is facing a financial crisis.The application process is easy
                    </div>
                </div>
              </div>

            </div>
            <hr></hr>
            <h5 style={{fontWeight:300,textAlign:"center"}}>--Our Services--</h5>
        <div id="what-we-do" style={{height:300}}>
            <div class="row mt-5">
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
					<div class="card">
						<div class="card-block block-1">
							<h3 class="card-title" style={{textAlign:'center'}}>Monitoring</h3>
							<p class="card-text" style={{fontSize:16}}>Keep track of any changes in your credit report and get alerted</p>
							
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
					<div class="card">
						<div class="card-block block-2">
							<h3 class="card-title" style={{textAlign:'center'}}>Insights</h3>
							<p class="card-text" style={{fontSize:16}}>Get to know about factors that impact your credit score</p>
						
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
					<div class="card">
						<div class="card-block block-3">
							<h3 class="card-title" style={{textAlign:'center'}}>Better Decisions</h3>
							<p class="card-text" style={{fontSize:16}}>Personalised loans and credits card offers based on your profile</p>
							
						</div>
					</div>
				</div>
			</div>
      </div>



            </div>
.
            </div>
            <Footer/>
            </>
        )
    }
}
