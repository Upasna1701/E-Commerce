import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { FaEdit} from "react-icons/fa";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import Select from 'react-select';


export default class Producttable extends Component {
    constructor(props){
        super(props);
        this.state={
            prodname:[],
            results:[],
            columns : [
                {
                  name:"Id",
                  selector:(row)=>row.pid
                },
                {
                  name:"Product Name",
                  selector:(row)=>row.Product_Name
                },
                {
                    name:"Sizes",
                    cell:(row)=>this.showsize(row)
                    // sizecolumn : [
                    //     {
                    //         selector:(row)=>row.sizearrdet.product_size
                    //     }
                    // ],
                },      
                {
                    name:"Price",
                    selector:(row)=>row.productdetails.Price
                },
                {
                    name:"Offer Price",
                    selector:(row)=>(row.productdetails.Price- (row.productdetails.Price * row.productdetails.Discount/ 100))
                },
                {
                    name:"Offer Date",
                    selector:(row)=>row.productdetails.offerdate
                },
                {
                    name:"Edit",
                    cell:(row)=><FaEdit onClick={()=>this.openModal(row,row.sizearrdet,row.productimage)}/>
                },
                {
                  name:"Delete",
                  cell:(row)=><MdDeleteOutline onClick={()=>this.deleteproduct(row.pid)}/>
                },
            ],
            search:[],
            category:[],
            procategory:[],
            subcategory:[],
            modalimage:[],
            defval:[],
            modalarr:[],
            choosesubcategory : [],
            prochoosecategory:"",
            sizearr:[],
            sizeOptions1 : [
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
            sqtymodelwala:[],
            modaldesc:[]
        }

        const productdata = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',productdata)
        .then(res => {
            console.log(res.data);
            this.setState({prodname:res.data.productname});
            this.setState({results:res.data.productname});
            this.setState({procategory:res.data.findcat});
            console.log(this.state.sizearrdet)
        })
        this.setSearch();
    }

    showsize = (r) =>{
        // console.log(r.sizearrdet);
        var sizeshowarr = [];
        sizeshowarr.push(
            <>
                <div>
                    {
                        r.sizearrdet.map((itm,index)=>{
                            return(
                                <p key={index}>{itm.product_size}-{itm.quantity}</p>
                            )
                        })
                    }
                </div>
            </>
            );
        return sizeshowarr;
    }

    setSearch = (ccc) => {
        if(ccc == "" || ccc == undefined || ccc == null ){
            console.log(ccc)
            this.setState({search:ccc})
            this.setState({results:this.state.prodname})
        }
        else {
        var result=this.state.prodname.filter((subcatarr)=>{
                this.setState({search:ccc})
                return subcatarr.Product_Name.toLowerCase().match(this.state.search.toLowerCase());
            });
            this.setState({results:result})
        }
    }

    deleteproduct=(pid)=>{  
        Swal.fire({
          title:"Are You Sure You Want To Delete!",
          icon:"success",
          showConfirmButton:true,
          cancelButtonText: "Cancel!",
          showCancelButton:true,
        }).then((result) => {
          if (result['isConfirmed']){
            const deleteproduct={
                deletepr:"yes",
                productid:pid
            } 
            console.log(deleteproduct)
            axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',deleteproduct)
            .then(res => {
            console.log(res.data.deleteproduct);
            })
          }
        })
      }
      openModal = (item,size,img) => {
        var aaaa = item;
        console.log(aaaa);
        console.log(size);
        var msa = [];
        var sizeshoekarnewala = [];
        var sqtymodelwalatemp = [];
        for(var i=0;i<size.length;i++){
          msa.push({'value':size[i].product_size,'label':size[i].product_size});
          sizeshoekarnewala.push({'sizelabel':size[i].product_size,'quantity':size[i].quantity});    
          let sqi = size[i].product_size + ':' + size[i].quantity;
          sqtymodelwalatemp.push(sqi);
        }
        console.log(msa);
        
        this.setState({modalpid:aaaa.pid})
        this.setState({sqtymodelwala:sqtymodelwalatemp})
        this.setState({defval:msa})
        this.setState({sizearraydata:sizeshoekarnewala})
        this.setState({modalcategory:aaaa.productdetails.Category})
        this.setState({modalsubcategory:aaaa.productdetails.Subcategory})
        this.setState({modalprice:aaaa.productdetails.Price})
        this.setState({modalproductname:aaaa.Product_Name})
        this.setState({modaldiscount:aaaa.productdetails.Discount})
        this.setState({modaloffer:aaaa.productdetails.offerprice})
        this.setState({modalimage:img})
        this.setState({modalofferdate:aaaa.productdetails.offerdate})
        this.setState({modaldesc:aaaa.productdetails.Product_desc})
        
        this.setState({isOpen: true});
        this.modalprohandlechange(aaaa.productdetails.Category)
        console.log(this.state.modalimage);
      }

      closeModal = () => {
        this.setState({ isOpen: false })
      };

      handlemodalChange= (event) => {
        console.log(event.target.value);
        this.setState({modalproductname:event.target.value})
      }

      handlemodaldescChange=(event)=>{
        this.setState({modaldesc:event.target.value})
      }
  
      modalupdateNum1(data) {
  
        let cal = parseInt(data.target.value) - (parseInt(data.target.value) * (parseInt((this.state.modaldiscount)) / 100 ) );
        this.setState({
          modalprice : data.target.value,
        })
        this.setState({
          modaloffer : cal
        })
      }
  
      modalupdateNum2(data) {
          this.setState({modaldiscount:data.target.value})
          let cal = parseInt(this.state.modalprice) - (parseInt(this.state.modalprice) * (parseInt((data.target.value)) / 100 ) );
          this.setState({modaloffer : cal})
      }
  
      modalprohandlechange=(e)=>{
        this.setState({modalcategory: e});
          const subdata= {
              categoryid:e,
              findprosubcat:"yes"
          }
          axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',subdata)
          .then(res => {
              this.setState({
                subcategory:res.data.findsubcat
              })
          })
      }
  
      modalhandleproChange = (event) => {
        this.setState({modalsubcategory:event.target.value});
      }
      modalquantityChange=(event,item)=>{
        console.log(this.state.sqtymodelwala);
        let sqi = item + ':' + event.target.value;
        let sqiarr = this.state.sqtymodelwala;
        for(var i=0;i<=sqiarr.length;i++){
          var aa = String(sqiarr[i]);
          if(parseInt(aa.split(":")[1]) != NaN){/*qqq = qqq + parseInt(aa.split(":")[1]);*/}
          if(aa.split(":")[0] == item){
            sqiarr.splice(i, 1);
          } else {
          }
        }
        sqiarr.push(sqi);
        this.setState({sqtymodelwala:sqiarr})
        console.log(this.state.sqtymodelwala);
      }
  
      handledateChange = (event) => {
        this.setState({modalofferdate:event.target.value});
      }
  
      handlenewquantity=(event,item)=>{
        let abc=event.target.value;
        let sqi = item + ':' + event.target.value;
        let sqiarr  = this.state.Sizequantity;
        sqiarr.push(sqi);
        this.setState({Sizequantity:sqiarr})
  
        this.setState({totalquantity:parseInt(this.state.totalquantity) + parseInt(abc)})
        console.log(this.state.totalquantity);
      }

      modalhandleselectsize=(event)=>{
        console.log(event);
        let sa = [];
        for(var i=0;i<event.length;i++)
        {
          let jj = event[i];
          sa.push({'sizelabel':jj.value});
        }
        this.setState({ sizearraydata:sa });
        console.log(this.state.sizearraydata);
    }

    

    deleteproductimg=(imgid)=>{
      console.log(imgid)
      const delimg={
        delimgg:"yes",
        imgid:imgid,
      }
      console.log(delimg)
      axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',delimg)
      .then(res => {
        console.log(res.data);
      })
    }

    imageupload=(event)=>{
      this.setState({
        imagefile:event.target.files
      })
      console.log(event.target.files);
    }

    handleproupdateSubmit = (event) => {
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
          prid:this.state.modalpid,
          Category: this.state.modalcategory, 
          Subcategory : this.state.modalsubcategory,
          Product_Name:this.state.modalproductname,
          Product_desc:this.state.modaldesc,     
          productupdate : 'yes',
          User_id : localStorage.getItem('adminid'),
          Size : this.state.sqtymodelwala.join(','),
          Price:this.state.modalprice,
          Discount:this.state.modaldiscount,
          offerdate:this.state.modalofferdate,
          productimage:this.state.imagefile.name,
          imagefile:this.state.imagefile
        }     
        console.log(subdata);
        axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',subdata)
        .then(res => {
            console.log(res.data)
            this.uploadfile(this.state.imagefile,this.state.modalpid);
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


  render() {
    return (
      <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Product Details"
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
            onChange={(e)=>this.setSearch(e.target.value)}
            />
        }/>

        <Modal size="lg" show={this.state.isOpen}  onHide={this.closeModal} aria-labelledby="contained-modal-title-vcenter" centered >
          <div className='heading'>
            <h4 className='address-heading'>Edit Product details</h4>
            <GrClose onClick={this.closeModal}/>
          </div>
          <form onSubmit={this.handleproupdateSubmit} style={{padding:"0 35px 25px 35px"}}>
            <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
                <div style={{width:"50%"}}>
                    <label  className="fieldtitle">Choose Category:</label>
                    <select name="choosecategory" id="category" required className="form-control" onChange={e => this.modalprohandlechange(e.target.value)} value={this.state.modalcategory}>
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
                    <select name="choosesubcategory" required id="subcategory" className="form-control" onChange={this.modalhandleproChange} value={this.state.modalsubcategory}>
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
            <div style={{marginTop:"15px"}}>
                <label  className="fieldtitle">Product Name</label> 
                <input type="text" className="form-control" required name="pro_name"  placeholder="Enter Product Name" onChange={this.handlemodalChange} value={this.state.modalproductname}></input>
            </div>
            <div>
                <label  className="fieldtitle">Product Description</label> 
                <textarea style={{resize:"none"}} className="form-control" rows="4" name="pro_desc" required placeholder="Product Description" onChange={this.handlemodaldescChange} value={this.state.modaldesc}></textarea>
            </div>
            <div>
                <label className="fieldtitle">Product Image</label> 
                <input type="file" required name="imagefile" className="form-control"  onChange={this.imageupload} multiple></input>
            </div>

            <div className="mt-3" style={{display:"flex"}}>
                {this.state.modalimage.map((item,index)=>{
                    return(
                      <div className="imgdiv">
                        <img key={index} src={item.imagelink} className="productmainimg"/>
                        <MdDeleteOutline style={{fontSize:"24px",cursor:"pointer"}} onClick={()=>this.deleteproductimg(item.image_id)}/>
                      </div>
                    )
                })
              }
            </div>

            <div>
                <label  className="fieldtitle">Select size</label> 
                <Select className="form-control" name="sizearr" required placeholder="Select Size" onChange={this.modalhandleselectsize}
                    closeMenuOnSelect={false}
                    isMulti
                    defaultValue={this.state.defval}
                    options={this.state.sizeOptions1}
                />
            </div>
            <div style={{marginTop:"15px"}}>
              {
                this.state.sizearraydata.map((item,index)=>{
                  return(
                    <>
                      <div className="sizediv" key={index}>
                        <label className="fieldtitle">{item.sizelabel}</label>
                        <input type="number" className="form-control" required name="quantity" placeholder="Enter Product Quantity" onBlur={e => this.modalquantityChange(e,item.sizelabel)} value={item.quantity}></input>
                      </div>
                    </>
                  );
                })
              }
            </div> 

            <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
              <div style={{width:"33.33%"}}>
                  <label  className="fieldtitle">Product Price</label> 
                  <input type="number" className="form-control" required name="product_price" placeholder="Enter Product Price" onChange={this.modalupdateNum1.bind(this)} value={this.state.modalprice}></input>
              </div>
              <div style={{width:"33.33%",marginLeft:"20px"}}>
                  <label className="fieldtitle">Discount (In %)</label> 
                  <input type="number" className="form-control" required name="discount_percent" placeholder="Enter Discount Percentage" onChange={this.modalupdateNum2.bind(this)} value={this.state.modaldiscount}></input>
              </div>
              <div style={{width:"33.33%",marginLeft:"20px"}}>
                  <label className="fieldtitle">Offer Price:</label><br/>
                  <label className="form-control">{this.state.modaloffer}</label>
              </div>
            </div>  
            <div>
                <label  className="fieldtitle">Offer Date</label> 
                <input type="date" className="form-control" required name="offer_date" placeholder="Enter Offer Date" onChange={this.handledateChange} value={this.state.modalofferdate}></input>
              </div>
            <div className='btnssssss'>
              <button type="submit" value='submit' className='cancelbtn' variant="secondary" >SUBMIT</button>
              <button className='cancelbtn' variant="secondary" onClick={this.closeModal} style={{backgroundColor: "#fff",color:"#42a2a2", marginLeft:"25px"}}>Cancel</button>
            </div> 
          </form>
        </Modal>
      </div>
    )
  }
}
