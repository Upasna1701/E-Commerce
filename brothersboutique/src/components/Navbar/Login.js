import React, { Component } from 'react'
import loginimg from '../../images/login.jpg';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook,FaRegEnvelope } from "react-icons/fa";
import axios from 'axios';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Container} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link, NavLink} from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    const token = localStorage.getItem("token")
    let loggedIn = true
    if(token == null)
    {
        loggedIn = false
    }
    this.state = {
        data: [],
        email: '',
        password: '',
        loggedIn
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    const target = event.target;
    const value = target.value;
    const namess =  target.name;
    this.setState({
        [namess]: value
    });
    console.log(event.target.value);
}
handleSubmit(event) {
    event.preventDefault();
    const data = {
        email : this.state.email,
        password : this.state.password
    }
    axios .post('http://localhost/E-Commerce/brothers/login.php',data)
    .then(res => {
        if(res.data.status == "success")
        {
          localStorage.setItem("token", "loggedIn");
          localStorage.setItem("userid", res.data.userid);
          localStorage.setItem("useremail", res.data.useremail);
          // alert("success!");
          Swal.fire({
                title:"Logged In",
                timer:1000,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
              }).then(()=>{
              window.location.href = "/";
          })
        }
        else
        {
            alert("Invalid email or password");
        }
    })

}
  render() {
    return (
      <div className='loginbody'>
        <div className='container-fluid' >
          <div className='row'>
            <div className='col-md-6 mobile-login'>
              <h1 className='loginheading'>Welcome to the world of Brothers Boutique!</h1>
              <img className="mainimg" src={loginimg}/>
            </div>
            <div className='col-md-6 loginput'>
            <Nav><Nav.Link as={Link} to="/Login" className='logsign'>Log in &nbsp;/</Nav.Link>
            <Nav.Link as={Link} to="/Registration" className='logsign'>Sign Up</Nav.Link></Nav>
              <h6>for Latest trends, exciting offers and everything Brothers Boutique!</h6>
              <form onSubmit={this.handleSubmit}>
               <input type="email" placeholder='Email Id' name='email' value={this.state.email} onChange={this.handleChange}/>
               <input type="password" placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange}/>
               <button type='submit' value='Submit' class="btn btn-info con-btn">Continue</button>
               </form>
               <div className='ordiv'>
               <hr className='orborder'/>
               <h5>OR</h5>
               <hr className='orborder'/>
               </div>
                
               <button type="button" class="btn emailbtn"><FaRegEnvelope className='gicon'/>Continue with email</button>
               <div className='social-btn'>
               <button type="button" class="btn gf-btn"><FcGoogle className='gicon'/>google</button>
               <button type="button" class="btn gf-btn" style={{marginLeft:"10px"}}><FaFacebook className='gicon'style={{color:"#4444df"}}/>facebook</button>
               </div>
               <p>By creating an account or logging in, you agree with Bewakoof's <span>Terms and <br/>Conditions</span> and <span>Privacy Policy</span>.</p>
               
            </div>
          </div>
        </div>
      </div>
    )
  }
}
