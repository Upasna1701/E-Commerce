import React, { Component } from 'react'
import axios from "axios";
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';

export default class Exchangetable extends Component {

    constructor(props){
        super(props);
        this.state={
            exchangedetails:[],
            results:[],
            columns : [
                {
                  name:"Id",
                  selector:(row)=>row.return_id
                },
                {
                    name:"User Id",
                    selector:(row)=>row.user_id
                },
                {
                    name:"Order Number",
                    selector:(row)=>row.order_number
                },
                {
                  name:"Product Name",
                  selector:(row)=>row.pro_name
                },
                {
                    name:"Old Size",
                    selector:(row)=>row.oldproductsize
                },
                {
                  name:"New Size",
                  selector:(row)=>row.newproductsize_id
                },
                {
                    name:"Product quantity",
                    selector:(row)=>row.product_quantity
                },
                {
                    name:"Product status",
                    cell:(row)=>
                    <select value={row.exchange_status} class="form-control" id="sel1" onChange={(e)=>this.setexstatus(e,row.confirm_id,row.product_id,row.newproductsize_id,row.product_quantity,row.oldproductsize)}>
                        <option value="P">Pending</option>
                        <option value="Y">Approved</option>
                        <option value="N">Declined</option>
                    </select>
                },
            ],
        }
        this.fetchexchange();
        this.setexstatus = this.setexstatus.bind(this);
    }

    fetchexchange=()=>{
        const exchangedata = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/Admin/returnexchange.php',exchangedata)
        .then(res => {
            console.log(res.data.getexchangedetails);
            this.setState({exchangedetails:res.data.getexchangedetails });
            this.setState({results:res.data.getexchangedetails});
        })
    }

    setexstatus(event,gg,pid,psize,pquan,os) {
        const exdata={
            rdata:event.target.value,
            cid:gg,
            pid:pid,
            psize:psize,
            pquan:pquan,
            oldsize:os,
            adminexchangestatus:"yes"
        }
        console.log(exdata)
        axios.post('http://localhost/E-Commerce/brothers/Admin/returnexchange.php',exdata)
        .then(res => {
            Swal.fire({
                title:"Status Updated",
                timer:1500,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
            }).then(()=>{
                this.fetchexchange();
            })
        })
    }

  render() {
    return (
        <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Product Exchange Details"
        pagination
        fixedHeader
        fixedHeaderScrollHeight='436px'
        highlightOnHover
        subHeader
        />
      </div> 
    )
  }
}
