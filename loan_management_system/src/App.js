import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './User/UserLogin';
import UserRegistration from './User/UserRegistration';
import Home from './Home';
import UserHomePage from './User/UserHomePage';
import ManagerHomePage from './Manager/ManagerHomePage';
import AdminHomePage from './Admin/AdminHomePage';
import {FaUserCircle} from 'react-icons/fa';
import {IoExitOutline} from 'react-icons/io5'
import EditUser from './User/EditUser';
import EditManager from './Manager/EditManager';
import { ro } from 'date-fns/locale';
import CheckRequests from './Manager/CheckRequests';
import AddLP from './Admin/AddLP';
import EditLP from './Admin/EditLP';
import PayLoan from './User/PayLoan';
import payHistory from './User/payHistory';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
function App() {

  return (
    <Router>
                <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{position:"sticky"}}>
        <div className="container">
          
          <Link class="navbar-brand" id="home" to={"/"} style={{display:"none"}}><img src="https://media-exp1.licdn.com/dms/image/C561BAQG9uHq67_SE1Q/company-background_10000/0/1544226479507?e=2159024400&v=beta&t=q55LNge40uAYFOTYSVnOcX7VMbOB4sv3kf014UjuQ9I" className="Llogo"/></Link>
          <img className="navbar-brand" id="home2" style={{display:"none"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0F2jD-FcrVRvWAwqRI-Je1onE9-sgybM-oA&usqp=CAU" className="Llogo"/>
          
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            
            <li className="nav-item dList" id="userIcon">
            <IoExitOutline className="IoExit" />
               <Link className="nav-link ditem" to={"/"} >Logout</Link>
            </li>

             <li className="nav-item">
                <Link className=" nlink nav-link " id="about" to={"/About"} style={{display:"none",width:120}}>About Us</Link>
            </li>
            <li className="nav-item">
                <Link className="nlink nav-link " id="contact" to={"/Contact"} style={{display:"none",width:120}}>Contact Us</Link>
            </li>              
            
              <li className="nav-item">
                <Link className=" nlink nav-link " id="login" to={"/UserLogin"} style={{display:"none",width:120}}>Login</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
            </div>
    

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/UserRegistration" component={UserRegistration} />
            <Route path="/UserLogin" component={Login} />
            <Route path="/UserHomePage" component={UserHomePage} />
            <Route path="/ManagerHomePage" component={ManagerHomePage} />
            <Route path="/AdminHomePage" component={AdminHomePage} />
            <Route path="/EditUser" component={EditUser} />
            <Route path="/EditManager" component={EditManager} />
            <Route path="/CheckRequests" component={CheckRequests} />
            <Route path="/AddLP" component={AddLP} />
            <Route path="/EditLP" component={EditLP} />
            <Route path="/PayLoan" component={PayLoan} />
            <Route path="/payHistory" component={payHistory} />
            <Route path="/About" component={About} />
            <Route path="/Contact" component={Contact} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
