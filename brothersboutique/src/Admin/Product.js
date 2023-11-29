import AdminNavbar from "./adminnavbar";
import React, { Component, useState } from 'react'
import axios from "axios";
import Select from 'react-select';
import Producttable from "./Datatables/producttable";
import Swal from "sweetalert2";

export default class Product extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalarr:[],
      prodname:[],
      procategory:[],
      subcategory:[],
      choosesubcategory : [],
      prochoosecategory:"",
      sizearr:[],
      sizeOptions : [
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },   
      ],
      num1:0,
      num2:0,
      modalproductname:"",
      modalprice:"",
      modaldiscount:"",
      modaloffer:"",
      modalcategory:"",
      modalsubcategory:[],
      modalofferdate:"",
      modalsize:[],
      Sizequantity:[],
      totalquantity:0,
      abcar:[],
      offerdate:"",
      sizearraydata:[],
      modalsizearr:[],
      sizearray:[],
      modalimage:[], 
    };
    
    this.handleproChange = this.handleproChange.bind(this);
    this.handleproSubmit = this.handleproSubmit.bind(this);

    const data = {
    }       
    axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',data)
    .then(res => {
        this.setState({procategory:res.data.findcat});
    }) 

    this.fetchdata();
    
  }

  fetchdata()
  {
    const productdata = {
    }       
    axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',productdata)
    .then(res => {
        console.log(res.data);
        this.setState({prodname:res.data.productname});
        console.log(this.state.prodname.productdetails);
    })
  }

  prohandlechange=(e)=>{
    this.setState({prochoosecategory: e.target.value});
      const subdata= {
          categoryid:e.target.value,
          findprosubcat:"yes"
      }
      axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',subdata)
      .then(res => {
          this.setState({subcategory:res.data.findsubcat});
      })
    }

    handleproChange = (event) => {
        const target = event.target;
        const value = target.value;
        const namess =  target.name;
        this.setState({
            [namess]: value
        });
    }

    handlenewquantity=(event,item)=>{
      console.log(this.state.Sizequantity);
      let abc=event.target.value;
      var qqq = 0;
      let sqi = item + ':' + event.target.value;
      let sqiarr = this.state.Sizequantity;
      //beacuse data was repeating
      for(var i=0;i<=sqiarr.length;i++){
        var aa = String(sqiarr[i]);
        if(parseInt(aa.split(":")[1]) != NaN){qqq = qqq + parseInt(aa.split(":")[1]);}
        if(aa.split(":")[0] == item){
          sqiarr.splice(i, 1);
        } else {
        }
      }
      sqiarr.push(sqi);
      this.setState({Sizequantity:sqiarr})

      this.setState({totalquantity: parseInt(qqq)})
      console.log(this.state.Sizequantity);
    }

    imageupload=(event)=>{
      this.setState({
        imagefile:event.target.files
      })
      console.log(event.target.files);
    }

    handleselectsize=(event)=>{
        console.log(event);
        let sa = [];
        for(var i=0;i<event.length;i++)
        {
          let jj = event[i];
          sa.push(jj.value);
        }
        this.setState({
          sizearr:sa
        });
        console.log(this.state.sizearr);
    }
    handleproSubmit = (event) => {
      event.preventDefault();
      Swal.fire({
        title:"Are You Sure You Want To Submit!",
        icon:"success",
        showConfirmButton:true,
        cancelButtonText: "Cancel!",
        showCancelButton:true,
      }).then((result) => {
        if (result['isConfirmed']){
          const subdata = {
          Category: this.state.prochoosecategory, 
          Subcategory : this.state.choosesubcategory,
          Product_Name:this.state.pro_name,
          Product_desc:this.state.pro_desc,
          Quantity:this.state.totalquantity,      
          productadd : 'yes',
          User_id : localStorage.getItem('adminid'),
          Size : this.state.Sizequantity.join(','),
          Price:this.state.num1,
          Discount:this.state.num2,
          offerdate:this.state.offer_date,
          productimage:this.state.imagefile.name,
          imagefile:this.state.imagefile
        }     
        console.log(subdata);
        axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',subdata)
        .then(res => {
            this.uploadfile(this.state.imagefile,res.data.productid);
          })
        }
      })
    }

    uploadfile(imagefile,proidimg){
      const formData = new FormData();
      for(var i=0;i<imagefile.length;i++)
      {
        formData.append('imagefile',imagefile[i]);
        formData.append('productid',proidimg);
        formData.append('uploadimagefile',"yes");
        axios.post("http://localhost/E-Commerce/brothers/Admin/product.php", formData,{
          headers: {
              'content-type': 'multipart/form-data'
          }
        });
      }
    }

    updateNum1(data) {
      this.setState({
        num1: data.target.value,
        result: parseInt(data.target.value) - (parseInt(data.target.value) * parseInt((this.state.num2)/100)),     
      });
    }

    updateNum2(data) {
      this.setState({
        num2: data.target.value,
        result: parseInt(this.state.num1) - (parseInt(this.state.num1) * (parseInt(data.target.value)/100)),
      });
    }

  render() {
    return (
      <div>
        <AdminNavbar />
        {/* <Newsidebar /> */}
        <div className="rightside">
          <div className="container admincontainer">
            <div className="row">
              <h2>PRODUCTS</h2>
            </div>  
 
            <div className="row">
              <div className="card cat-card col-md-6">
                <h5>Add Products</h5>
                <form onSubmit={this.handleproSubmit}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"50%"}}>
                            <label  className="fieldtitle">Choose Category:</label>
                            <select name="choosecategory" id="category" required className="form-control" onChange={e => this.prohandlechange(e)} value={this.state.prochoosecategory || ""}>
                            <option value="" hidden>Select Category</option>
                                {
                                this.state.procategory.map((item,index)=>{
                                    return(
                                    <option value={item.id} key={index} >{item.category}</option>
                                    )
                                })
                                }                
                            </select> 
                        </div>
                        <div style={{width:"50%",marginLeft:"20px"}}>
                            <label  className="fieldtitle">Choose Sub-Category:</label>
                            <select name="choosesubcategory" required id="subcategory" className="form-control" onChange={this.handleproChange}>
                            <option value="" hidden>Select Sub-Category</option>
                                {
                                this.state.subcategory.map((item,index)=>{
                                    return(
                                    <option value={item.subcategory_id} key={index}>{item.product_name}</option>
                                    )
                                })
                                }                
                            </select> 
                        </div>
                    </div>
                    <div>
                        <label  className="fieldtitle">Product Name</label> 
                        <input type="text" className="form-control" required name="pro_name" placeholder="Enter Product Name" onChange={this.handleproChange}></input>
                    </div>
                    <div>
                        <label  className="fieldtitle">Product Description</label> 
                        <textarea style={{resize:"none"}} className="form-control" rows="4" name="pro_desc" required placeholder="Product Description" onChange={this.handleproChange}></textarea>
                    </div>
                    <div>
                        <label className="fieldtitle">Product Image</label> 
                        <input type="file" required name="imagefile" className="form-control"  onChange={this.imageupload} multiple></input>
                    </div>
                    <div>
                        <label  className="fieldtitle">Select size</label> 
                        <Select className="form-control" name="sizearr" required placeholder="Select Size" onChange={this.handleselectsize}
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.sizeOptions}
                        />
                    </div>

                    <div style={{marginTop:"12px"}}>
                      {
                        this.state.sizearr.map((item,index)=>{
                          return(
                            <div className="sizediv" key={index}>
                              <label className="fieldtitle">{item} </label>
                              <input type="number" className="form-control" required name="quantity" placeholder="Enter Product Quantity" onBlur={e => this.handlenewquantity(e,item)}></input>
                            </div>
                          );
                        })
                      }
                    </div>
                    
                    <div style={{display:"flex",alignItems:"center"}}>
                      <div style={{width:"33.33%"}}>
                          <label className="fieldtitle">Product Price</label> 
                          <input type="number" className="form-control" required name="product_price" placeholder="Product Price" onChange={this.updateNum1.bind(this)} value={this.num1}></input>
                      </div>
                      <div style={{width:"33.33%",marginLeft:"20px"}}>
                          <label className="fieldtitle">Discount (In %)</label> 
                          <input type="number" className="form-control" required name="discount_percent" placeholder="Discount Percentage" onChange={this.updateNum2.bind(this)} value={this.num2}></input>
                      </div>
                      <div style={{width:"33.33%",marginLeft:"20px"}}>
                          <label className="fieldtitle">Offer Price:</label><br/>
                          <label className="form-control">{this.state.result}</label>
                      </div>
                    </div>  
                    <div>
                        <label className="fieldtitle">Offer Date</label> 
                        <input type="date" className="form-control" required name="offer_date" placeholder="Enter Offer Date" onChange={this.handleproChange}></input>
                    </div>              
                    <button type="submit" value='submit' className="addbtn">SUBMIT</button>
                </form>
              </div>

              
            </div>

            <div className="row" style={{marginTop:"35px"}}>
              <Producttable/>
            </div>
          </div>
        </div>
      </div> 
    )
  }
}
