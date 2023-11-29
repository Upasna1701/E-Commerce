import AdminNavbar from "./adminnavbar";
import React, { Component } from 'react';
import axios from 'axios';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };

    const data={

    }
    axios .post('http://localhost/E-Commerce/brothers/Admin/dashboard.php',data)
    .then(res => {
        console.log(res.data)
        this.setState({productcount:res.data.getproductcount})
        this.setState({usercount:res.data.getusercount})
        this.setState({ordercount:res.data.getordercount})
    })
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="rightside">
          <div className="container admincontainer">
            <div className="row">
              <h2>DASHBOARD</h2>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="card dashcard">
                  <p>Total Products</p>
                  <h6>{this.state.productcount}</h6>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card dashcard">
                  <p>Total Orders</p>
                  <h6>{this.state.ordercount}</h6>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card dashcard">
                  <p>Total Users</p>
                  <h6>{this.state.usercount}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>     
    )
  }
}
