import React, { Component } from 'react'
import noimg from '../../images/no-orders.png'
import { AiOutlineLeft } from "react-icons/ai";
import { GrDeliver } from "react-icons/gr";
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import Swal from 'sweetalert2';



import axios from "axios";

export default class Userorder extends Component {
    constructor(props){
        super(props);
        this.state={
            productuserorderarr:[],
            isOpen:false, 
            iscancelopen:false, 
            cancelreason:"",
            isreturnopen:false,
            returnreason:"",
            findaddress:[],
            returnaddress:[],
            isexchangeopen:false,
            adressvalue:"",
            confretdetail:[],
            sizearr:[],
            
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onReturnValue = this.onReturnValue.bind(this);
        this.onAddresschange = this.onAddresschange.bind(this);

        this.handleproChange = this.handleproChange.bind(this);
        this.handleproSubmit = this.handleproSubmit.bind(this);
        this.fetchuserorders();
    }
    fetchuserorders=()=>{
        const data={
            fetchuserorder:"yes",
            user_id: localStorage.getItem('userid'),
        }
        axios.post('http://localhost/E-Commerce/brothers/confirmorder.php',data)
        .then(res => {
            console.warn(res.data); 
            this.setState({productuserorderarr:res.data.productuserorderarr})
            this.setState({findaddress:res.data.findpickupaddress})
        })
    }
    prdstatus=(ps)=>{
        if(ps=='A'){
            return(
                <label className='condel'>Order Confirmed</label>
            )
        }
        if(ps=='P'){
            return(
                <label className='pen'>Pending</label>
            )
        }
        if(ps=='D'){
            return(
                <label className='condel'>Delivered</label>
            )
        }
        if(ps=='R'){
            return(
                <label className='condel'>Returned</label>
            )
        }
        if(ps=='E'){
            return(
                <label className='condel'>Exchanged</label>
            )
        }
        if(ps=='C'){
            return(
                <label className='can'>Order Cancelled</label>
            )
        }
    }

    cancelcancel=(pr,item)=>{
        if( pr == 'P' || pr == "A" ){
            return(
                <button className='orderbtnbtn' onClick={()=>this.cancelorder(item)}>Cancel Order</button>
            );
        }
        else if(pr == 'D'){
            return(  
                <>             
                    <button className='orderbtnbtn' onClick={()=>this.returnorder(item)}>Return</button>
                    <button className='orderbtnbtn' onClick={()=>this.exchangeorder(item)}> Exchange</button>
                </>
            );
        }
        else{
            return(<></>);
        }
    }
    orderinfo=(cid)=>{
        console.log(cid)
        this.props.history.push("/Confirmationpage",{ cid:cid })
    }

    cancelorder=(ii)=>{
        this.setState({ iscancelopen: true });
        this.setState({ confdetail: ii });
    }

    onChangeValue(event) {
        this.setState({cancelreason:event.target.value})
    }
    
    onReturnValue(event) {
        this.setState({returnreason:event.target.value})
    }

    onAddresschange(event) {
        this.setState({adressvalue:event.target.value})
    }
    confirmcancel=()=>{
        var cid=this.state.confdetail.confirmed_id
        var creason=this.state.cancelreason
        if(creason){
            const data={
                cancelorderbtn:"yes",
                confid:cid,
                creason:creason
            }
            axios.post('http://localhost/E-Commerce/brothers/confirmorder.php',data)
            .then(res => {
                console.log(res.data); 
                this.setState({ iscancelopen: false })
                this.fetchuserorders();
            })
        }
        else{
            alert("Select Reason")
        } 
    }
    closecancelModal = () => {this.setState({ iscancelopen: false })};

    returnorder=(ii)=>{
        this.setState({ isreturnopen: true });
        this.setState({ confretdetail: ii });
        this.setState({ pid: ii.product_id });
    }

    closereturnModal = () => {this.setState({ isreturnopen: false })};


    confirmreturn=(pid)=>{
        console.log(this.state.confretdetail)
        console.log(this.state.confretdetail.product_size)
        var cid=this.state.confretdetail.confirmed_id  
        var retreason=this.state.returnreason
        if(retreason){
            const data={
                returnorderbtn:"yes",
                confid:cid,
                retreason:retreason,
                userid:localStorage.getItem("userid"),
                productid:this.state.pid,
                orderid:this.state.adressvalue,
                // prdsize:this.state.confretdetail.product_size,
                // prquan:this.state.confretdetail.product_quantity
            }
            console.log(data)
            axios.post('http://localhost/E-Commerce/brothers/confirmorder.php',data)
            .then(res => {
                console.log(res.data); 
                this.setState({ isreturnopen: false })
                this.fetchuserorders();
                this.props.history.push('/Returnpage')
            })
        }
        else{
            alert("Select Reason")
        } 
    }

    productdetails = (pid,pathname) => {
        this.props.history.push('/p/'+pathname+'/'+pid);
    }


    addnewaddress = () => {this.setState({ isOpen: true });}
    closeModal = () => {this.setState({ isOpen: false })};


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
            oid:this.state.confretdetail.order_id,
            addneworderdetails : 'yes',
            cid:this.state.confretdetail.confirmed_id
        }
        console.log(addressdata);
        axios .post('http://localhost/E-Commerce/brothers/confirmorder.php',addressdata)
        .then(res => {
            console.log(res.data.findreturnaddress);
            this.setState({ isOpen: false })
            this.setState({findaddress: res.data.findreturnaddress })
            console.log(this.state.returnaddress)
        })
    }

    exchangeorder=(ii)=>{
        this.setState({isexchangeopen:true});
        this.setState({ sizearr : ii.sizeforexchange });
        this.setState({ confretdetail: ii });
    }
    closeexchangeModal = () => {this.setState({ isexchangeopen: false })};
    
    getproductsize = (pid,Product) =>{
        return(
        <>
            {
                this.state.sizearr.map((itemss,index)=>{
                    if(itemss.quantity != 0)
                    {
                        return (
                            <NavDropdown.Item className='dropmenu' key={index} onClick={() => this.prosizechange(itemss.size_id,pid,Product)} value={itemss.size_id}>{itemss.product_size}</NavDropdown.Item>
                        )
                    }
                })
            }
        </>
        )
    }

    prosizechange=(size,pid,Product)=>{
        const ssdata = {
            addnewsize:"yes",
            productid:pid,
            userid:localStorage.getItem("userid"),
            prsize:size,
            cid:this.state.confretdetail.confirmed_id,
            oid:this.state.confretdetail.order_id,
            oldsize:this.state.confretdetail.product_size,
        }
        console.log(ssdata);
        axios .post('http://localhost/E-Commerce/brothers/confirmorder.php',ssdata)
        .then(res => {
            console.log(res.data);
            Swal.fire({
                title:"Exchange Confirmed",
                timer:1500,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
            }).then(()=>{
                this.props.history.push('/Exchangeproduct')
            })
        })
    }

    render() {
        return (
            <>      
                <div className='container'>
                {this.state.productuserorderarr.length==0 ? (
                    <>
                        <div className='row mt-4'>
                            <p className='accacc'><AiOutlineLeft/>Back to My Account</p>
                            <h4 className='orderorder mt-3'>My Orders</h4>
                            
                            <div  className='noorder my-5'>
                                <p>Sadly, you haven't placed any orders till now.</p>
                                <img src={noimg} style={{height:"300px"}}/>
                            </div>
                        </div>
                    </>):
                    (
                    <>
                        <div className='row my-5'>
                        <p className='accacc'><AiOutlineLeft/>Back to My Account</p>
                        <h4 className='orderorder mt-3'>My Orders</h4>
                        <div className='col-md-12'>
                        {
                            this.state.productuserorderarr.map((item,index)=>{
                                return(
                                    <>
                                        <p className='ordernumber mt-4'>Order# {item.order_number}</p>
                                        <div className='card prevorder mt-1' key={index}>
                                            <img src={item.imgurl} onClick={()=> this.productdetails(item.product_id,item.pathname)} className="orderimg" />
                                            <div className='orderdetailorder'>
                                                <div>
                                                    <h6 onClick={()=> this.productdetails(item.product_id,item.pathname)} style={{cursor:"pointer"}}>{item.pro_name}</h6>
                                                    <h6 className='mt-3'>Size : {item.product_size}</h6>
                                                    <p className='my-md-4'><GrDeliver/> {item.ddmmyyyy}</p>
                                                    <p>
                                                        {
                                                            this.prdstatus(item.product_status)
                                                        }
                                                    </p>
                                                </div>
                                                <div style={{marginLeft:"auto",display:"flex"}}>
                                                    <button className='orderbtnbtn' onClick={()=>this.orderinfo(item.confirmed_id)}>Order Info</button>
                                                    {
                                                        this.cancelcancel(item.product_status,item)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })              
                        }  
                        </div>
                        </div>
                    </>)                     
                }
                </div>
                <Modal      
                    show={this.state.iscancelopen}
                    dialogClassName="cancelmodal" 
                    onHide={this.closecancelModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered                   
                    >
                        <div style={{padding:"10px"}}>
                            <h6 style={{textAlign:"left"}}>Reason to cancel Order</h6>
                            <div onChange={this.onChangeValue}>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Taking too long to deliver" name="choose"/>
                                    <label htmlFor="one" style={{marginLeft:"10px"}}>Taking too long to deliver</label>
                                </div>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Prize too high" name="choose"/>
                                    <label htmlFor="two" style={{marginLeft:"10px"}}>Prize too high</label>
                                </div>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Others" name="choose"/>
                                    <label htmlFor="three" style={{marginLeft:"10px"}}>Others</label>
                                </div>
                            </div>
                            <button className='orderbtnbtn' onClick={()=>this.confirmcancel()}>Confirm cancel</button>
                            
                        </div>
                </Modal>

                <Modal      
                    show={this.state.isreturnopen}
                    dialogClassName="cancelmodal" 
                    onHide={this.closereturnModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered                   
                    >
                        <div style={{padding:"10px"}}>
                            <h6 style={{textAlign:"left"}}>Reason to Return Order</h6>
                            <div onChange={this.onReturnValue}>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Size Does not fit" id="one" name="choosereturn"/>
                                    <label for="one" style={{marginLeft:"10px"}}>Size Does not fit</label>
                                </div>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Not happy with product" id="two" name="choosereturn"/>
                                    <label for="two" style={{marginLeft:"10px"}}>Not happy with product</label>
                                </div>
                                <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                                    <input type="radio" value="Others" id="three" name="choosereturn"/>
                                    <label for="three" style={{marginLeft:"10px"}}>Others</label>
                                </div>
                            </div>
                            <div style={{marginTop:"20px",textAlign:"left"}}>
                                <h5>Confirm Pick up address</h5>
                                <div style={{display:"flex",flexDirection:"column", alignItems:"baseline"}}>
                                    <div onChange={this.onAddresschange}>
                                        {
                                            this.state.findaddress.map((item,index)=>{
                                                var radioid = "add"+ item.order_id;
                                                return(
                                                    <>
                                                        <input type="radio" value={item.order_id} key={index}  name="addressreturnppickup" id={radioid} />
                                                        <label for={radioid} style={{marginLeft:"15px"}}>
                                                        {item.address} &nbsp;
                                                        {item.area} &nbsp;
                                                        {item.landmark},&nbsp;
                                                        {item.city},&nbsp;
                                                        {item.state} - &nbsp;
                                                        {item.pincode}
                                                        </label>
                                                    </>
                                                )
                                            })              
                                        } 
                                    </div>
                                </div>
                                <button className='orderbtnbtn' onClick={()=>this.addnewaddress()}>Add Address</button>
                                <button className='orderbtnbtn' onClick={()=>this.confirmreturn(this.state.productuserorderarr.product_id)}>Confirm Return</button>
                            </div>
                        </div>
                </Modal>


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
                            show={this.state.isexchangeopen}
                            dialogClassName="cancelmodal" 
                            onHide={this.closeexchangeModal}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered                   
                            >
                                <div style={{padding:"10px"}}>
                                    <p className='ordernumber mt-4'>Order# {this.state.confretdetail.order_number}</p>
                                    <div className='card prevorder mt-1'>
                                        <img src={this.state.confretdetail.imgurl}  className="orderimg" />
                                        <div className='orderdetailorder'>
                                            <div>
                                                <h6 style={{cursor:"pointer"}}>{this.state.confretdetail.pro_name}</h6>
                                                <h6 className='mt-3 text-start'>Ordered Size : {this.state.confretdetail.product_size}</h6>
                                                <button type="button"  className="ordersizebtn">
                                                    <NavDropdown id="qwertyu" title="Select Size">                    
                                                    {
                                                        this.getproductsize(this.state.confretdetail.product_id,this.state.confretdetail.pro_name)
                                                    }
                                                    </NavDropdown> 
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Modal>
                <div>
                    {/* <Footer/> */}
                </div>
            </>
        )
    }
}
