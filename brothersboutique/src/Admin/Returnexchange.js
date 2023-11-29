import React, { Component } from 'react';
import AdminNavbar from "./adminnavbar";
import Returntable from "./Datatables/returntable";
import Exchangetable from "./Datatables/exchangetable";


export default class Returnexchange extends Component {
    constructor(props){
        super(props);

        this.state = {
        };       
    }

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="rightside">
            <div className="container admincontainer">
                <div className="row">
                    <h2>Return And Exchange</h2>
                </div> 
                <div className="row" style={{marginTop:"35px"}}>
                    <h5>Return Details</h5>
                    <Returntable/>
                    <h5 className='mt-5'>Exchange Details</h5>
                    <Exchangetable/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
