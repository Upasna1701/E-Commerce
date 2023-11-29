import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { GoInfo} from "react-icons/go";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';



export default class Ordertable extends Component {
    constructor(props){
        super(props);
        this.state={
            findorderdata:[],
            results:[],
            viewdet:[],
            columns : [
                {
                  name:"Order Number",
                  selector:(row)=>row.order_number
                },
                {
                    name:"User Name",
                    selector:(row)=>row.fullname
                },
                {
                    name:"Product Name",
                    selector:(row)=>row.pro_name
                },
                {
                    name:"Order Date",
                    selector:(row)=>row.ddmmyyyy
                },
                {
                    name:"View",
                    cell:(row)=><GoInfo onClick={()=>this.viewalldetails(row)}/>
                },
            ],
            search:[]
        }

        const data={
            getuserorderdetails:"yes",
          }
          axios.post('http://localhost/E-Commerce/brothers/Admin/adminorderdetails.php',data)
          .then(res => {
              console.log(res.data)
              this.setState({findorderdata:res.data.findorderdata});
              this.setState({results:res.data.findorderdata});
          })
        this.setSearch();
    }

    setSearch = (ccc) => {
        if(ccc == "" || ccc == undefined || ccc == null ){
            console.log(ccc)
            this.setState({search:ccc})
            this.setState({results:this.state.findorderdata})
        }
        else {
        var result=this.state.findorderdata.filter((subcatarr)=>{
                this.setState({search:ccc})
                return subcatarr.order_number.toLowerCase().match(this.state.search.toLowerCase());
            });
            this.setState({results:result})
        }
    }

    viewalldetails=(itt)=>{
        this.setState({ Openview: true });
        this.setState({ viewdet: itt });
    }

    closeModal = () => {this.setState({ Openview: false })};


  render() {
    return (
      <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Order Details"
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        highlightOnHover
        subHeader
        subHeaderComponent={
            <input 
            type="text"
            placeholder='search here'
            className='w-25 form-control'
            value={this.state.search}
            onChange={(e)=>this.setSearch(e.target.value)}
            />
        }/>


        <Modal
            size="lg"
            show={this.state.Openview} 
            onHide={this.closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div className='heading'>
                  <h4 className='address-heading'>View details</h4>
                  <GrClose onClick={this.closeModal}/>
                </div>

                <div className='container'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <p>Order Number</p>
                      <p>Username</p>
                      <p>Mobile Number</p>
                      <p>Product Name</p>
                      <p>Product Quantity</p>
                      <p>Product Price</p>
                      <p>Order Date</p>
                      <p>Product Status</p>
                    </div>
                    <div className='col-md-6 text-left'>
                      <p>{this.state.viewdet.order_number}</p>
                      <p>{this.state.viewdet.mob_number}</p>
                      <p>{this.state.viewdet.fullname}</p>
                      <p>{this.state.viewdet.pro_name}</p>
                      <p>{this.state.viewdet.ddmmyyyy}</p>
                      <p>{this.state.viewdet.product_quantity}</p>
                      <p>{this.state.viewdet.product_price}</p>
                      <p>{this.state.viewdet.product_status}</p>
                    </div>
                  </div>
                </div>
        </Modal>

      </div>

      
    )
  }
}
