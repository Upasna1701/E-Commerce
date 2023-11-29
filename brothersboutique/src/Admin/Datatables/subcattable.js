import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { FaEdit} from "react-icons/fa";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";

export default class Subcattable extends Component {
    constructor(props){
        super(props);
        this.state={
            formValues:[{ choosecategory: "", product_name : ""}],
            prodsubname:[],
            results:[],
            columns : [
                {
                  name:"Id",
                  selector:(row)=>row.subcategory_id
                },
                {
                  name:"Category Name",
                  selector:(row)=>row.category
                },
                {
                  name:"Subcategory",
                  selector:(row)=>row.product_name
                },
                {
                  name:"Edit",
                  cell:(row)=><FaEdit onClick={()=>this.openModal(row)}/>
                },
                {
                  name:"Delete",
                  cell:(row)=><MdDeleteOutline onClick={()=>this.deletecatproduct(row.subcategory_id)}/>
                },
            ],
            search:[],
            category:[]
        }

        const productdata = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',productdata)
        .then(res => {
            console.log(res.data);
            this.setState({prodsubname:res.data.findsubcategory });
            this.setState({results:res.data.findsubcategory});
            this.setState({category:res.data.findcat});

        })
        this.setSearchss();
    }

    setSearchss = (ccc) => {
        if(ccc == "" || ccc == undefined || ccc == null ){
            console.log(ccc)
            this.setState({search:ccc})
            this.setState({results:this.state.prodsubname})
        }
        else {
          var result=this.state.prodsubname.filter((subcatarr)=>{
            this.setState({search:ccc})
            return subcatarr.product_name.toLowerCase().match(this.state.search.toLowerCase());
          });
          this.setState({results:result})
        }
    }

    deletecatproduct=(sub)=>{  
        Swal.fire({
          title:"Are You Sure You Want To Delete!",
          icon:"success",
          showConfirmButton:true,
          cancelButtonText: "Cancel!",
          showCancelButton:true,
        }).then((result) => {
          if (result['isConfirmed']){
            const deleteproduct={
                deletesubpr:"yes",
                subproductid:sub
            } 
            console.log(deleteproduct);
            axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',deleteproduct)
            .then(res => {
                console.log(res.data);
            })
          }
        })
      }


      openModal = (item) => {
        console.log(item);
        this.setState({modalsubcategory:item.product_for_id})
        this.setState({modalproduct:item.product_name})
        this.setState({modalsub:item.subcategory_id})
        this.setState({ isOpen: true });
        console.log(this.state.modalsubcategory)
      }
    
      closeModal = () => {this.setState({ isOpen: false })};
    
      handlemodalChangecat=(event)=>{
        console.log(event.target.value);
        this.setState({modalsubcategory:event.target.value})
      }
    
      handlemodalChange= (event) => {
        console.log(event.target.value);
        this.setState({modalproduct:event.target.value})
      }
    
      handlemodalSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title:"Are You Sure You Want To Submit!",
            icon:"success",
            showConfirmButton:true,
            cancelButtonText: "Cancel!",
            showCancelButton:true,
          }).then((result) => {
            if (result['isConfirmed']){
                const data = {
                    updatesubcategory : 'yes',
                    subproductid:this.state.modalsub,
                    modalproductsub:this.state.modalsubcategory,
                    modalproductname:this.state.modalproduct,
                }
                console.log(data);
                axios .post('http://localhost/E-Commerce/brothers/Admin/product.php',data)
                .then(res => {
                  console.log(res.data);
                })
                this.setState({ isOpen: false })
            }
          })
      }


  render() {
    return (
      <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Subcategory Details"
        pagination
        fixedHeader
        fixedHeaderScrollHeight='436px'
        highlightOnHover
        subHeader
        subHeaderComponent={
            <input 
            type="text"
            placeholder='search here'
            className='w-25 form-control'
            value={this.state.search}
            onChange={(e)=>this.setSearchss(e.target.value)}
            />
        }/>


        <Modal
            size="lg"
            show={this.state.isOpen} 
            onHide={this.closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div className='heading'>
                <h4 className='address-heading'>Edit Sub-Product details</h4>
                <GrClose onClick={this.closeModal}/>
                </div>
                <form onSubmit={this.handlemodalSubmit} style={{padding:"0 35px 60px 35px"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"50%"}}>
                            <label for="category" className="fieldtitle">Choose Category:</label>
                            <select name="choosecategory" required id="category" className="form-control" onChange={this.handlemodalChangecat} value={this.state.modalsubcategory}>
                            <option value="" hidden>Select Category</option>
                              {
                              this.state.category.map((item,index)=>{
                                  return(
                                  <option value={item.id}>{item.category}</option>
                                  )
                              })
                              }                
                            </select> 
                        </div>
                        <div style={{width:"50%",marginLeft:"20px"}}>
                            <label for="category" className="fieldtitle">Sub Category:</label> 
                            <input type="text" className="form-control" required name="product_name" placeholder="Enter Sub Category" onChange={this.handlemodalChange} value={this.state.modalproduct}></input>
                        </div>
                    </div>
                    <button type="submit" value='submit' className="addbtn" style={{marginTop:"10px"}}>SUBMIT</button>
                </form>
        </Modal>
      </div>
    )
  }
}
