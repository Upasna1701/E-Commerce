import React, { Component } from 'react';
import cartimg from '../../images/cartimg.jpg';
import emptybag from '../../images/emptybag.png';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { FaAngleDown} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


export default class Cart extends Component {
    constructor(props){
        super(props);
   
        this.state={
            isOpen: false,
            cartlistdata:[],
            carttotaldata:[],
            pricetotaldata:"",
            discountdata:"",  
            newdiscountdata:"" ,
            productimage:[] ,
            sizearrr:[],
            isquanopen:false, 
            cartquantity:"",
            cartid:0,
            useraddress:[],
            userdetailsfound:false,
            newbtnbtn:"address-btn",
            newconbtn:"address-btn",
            continueaddaddress:true,
            width: window.innerWidth,
        }

        this.fetchdatacart();
        this.handleproChange = this.handleproChange.bind(this);
        this.handleproSubmit = this.handleproSubmit.bind(this);     
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    fetchdatacart=()=>{
        const data = {
            user_id: localStorage.getItem('userid'),
            fetchcartlist:"yes"
        }       
        axios.post('http://localhost/E-Commerce/brothers/cart.php',data)
        .then(res => {
            console.log(res.data); 
            this.setState({cartlistdata:res.data.productcartarr})
            this.setState({pricetotaldata:res.data.pricetotal});
            this.setState({discountdata:res.data.offerpricetotal});
            this.setState({useraddress:res.data.findaddress});
            if(res.data.findaddress.length > 0){
                this.setState({continueaddaddress:false})
            }
            else {
                this.setState({continueaddaddress:true})
            }
            console.log(this.state.cartlistdata.sizequantity)
        })
    }

    removeitem=(cart_id)=> {
        const removecartdata = {
            cartid:cart_id,
            userid:localStorage.getItem("userid"),
            removefromcart:"yes",          
        }
        axios .post('http://localhost/E-Commerce/brothers/cart.php',removecartdata)
        .then(res => {
            console.log(res.data);
            this.fetchdatacart();
        })
    }

    movetowishlist=(pid,Product)=> {
        const wishdata = {
            addwishremovecart:"yes",
            productid:pid,
            productname:Product,
            userid:localStorage.getItem("userid"),
            useremail:localStorage.getItem("useremail"),
        }
        axios .post('http://localhost/E-Commerce/brothers/wishlist.php',wishdata)
        .then(res => {
            console.log(res.data);
            if(res.data.savewish>0){
                toast("Item already in Wishlist!");
            }
            else{
                toast(res.data.savewish);
            }
            this.fetchdatacart();
        })
    }

    
    openModal = () => {this.setState({ isOpen: true });}
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
            addorderdetails : 'yes',
        }
        console.log(addressdata);
        axios .post('http://localhost/E-Commerce/brothers/orderdetail.php',addressdata)
        .then(res => {
            console.log(res.data);
        })
    }
                                                            
    openQuantityModal = (cartid,sq) => {
        console.log(sq);
        this.setState({ cartid: cartid });
        this.setState({ sizequan: sq });
        this.setState({ isquanopen: true });
    }
    closequanModal = () => {this.setState({ isquanopen: false })};

    getproductquantity=()=>{
        var quanarr=[];
        if(this.state.sizequan < 10){
            for(var i=1;i<=this.state.sizequan;i++){
                quanarr.push(i);
            }
        }
        else{
            for(var i=1;i<=10;i++){
                quanarr.push(i);
            }
        }
    return(
        <>
            {
                quanarr.map((item,index)=>{
                    return(
                        <p key={index} className='dropmenu' style={{cursor:"pointer"}} onClick={()=>this.increaseQuantity(item)}>{item}</p>
                    )
                })
            }
        </>
    )
    }
    increaseQuantity=(i)=>{
        const quanval={
            editquantity:"yes",
            newquantity:i,
            cartid:this.state.cartid,
            userid:localStorage.getItem("userid"),
        }
        axios.post('http://localhost/E-Commerce/brothers/cart.php',quanval)
        .then(res => {
            console.log(res.data);
            if(res.data.updatecartquantity == true){
                this.closequanModal();
                toast("Quantity Updated!");
                this.fetchdatacart();
            }
            }) 
    }



    pricefun = (Price,Discount,offerdate,product_quantity) => {
        var currdate = new Date();
        let date = currdate.getDate();
        let month = currdate.getMonth();
        let year = currdate.getFullYear();
        let m = 0;
        if((month + 1) < 10){ m = "0"+(month + 1); } else { m = month + 1; }
        let cd = year + "-" + m + "-" + date;
        if((cd <= offerdate) == true)
        {
            return(                   
                <>
                    <p><span>₹ {Price - Discount}</span>
                    <s>{Price}</s></p>
                    <p>You saved ₹ {Discount}</p>
                </>
            )
        }
        else {
            return(
                <>
                    <span>₹{Price}</span>
                </>
            )
        }
    }

    paymentpage = (cartarr) =>{
        console.log(cartarr);
        this.props.history.push('/Paymentpage')
    }
    
    productdetails = (pid,pathname) => {
        this.props.history.push('/p/'+pathname+'/'+pid);
    }


    render() {
        const { width } = this.state;
        const isMobile = width <= 600;
        if (!isMobile) {
            return (
                <div className='container cart-container'>
                    {this.state.cartlistdata.length==0 ? (
                    <>
                    {/* empty bag */}
                    <div className='row emptycartdetails'>
                        <div className='col-md-12'>
                            <img src={emptybag} className="emptyimg"/>
                            <h3 className='nothing'>Nothing in the bag</h3>
                            <button type="button" className="btn continueshopping">Continue Shopping</button>
                        </div>
                    </div>
                    </>)
                    :
                    (<>
                    {/* product bag */}
                    <div className='container'>
                        <div className='row addeditem'>
                            <div className='col-md-7'style={{paddingRight:"0"}}>
                                <div className='container'>
                                {
                                    this.state.cartlistdata.map((item,index)=>{
                                return(
                                        <div className='row' key={index}>
                                            <div className='col-md-12' style={{marginBottom:"15px"}}>
                                                <div className='card'>
                                                    <div className='procarddetail'>
                                                    <div className="clothdetail">
                                                        <p onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)} style={{cursor:"pointer"}}>{item.Product}</p>
                                                        {
                                                            this.pricefun(item.productcartdetails.totalprice,item.productcartdetails.offerprice,item.productcartdetails.offerdate,item.product_quantity)
                                                        }
            
                                                        <div style={{marginTop:"10px"}}>
                                                            <div className="me-auto filters">
                                                                <div className="filternav">
                                                                    <p style={{marginBottom:"3px"}}>Size :<b> {item.sizename} </b></p>
                                                                </div>
                                                                <div className="filternav">
                                                                    <div onClick={()=>this.openQuantityModal(item.cart_id,item.sizequantity)}><p style={{marginBottom:"3px"}}>Qty :<b> {item.product_quantity} </b><FaAngleDown/></p></div>
                                                                </div>
                                                            </div>
                                                            {
                                                                (item.sizequantity < 10)?
                                                                <>
                                                                    <p style={{color:"red",marginTop:"10px"}}>Hurry only {item.sizequantity} left!</p>
                                                                </>:
                                                                <>
                                                                </>
                                                            }
                                                        </div>                                      
                                                    </div>                                       
                                                    <div onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)} style={{cursor:"pointer"}}>
                                                        <img src={item.proimgcart} className="pr-img"/>
                                                    </div>
                                                    </div>
                                                    <div className='remove-move-btn'> 
                                                        <div onClick={()=>this.removeitem(item.cart_id)} style={{width:"33%",textAlign:"center"}}><p>Remove</p></div>
                                                        <div className="vl"></div>
                                                        <div  style={{width:"67%",textAlign:"center"}} onClick={()=>this.movetowishlist(item.pid,item.Product)}><p>Move to Wishlist</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })              
                                }                   
                                </div>   
                            </div>
                            <div className='col-md-5'>
                                <p className='coupon-para'>Get Rs.200 instant discount on your First Purchase above Rs.999. Coupon code -NEW200</p>
                                <div className='price-div'>
                                    <p className='price-summary'>PRICE SUMMARY</p>
                                            <div className='ttl'>
                                                <div className='amt-div'>
                                                    <p>Total MRP (Incl. of taxes) </p>
                                                    <p>₹ {this.state.pricetotaldata}</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Delivery Fee  </p>
                                                    <p>FREE</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Bag Discount </p>
                                                    <p>- ₹{this.state.discountdata}</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Subtotal  </p>
                                                    <p>₹ {this.state.pricetotaldata-this.state.discountdata}</p>
                                                </div>  
                                                <div className='save-div'>
                                                    <p>You are saving ₹ {this.state.discountdata} on this order</p>
                                                </div>                         
                                            </div> 
                                    <div className='ttl-btn'>
                                        <p>Total<br/><span>₹ {this.state.pricetotaldata-this.state.discountdata}</span></p>
                                        {
                                            this.state.continueaddaddress ? (
                                                <>
                                                    <button className={this.state.newconbtn} onClick={()=>this.openModal()}>ADD ADDRESS</button>   
                                                </>
                                            ) : (
                                                <>
                                                    <button className={this.state.newconbtn } onClick={()=>this.paymentpage(this.state.cartlistdata)}>COUNTINUE</button> 
                                                </>
                                            )
                                        }
                                    </div>                  
                                </div>
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
            
                        {/* Quantity Modal */}
            
                        <Modal       
                            show={this.state.isquanopen}
                            dialogClassName="quanmodal" 
                            onHide={this.closequanModal}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered                   
                            >
                                <div style={{padding:"10px"}}>
                                    <h6>Select Quantity</h6>
                                {
                                    this.getproductquantity()
                                }
                                </div>
                        </Modal>
            
                    </div>
                    </>)}
                    <ToastContainer className="toastclass"/>
                </div>
            )
        }
        else{
            return(
                <>
                    <div className='container cart-container'>
                    {this.state.cartlistdata.length==0 ? (
                    <>
                    {/* empty bag */}
                    <div className='row emptycartdetails'>
                        <div className='col-md-12'>
                            <img src={emptybag} className="emptyimg"/>
                            <h3 className='nothing'>Nothing in the bag</h3>
                            <button type="button" className="btn continueshopping">Continue Shopping</button>
                        </div>
                    </div>
                    </>)
                    :
                    (<>
                    {/* product bag */}
                    <div className='container'>
                        <div className='row addeditem'>
                            <div className='col-md-7'style={{padding:"0"}}>
                                <div className='container' style={{padding:"0"}}>
                                {
                                    this.state.cartlistdata.map((item,index)=>{
                                    return(
                                        <div className='row' key={index}>
                                            <div className='col-md-12' style={{marginBottom:"15px"}}>
                                                <div className='card'>
                                                    <div className='procarddetail'>
                                                    <div className="clothdetail">
                                                        <p onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)} style={{cursor:"pointer"}}>{item.Product}</p>
                                                        {
                                                            this.pricefun(item.productcartdetails.totalprice,item.productcartdetails.offerprice,item.productcartdetails.offerdate,item.product_quantity)
                                                        }
            
                                                        <div style={{marginTop:"10px"}}>
                                                            <div className="me-auto mobile-filters">
                                                                <div className="filternav" style={{width:"90px"}}>
                                                                    <p style={{marginBottom:"3px"}}>Size :<b> {item.sizename} </b></p>
                                                                </div>
                                                                <div className="filternav mt-2" style={{width:"90px"}}>
                                                                    <div onClick={()=>this.openQuantityModal(item.cart_id,item.sizequantity)}><p style={{marginBottom:"3px"}}>Qty :<b> {item.product_quantity} </b><FaAngleDown/></p></div>
                                                                </div>
                                                            </div>
                                                            {
                                                                (item.sizequantity < 10)?
                                                                <>
                                                                    <p style={{color:"red",marginTop:"10px"}}>Hurry only {item.sizequantity} left!</p>
                                                                </>:
                                                                <>
                                                                </>
                                                            }
                                                        </div>                                      
                                                    </div>                                       
                                                    <div onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)} style={{cursor:"pointer"}}>
                                                        <img src={item.proimgcart} className="pr-img"/>
                                                    </div>
                                                    </div>
                                                    <div className='remove-move-btn' style={{height:"40px"}}> 
                                                        <div onClick={()=>this.removeitem(item.cart_id)} style={{width:"33%",textAlign:"center"}}><p>Remove</p></div>
                                                        <div className="vl" style={{height:"40px"}}></div>
                                                        <div  style={{width:"67%",textAlign:"center"}} onClick={()=>this.movetowishlist(item.pid,item.Product)}><p>Move to Wishlist</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })              
                                }                   
                                </div>   
                            </div>
                            <div className='col-md-5' style={{padding:"0"}}>
                                <p className='coupon-para'>Get Rs.200 instant discount on your First Purchase above Rs.999. Coupon code -NEW200</p>
                                <div className='price-div'>
                                    <p className='price-summary'>PRICE SUMMARY</p>
                                            <div className='ttl'>
                                                <div className='amt-div'>
                                                    <p>Total MRP (Incl. of taxes) </p>
                                                    <p>₹ {this.state.pricetotaldata}</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Delivery Fee  </p>
                                                    <p>FREE</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Bag Discount </p>
                                                    <p>- ₹{this.state.discountdata}</p>
                                                </div>
                                                <div className='amt-div'>
                                                    <p>Subtotal  </p>
                                                    <p>₹ {this.state.pricetotaldata-this.state.discountdata}</p>
                                                </div>  
                                                <div className='save-div'>
                                                    <p>You are saving ₹ {this.state.discountdata} on this order</p>
                                                </div>                         
                                            </div> 
                                    <div className='ttl-btn'>
                                        <p>Total<br/><span>₹ {this.state.pricetotaldata-this.state.discountdata}</span></p>
                                        {
                                            this.state.continueaddaddress ? (
                                                <>
                                                    <button className={this.state.newconbtn} onClick={()=>this.openModal()}>ADD ADDRESS</button>   
                                                </>
                                            ) : (
                                                <>
                                                    <button className={this.state.newconbtn } onClick={()=>this.paymentpage(this.state.cartlistdata)}>COUNTINUE</button> 
                                                </>
                                            )
                                        }
                                    </div>                  
                                </div>
                            </div>
                        </div>
            
                        <Modal
                            size="lg"
                            show={this.state.isOpen} 
                            onHide={this.closeModal}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                                <div className='mobile-heading'>
                                <h4 className='mobileaddress-heading'>add new address</h4>
                                <GrClose onClick={this.closeModal}/>
            
                                </div>
                                <form onSubmit={this.handleproSubmit} style={{padding:"0 15px 25px 15px"}}>
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
                        </Modal>``
            
                        {/* Quantity Modal */}
                        <div className='mobile-quantitymodal'>
                            <Modal       
                                show={this.state.isquanopen}
                                dialogClassName="quanmodal"
                                backdropClassName = "customemodalmid"
                                onHide={this.closequanModal}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                >
                                    <div style={{padding:"10px"}}>
                                        <h6>Select Quantity</h6>
                                    {
                                        this.getproductquantity()
                                    }
                                    </div>
                            </Modal>
                        </div>
                        
            
                    </div>
                    </>)}
                    <ToastContainer className="toastclass"/>
                </div>
                </>
            )
        }
    }
}

