import React, { Component } from 'react'
import regimg from '../../images/reg.png';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name:'',
            mobile:'',
            email: '',
            password: '',
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
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email,
            password : this.state.password
        }
        axios .post('http://localhost/E-Commerce/brothers/registration.php',data)
        .then(res => {            
         alert("success!");   
        console.log(res.data);
        })

    }
  render() {
    return (
      <div className='registrationbody'>
        <div className='container-fluid' style={{backgroundImage:"linear-gradient(0deg,#fff4c4,#fff)"}}>
          <div className='row' style={{height:"92vh"}}>
            <div className='col-md-6 imgbody'>
            <img className="reimg" src={regimg}/>
            </div>
            <div className='col-md-6 reginput'>
                <div className='card'>
                <h4> Sign up</h4>
                <h6>Hi new buddy, let's get you started with the bewakoofi!</h6>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className='regtexts' placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <input type="tel" className='regtexts' id="phone" name="phone"  placeholder="Mobile" value={this.state.mobile} onChange={this.handleChange}/>
                    <input type="email" className='regtexts' placeholder='Email Id' name='email' value={this.state.email} onChange={this.handleChange}/>
                    <input type="password" className='regtexts' placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <div className='rememberme'>
                        <input type="checkbox" className='larger'/> 
                        <p>I want to receive order updates on Whatsapp</p>
                    </div>
                                       
                    <button type='submit' value='Submit' class="btn">proceed</button>
                </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
