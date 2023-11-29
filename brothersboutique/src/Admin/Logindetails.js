import React, { Component } from 'react';
import AdminNavbar from "./adminnavbar";
import { FaEdit} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { styled } from '@mui/material/styles';
import {Table} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Logintable from './Datatables/logintable';

export default class Logindetails extends Component {
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
                    <h2>LOGIN</h2>
                </div> 
                <div className="row" style={{marginTop:"35px"}}>
                    <h5>User Details</h5>
                    <Logintable/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

