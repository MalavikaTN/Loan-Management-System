import React, { Component } from 'react'
import './User.css';
export default class LoanCard extends Component {
    render() {
        return (<>
            
                <div className="col-md-10 offset-md-1">
                        <div className="card text-center bg-light" style={{marginBottom:30,height:200}}>
                            <div className="card-header" className="cHead">
                               <p style={{fontSize:18}} className="cHead"> {this.props.obj.LoanType}</p>
                            </div>
                            <div className="card-body">
                                {this.props.obj.Description}
                            </div>
                             
                             <div class="card-footer text-muted" style={{height:30,padding:0,paddingTop:2}}>
                             Interest : {this.props.obj.Interest} %
                            </div>
                        </div>
                        
                        </div>  
               
            </>
        )
    }
}
