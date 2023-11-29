import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios';
import { FaAngleDown,FaRegHeart,FaHeart } from "react-icons/fa";
import {ImUserCheck,ImLock} from "react-icons/im"

export default class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("admintoken")
        let adminloggedIn = true
        if(token == null)
        {
          adminloggedIn = false
        }
        this.state = {
            data: [],
            email: '',
            password: '',
            adminloggedIn
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
        axios .post('http://localhost/E-Commerce/brothers/adminlogin.php',data)
        .then(res => {
            if(res.data.status == "success")
            {
                localStorage.setItem("admintoken", "adminloggedIn");
                localStorage.setItem("adminid",res.data.adminid);
                alert("success!");
                window.location.href = "/Admin/Dashboard";
            }
            else
            {
                alert("Invalid email or password");
            }
        })
    
    }
    render() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                      <ImUserCheck/>
                      </CInputGroupText>
                      <CFormInput placeholder="Email" name='email' value={this.state.email} onChange={this.handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                      <ImLock/>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name='password' value={this.state.password} onChange={this.handleChange}
                    />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' value='Submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

}
