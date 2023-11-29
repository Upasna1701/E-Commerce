import AdminNavbar from "./adminnavbar";
import React, { Component, useState } from 'react';
import axios from "axios";
import Categorytable from "./Datatables/cattable";
import Subcattable from "./Datatables/subcattable";
import Swal from 'sweetalert2';


export default class Subproduct extends Component {
  constructor(props){
    super(props);

    this.state = {
      category:[],
      showinputField:[],
      formValues:[{ choosecategory: "", product_name : ""}],
      choosecategory : [],
      product_name : [],
      formdatadata : [],
      prodsubname:[],
      modalsubcategory:"",
      modalproduct:"",
      modalsub:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchcatdata();
    this.fetchsubcatdata();
  }


  fetchcatdata=()=>{
    const data = {
    }       
    axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',data)
    .then(res => {
        console.log(res.category);
        this.setState({category:res.data.findcat});
    })
  }
  fetchsubcatdata=()=>{
    const productdata = {
    }       
    axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',productdata)
    .then(res => {
        console.log(res.data);
        this.setState({ prodsubname:res.data.findsubcategory });
    })
  }

  handleChange = (i,e) => {
    console.log(e);
    let newFormValues = [...this.state.formValues];
      newFormValues[i][e.target.name] = e.target.value;
      this.setFormValues(newFormValues);
  }

  handleSubmit=(event)=>{
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
        formdatadata : this.state.formdatadata,
        addprsubcategory : 'yes',
        imagefile:this.state.imagefile
       }
        console.log(data);
        axios .post('http://localhost/E-Commerce/brothers/Admin/product.php',data)
        .then(res => {
          console.log(res.data.savesub);
          this.fetchsubcatdata();
        })
      }
  })
  }
  
  setFormValues(newFormValues)
  {
    this.setState({ formdatadata:newFormValues });
      console.log(newFormValues);
      console.log(this.state.formdatadata);
  }

  addfield = () => {
    var joined = this.state.formValues.concat({ choosecategory: "", product_name : ""});
    this.setState({ formValues: joined });
  }

  removefield = (i) => {
    console.log(i);
    var remove = [...this.state.formValues];
    remove.splice(i, 1);
    this.setState({formValues:remove}); 
  }

  handleproChange = (event) => {
    const target = event.target;
    const value = target.value;
    const namess =  target.name;
    this.setState({
        [namess]: value
    });
    console.log(event.target.value)
  }

  handlecatSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
        title:"Are You Sure You Want To Submit!",
        icon:"success",
        showConfirmButton:true,
        cancelButtonText: "Cancel!",
        showCancelButton:true,
      }).then((result) => {
        if (result['isConfirmed']){
          const catdata = {
            addsubcategory : 'yes',
            catname:this.state.cat_name,
          }
          console.log(catdata)
          axios .post('http://localhost/E-Commerce/brothers/Admin/product.php',catdata)
          .then(res => {
            console.log(res.data);
            this.fetchcatdata();
          })
        }
    })
  }
    

    

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="rightside">
          <div className="container admincontainer">
            <div className="row">
              <h2>SUB PRODUCTS</h2>
            </div>  
            
            <div className="row">
              <div className="card cat-card col-md-6" >
                <h5>Add Category</h5>
                <form onSubmit={this.handlecatSubmit}>
                    <div>
                        <label  className="fieldtitle">Category</label> 
                        <input type="text" className="form-control" required name="cat_name" placeholder="Enter Category" onChange={this.handleproChange}></input>
                    </div>
                    <button type="submit" value='submit' className="addbtn">SUBMIT</button>
                </form>
              </div>
              <div className="card cat-card col-md-6">
                <h5>Add Sub-Products</h5>
                <form onSubmit={this.handleSubmit}>

                {this.state.formValues.map((element, index) => (
                    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}  key={index}>
                        <div style={{display:"flex",alignItems:"center"}}>
                          <div style={{display:"flex",alignItems:"center"}}>
                            <div style={{width:"50%"}}>
                                <label className="fieldtitle">Choose Category:</label>
                                <select name="choosecategory" required id="category" className="form-control" onChange={e => this.handleChange(index, e)} value={element.choosecategory || ""}>
                                <option value="" hidden>Select Category</option>
                                    {
                                    this.state.category.map((item,index)=>{
                                        return(
                                        <option key={index} value={item.id}>{item.category}</option>
                                        )
                                    })
                                    }                
                                </select> 
                            </div>
                            <div style={{width:"50%",marginLeft:"20px"}}>
                                <label className="fieldtitle">Sub Category:</label> 
                                <input type="text" className="form-control" required name="product_name" placeholder="Enter Sub Category" onChange={e => this.handleChange(index, e)} value={element.product_name || ""}></input>
                            </div>
                          </div>
                            <div onClick={this.addfield} style={{height:"10px"}}>
                                <span className="btn btn-primary">+</span>
                            </div>
                            <div onClick={() => this.removefield(index)} style={{height:"10px"}}>
                                <span className="btn btn-primary">-</span>
                            </div>
                        </div>
                    </div>
                    
                    ))}
                    <button type="submit" value='submit' className="addbtn">SUBMIT</button>
                </form>
              </div>          
            </div>
            {/* category table */}
            <div className="row" style={{marginTop:"35px"}}>
                <Categorytable/>
            </div>
            {/* subcategory table */}
            <div className="row" style={{marginTop:"35px"}}>
                <Subcattable/>
            </div>
          </div>
        </div>
      </div>     
    )
  }
}
