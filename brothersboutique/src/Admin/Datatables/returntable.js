import React, { Component } from 'react'
import axios from "axios";
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';


export default class Returntable extends Component {

    constructor(props){
        super(props);
        this.state={
            returndetails:[],
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
                  name:"Product Size",
                  selector:(row)=>row.product_size
                },
                {
                    name:"Product quantity",
                    selector:(row)=>row.product_quantity
                },
                {
                    name:"Product status",
                    cell:(row)=>
                    <select value={row.return_status} class="form-control" id="sel1" onChange={(e)=>this.setstatusvalue(e,row.confirm_id,row.product_id,row.product_size,row.product_quantity)}>
                        <option value="P">Pending</option>
                        <option value="Y">Approved</option>
                        <option value="N">Declined</option>
                    </select>
                },
            ],
        }
        this.fetchreturn();
        this.setstatusvalue = this.setstatusvalue.bind(this);
    }

    fetchreturn=()=>{
        const returndata = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/Admin/returnexchange.php',returndata)
        .then(res => {
            console.log(res.data.getreturndetails);
            this.setState({returndetails:res.data.getreturndetails });
            this.setState({results:res.data.getreturndetails});
        })
    }

    setstatusvalue(event,gg,pid,psize,pquan) {
        this.setState({returnstatus:event.target.value})
        const rrdata={
            rdata:event.target.value,
            cid:gg,
            pid:pid,
            psize:psize,
            pquan:pquan,
            adminreturnstatus:"yes"
        }
        console.log(rrdata)
        axios.post('http://localhost/E-Commerce/brothers/Admin/returnexchange.php',rrdata)
        .then(res => {
            Swal.fire({
                title:"Status Updated",
                timer:1500,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
            }).then(()=>{
                this.fetchreturn();
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
        title="Product Return Details"
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
