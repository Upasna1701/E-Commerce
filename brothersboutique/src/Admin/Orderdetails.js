import React, { Component } from 'react';
import AdminNavbar from "./adminnavbar";
import axios from "axios";
import { FaEdit} from "react-icons/fa";
import { GoInfo} from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import Ordertable from './Datatables/orderdetailstable';

export default class Orderdetails extends Component {
  constructor(props){
    super(props);
    this.state={
    } 
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="rightside">
            <div className="container admincontainer">
                <div className="row">
                    <h2>Order Details</h2>
                </div> 
                <div className="row" style={{marginTop:"35px"}}>
                <div className="card cat-card col-md-12">
                  <Ordertable/>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
