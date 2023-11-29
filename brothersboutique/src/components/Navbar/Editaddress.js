import axios from 'axios';
import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";

export default class Editaddress extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            iseditOpen: false,
            addressdetails:[],
            modalmobile:"",
            modalpincode:"",
            modalcity:"",
            modalstate:"",
            modalflatno:"",
            modalarea:"",
            modallandmark:"",
            modalusername:"",
            modalordno:"",
            newaddress:""

        }
        this.fetchaddressdetails();
        this.handleproChange = this.handleproChange.bind(this);
        this.handleproSubmit = this.handleproSubmit.bind(this);
        
    }
    openaddmodal = () => {this.setState({ isOpen: true });}
    closeModal = () => {this.setState({ isOpen: false })};

    fetchaddressdetails=()=>{
        const data={
            userid:localStorage.getItem("userid"),
            addaddress:"yes"
        }
        axios.post('http://localhost/E-Commerce/brothers/orderdetail.php',data)
        .then(res => {
            console.log(res.data);
            this.setState({addressdetails:res.data.findaddressdata})
            this.setState({lastaddress:res.data.findlastaddress.order_id})
            this.setState({prevaddoid:res.data.findlastaddress.order_id})
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
    
    handleproSubmit = (event) => {
        alert("yes");
        event.preventDefault();
        const addressdata = {
            userid:localStorage.getItem("userid"),
            useremail:localStorage.getItem("useremail"),
            fullname:this.state.pro_name,
            mobnumber:this.state.mobnumber,
            pincode:this.state.pincode,
            city:this.state.city,
            state:this.state.state,
            address:this.state.address,
            area:this.state.area,
            landmark:this.state.landmark,
            addorderdetails : 'yes',
            // checkcheck:""
        }
        console.log(addressdata);
        axios.post('http://localhost/E-Commerce/brothers/orderdetail.php',addressdata)
        .then(res => {
            console.log(res.data);
            this.setState({ isOpen: true });

        })
    }

    editaddress=(itm)=>
    {
        var ordval=itm;
        this.setState({ modalusername: ordval.fullname});
        this.setState({ modalmobile: ordval.mob_number});
        this.setState({ modalpincode: ordval.pincode});
        this.setState({ modalcity: ordval.city});
        this.setState({ modalstate: ordval.state});
        this.setState({ modalflatno: ordval.address});
        this.setState({ modalarea: ordval.area});
        this.setState({ modallandmark: ordval.landmark});
        this.setState({ modalordno: ordval.order_id});
        this.setState({ iseditOpen: true });
        
    }
    closeEditModal = () => {this.setState({ iseditOpen: false })};

    handlemodalnameChange=(event)=>{
        this.setState({modalusername:event.target.value})
    }
    handlemodalmobChange=(event)=>{
        this.setState({modalmobile:event.target.value})
    }
    handlemodalpinChange=(event)=>{
        this.setState({modalpincode:event.target.value})
    }
    handlemodalcityChange=(event)=>{
        this.setState({modalcity:event.target.value})
    }
    handlemodalstateChange=(event)=>{
        this.setState({modalstate:event.target.value})
    }
    handlemodalflatChange=(event)=>{
        this.setState({modalflatno:event.target.value})
    }
    handlemodalareaChange=(event)=>{
        this.setState({modalarea:event.target.value})
    }
    handlemodallandmarkChange=(event)=>{
        this.setState({modallandmark:event.target.value})
    }

    handlepromodalSubmit = (event) => {
        event.preventDefault();
        const editaddressdata = {
            userid:localStorage.getItem("userid"),
            useremail:localStorage.getItem("useremail"),
            fullname:this.state.modalusername,
            mobnumber:this.state.modalmobile,
            pincode:this.state.modalpincode,
            city:this.state.modalcity,
            state:this.state.modalstate,
            address:this.state.modalflatno,
            area:this.state.modalarea,
            landmark:this.state.modallandmark,
            ordno:this.state.modalordno,
            editorderdetails : 'yes',
        }
        console.log(editaddressdata);
        axios.post('http://localhost/E-Commerce/brothers/orderdetail.php',editaddressdata)
        .then(res => {
            console.log(res.data);
            this.setState({ iseditOpen: false })
            this.fetchaddressdetails();
        })
    }

    selectaddress=(event,order_id)=>{
        var checkradio=event.target.checked;
        console.log(event.target.checked);
        if(checkradio){
            console.log('✅ Checkbox is checked');
        }
        else{
            console.log('✅ Not checked');
        }

        this.setState({checkcheck:checkradio})
        this.setState({lastaddress:order_id})
        this.setState({newaddress: event.currentTarget.value});
    }

    newaddressadded=(ord)=>{
        const changeaddress={
            orderidadd:ord,
            prevaddoid:this.state.prevaddoid,
            updatecnfaddress:"yes"
        }
        console.log(changeaddress)
        axios.post('http://localhost/E-Commerce/brothers/orderdetail.php',changeaddress)
        .then(res => {
            this.props.history.push('/Paymentpage')
            console.log(res.data);
        })
    }
    removeaddress=(ord)=>{
        const deleteaddress={
            orderiddel:ord,
            deladdress:"yes"
        }
        console.log(deleteaddress)
        axios.post('http://localhost/E-Commerce/brothers/orderdetail.php',deleteaddress)
        .then(res => {
            console.log(res.data);
            this.fetchaddressdetails();
        })
    }

  render() {
    return (
      <div className='container py-4'>
        <div className='row mb-3'>
            <h4>My Addresss</h4>
        </div>
        <div className='row'>
            <div className='col-md-8'>
                {
                    this.state.addressdetails.map((item,index)=>{
                        return(
                            <div className='card mb-3' key={index}>
                                <div className='card-head addresscard-head'>
                                    <h6>RECENTLY USED</h6>   
                                </div>
                                <div className='card-body addresscard-body'>
                                    <p>{item.fullname}</p>
                                    <div className='mb-3' style={{display:"flex",alignItems:"center"}}>
                                        <input type="radio" name="new_address"
                                        value={this.state.newaddress}
                                        checked={ this.state.lastaddress ==  item.order_id ? true : false }
                                        onChange={(e)=>this.selectaddress(e,item.order_id)}
                                        />
                                            <p style={{marginBottom:"0",marginLeft:"10px"}}>{item.address} &nbsp;
                                            {item.area} &nbsp;
                                            {item.landmark},&nbsp;
                                            {item.city},&nbsp;
                                            {item.state} - &nbsp;
                                            {item.pincode}</p>
                                    </div>
                                    
                                    <div className='edit-removeadd'>
                                        <p><b>Mobile</b> : {item.mob_number}</p>
                                        {
                                        this.state.lastaddress ==  item.order_id ?
                                            <p className='ed-del'><span onClick={()=>this.editaddress(item)}>Edit </span> | <span style={{marginLeft:"0px"}} onClick={()=>this.removeaddress(item.order_id)}> Remove</span></p>
                                        :
                                        <></>
                                    }
                                    </div>
                                    {
                                        this.state.lastaddress ==  item.order_id ?
                                            <button className="conadd-btn" onClick={()=>this.newaddressadded(item.order_id)}>Confirm</button>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
            <div className='col-md-4'>
                <button className="editaddress-btn" onClick={()=>this.openaddmodal()}>ADD ADDRESS</button>   
            </div>
        </div>

        <Modal
            size="lg"
            show={this.state.isOpen} 
            onHide={this.closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div className='heading'>
                <h4 className='address-heading'>add new address</h4>
                <GrClose onClick={this.closeModal}/>

                </div>
                <form onSubmit={this.handleproSubmit} style={{padding:"0 35px 25px 35px"}}>
                    <div>
                        <label for="proname" className="fieldtitle">Name</label> 
                        <input type="text" className="form-control" required name="pro_name" placeholder="Full Name" onChange={this.handleproChange}></input>
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <label for="mobnumber" className="fieldtitle">Mobile Number</label> 
                        <input type="text" className="form-control" required name="mobnumber" placeholder="Mobile Number" onChange={this.handleproChange}></input>
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <label for="pincode" className="fieldtitle">Pin Code</label> 
                        <input type="text" className="form-control" required name="pincode" placeholder="Pin Code" onChange={this.handleproChange}></input>
                    </div>
                    <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
                        <div style={{width:"50%"}}>
                            <label for="city" className="fieldtitle">City</label> 
                            <input type="text" className="form-control" required name="city" placeholder="City" onChange={this.handleproChange}></input>
                        </div>
                        <div style={{width:"50%",marginLeft:"20px"}}>
                            <label for="state" className="fieldtitle">State</label> 
                            <input type="text" className="form-control" required name="state" placeholder="State" onChange={this.handleproChange}></input>
                        </div>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="address" className="fieldtitle">Flat no/Building, Street name</label> 
                        <input type="text" className="form-control" required name="address" placeholder="Flat no/Building, Street name" onChange={this.handleproChange}></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="area" className="fieldtitle">Area/Locality</label> 
                        <input type="text" className="form-control" required name="area" placeholder="Area/Locality" onChange={this.handleproChange}></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="landmark" className="fieldtitle">Landmark (Optional)</label> 
                        <input type="text" className="form-control" required name="landmark" placeholder="Landmark (Optional)" onChange={this.handleproChange}></input>
                    </div>
                    <div className='btnssssss'>
                        <button className='cancelbtn' variant="secondary" type="submit" value='submit'>Save Address</button>
                        <button className='cancelbtn' variant="secondary" onClick={this.closeModal} style={{backgroundColor: "#fff",color:"#42a2a2", marginLeft:"25px"}}>Cancel</button>
                    </div>
                </form>
        </Modal>


        <Modal
            size="lg"
            show={this.state.iseditOpen} 
            onHide={this.closeEditModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div className='heading'>
                <h4 className='address-heading'>add new address</h4>
                <GrClose onClick={this.closeEditModal}/>

                </div>
                <form onSubmit={this.handlepromodalSubmit} style={{padding:"0 35px 25px 35px"}}>
                    <div>
                        <label for="proname" className="fieldtitle">Name</label> 
                        <input type="text" className="form-control" required name="pro_name" placeholder="Full Name" onChange={this.handlemodalnameChange} value={this.state.modalusername}></input>
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <label for="mobnumber" className="fieldtitle">Mobile Number</label> 
                        <input type="text" className="form-control" required name="mobnumber" placeholder="Mobile Number" onChange={this.handlemodalmobChange} value={this.state.modalmobile}></input>
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <label for="pincode" className="fieldtitle">Pin Code</label> 
                        <input type="text" className="form-control" required name="pincode" placeholder="Pin Code" onChange={this.handlemodalpinChange} value={this.state.modalpincode}></input>
                    </div>
                    <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
                        <div style={{width:"50%"}}>
                            <label for="city" className="fieldtitle">City</label> 
                            <input type="text" className="form-control" required name="city" placeholder="City" onChange={this.handlemodalcityChange} value={this.state.modalcity}></input>
                        </div>
                        <div style={{width:"50%",marginLeft:"20px"}}>
                            <label for="state" className="fieldtitle">State</label> 
                            <input type="text" className="form-control" required name="state" placeholder="State" onChange={this.handlemodalstateChange} value={this.state.modalstate}></input>
                        </div>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="address" className="fieldtitle">Flat no/Building, Street name</label> 
                        <input type="text" className="form-control" required name="address" placeholder="Flat no/Building, Street name" onChange={this.handlemodalflatChange} value={this.state.modalflatno}></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="area" className="fieldtitle">Area/Locality</label> 
                        <input type="text" className="form-control" required name="area" placeholder="Area/Locality" onChange={this.handlemodalareaChange} value={this.state.modalarea}></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label for="landmark" className="fieldtitle">Landmark (Optional)</label> 
                        <input type="text" className="form-control" required name="landmark" placeholder="Landmark (Optional)" onChange={this.handlemodallandmarkChange} value={this.state.modallandmark}></input>
                    </div>
                    <div className='btnssssss'>
                        <button className='cancelbtn' variant="secondary" type="submit" value='submit'>Save Address</button>
                        <button className='cancelbtn' variant="secondary" onClick={this.closeEditModal} style={{backgroundColor: "#fff",color:"#42a2a2", marginLeft:"25px"}}>Cancel</button>
                    </div>
                </form>
        </Modal>
      </div>
    )
  }
}
