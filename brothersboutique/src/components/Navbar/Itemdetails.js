import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link, NavLink} from 'react-router-dom';
import {FaRegHeart,FaHeart,FaRegThumbsUp,FaStar,FaRegStar } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from "react-elastic-carousel";
import Progress from 'react-progressbar';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import star1 from '../../images/1star.png'
import star2 from '../../images/2star.png'
import star3 from '../../images/3star.png'
import star4 from '../../images/4star.png'
import star5 from '../../images/5star.png'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import bew1 from '../../images/bew.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation,Pagination,Autoplay,Virtual} from "swiper/core";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

export default class Itemdetails extends Component {
    constructor(props){
        super(props);
        this.state={
            prodname:[],
            sizearrr:[],
            Price:"",
            offerdate:"",
            Discount:"",
            prsize:"",  
            productimage:[],
            carouselimg:null,   
            itemwishicon:"",
            openrating:false,
            openreview:false,
            starselected:null,
            gotreview:[],
            findprcatsub:[],
            quansizetotal:[],
            rewstar:[
                {icon:<FaRegStar/>,fillicon:<img src={star1} style={{height:"42px"}}/>,previcons:<FaStar />},
                {icon:<FaRegStar/>,fillicon:<img src={star2} style={{height:"42px"}}/>,previcons:<FaStar />},
                {icon:<FaRegStar/>,fillicon:<img src={star3} style={{height:"42px"}}/>,previcons:<FaStar />},
                {icon:<FaRegStar/>,fillicon:<img src={star4} style={{height:"42px"}}/>,previcons:<FaStar />},
                {icon:<FaRegStar/>,fillicon:<img src={star5} style={{height:"42px"}}/>,previcons:<FaStar />},
            ],
            images:[
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
                {imgs:bew1},
            ],
            breakPoints:[
                { width: 1, itemsToShow: 4 },
            ],
            findrecactivity:[]
        }
        this.fetchitemdetails();
        this.fetchwishicon();
        this.fetchreview();
        this.findrecact();
        this.review=React.createRef();
    }
    findrecact=()=>{
        const data={
            userid : localStorage.getItem("userid"),
            recact:"yes",
        }
        axios.post('http://localhost/E-Commerce/brothers/product.php',data)
        .then(res => {
            console.log(res.data.findrecactivity)
            this.setState({findrecactivity:res.data.findrecactivity})
        })
    }
    fetchreview=()=>{
        const data={
            prstarid: this.props.match.params.prid,
            userid : localStorage.getItem("userid"),
            fetchreviewdata:"yes",
        }
        axios.post('http://localhost/E-Commerce/brothers/review.php',data)
        .then(res => {
            this.setState({gotreview: res.data.findreview});
            this.setState({ratingcount: res.data.ratingcount});
            this.setState({reviewcount: res.data.reviewcount});
            this.setState({averagerating: res.data.averagerating});
            var roundavg=parseFloat(this.state.averagerating).toFixed(1);
            this.setState({finalavg: roundavg});
            this.setState({fivereview: res.data.fivereview});
            this.setState({fourreview: res.data.fourreview});
            this.setState({threereview: res.data.threereview});
            this.setState({tworeview: res.data.tworeview});
            this.setState({onereview: res.data.onereview});
        })
    }

    fetchwishicon=()=>{
        
        const data={
            userid:localStorage.getItem("userid"),
            productid : this.props.match.params.prid,
            checkitemwish:"yes",
        }
        axios.post('http://localhost/E-Commerce/brothers/product.php',data)
        .then(res => {
            this.setState({itemwishicon:res.data.itemmatchwishlist.wishlist});
        })
    }

    fetchitemdetails=()=>{
        const data = {
            itemdetail:"yes",
            productid : this.props.match.params.prid,
            userid:localStorage.getItem("userid"),
        }
        axios.post('http://localhost/E-Commerce/brothers/product.php',data).then(res => {
            console.log(res.data);               
            this.setState({prodname:res.data.findprdetail,});
            this.setState({productimage:res.data.productimage,});
            this.setState({sizearrr:res.data.sizearr});
            this.setState({Price:this.state.prodname.productdetails["Price"]});
            this.setState({offerdate:this.state.prodname.productdetails["offerdate"]});
            this.setState({Discount:this.state.prodname.productdetails["Discount"]});
            this.setState({Productdesc:this.state.prodname.productdetails["Product_desc"]});
            this.setState({findprcatsub:res.data.findprcatsub})
            this.setState({quansizetotal:res.data.quansizetotal})
        }) 
    }

    selectedsize=(sizeid,pid,selsize,psize)=>{
        var qwe = selsize.split("_");
        var parsels = document.getElementsByClassName("backgreen");;
        for(var i=0;i<parsels.length;i++){ parsels[i].classList = "backwhite"; }
        if(qwe[1] == psize) {
            var sels = document.getElementById(selsize);
            sels.classList = "backgreen";
            this.setState({prsize:sizeid});
        }    
    }

    addtocart=(pid,Product_Name)=> {
        var aa = localStorage.getItem('token');
        if(aa == "loggedIn"){
            const cartdata = {
                addprtocart:"yes",
                productid:pid,
                productname:Product_Name,
                userid:localStorage.getItem("userid"),
                useremail:localStorage.getItem("useremail"),
                prsize:this.state.prsize,
            }
            if(this.state.prsize){
                axios.post('http://localhost/E-Commerce/brothers/cart.php',cartdata).then(res => {
                    if(res.data.savecart>0){
                        toast("Item Added!");
                    }
                    else{
                        toast(res.data.savecart);
                    }
                })
            }
            else{
                toast("Size not Selected!");
            }
        }
        else{
            this.props.history.push('/Login')
            return
        }
    }

       
    addtowishlist=(pid,Product_Name)=> {
        var aa = localStorage.getItem('token');
        if(aa == "loggedIn"){
            const wishdata = {
                addwishlist:"yes", 
                productid:pid,
                productname:Product_Name,
                userid:localStorage.getItem("userid"),
                useremail:localStorage.getItem("useremail"),
            }
            axios .post('http://localhost/E-Commerce/brothers/wishlist.php',wishdata)
            .then(res => {
                this.fetchwishicon();
            })
            return
        }
        else{
            this.props.history.push('/Login')
            return
        }
    }

    removefromwishlist=(pid)=> {
        const removewishdata = {
            productids:pid,
            userid:localStorage.getItem("userid"),
            removewishlistdata:"yes",          
        }
        axios .post('http://localhost/E-Commerce/brothers/wishlist.php',removewishdata)
        .then(res => {
            this.fetchwishicon();
        })
    }

    pricefun = (Price,Discount,offerdate) => {
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
                    <p className='price'>₹{Price-(Price * Discount/100)}
                    <s> ₹{Price}</s> 
                    <span>({Discount}% OFF)</span></p>
                </>
            )
        }
        else {
            return(
                <>
                    <span className='price' style={{marginLeft:"0"}}>₹{Price}</span><br/>
                </>
            )
        }

    }
    userrateing = () => {
        if(this.state.gotreview.length > 0){
            Swal.fire({
                title:"You have already reviewed the product",
                timer:1500,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
            })
        }
        else{
            this.setState({ openrating: true });
        }
    }
    closeuserrateing = () => {this.setState({ openrating: false })};

    takestar=(i,pid)=>{
        this.setState({starselected:i})
    }

    userreview=(i,pid)=>{
        const userrew={
            review:this.review.value,
            reviewdata:"yes",
            prstar:i,
            prstarid:pid,
            userid:localStorage.getItem("userid"),
        }
        axios .post('http://localhost/E-Commerce/brothers/review.php',userrew)
        .then(res => {
            this.setState({alert: submitreview()});
            this.fetchreview()         
        })

        const submitreview = () => (
            Swal.fire({
                title:"Thanks for Reviewing",
                timer:1500,
                icon:"success",
                showConfirmButton:false
            }).then(()=>{
                this.setState({ openrating: false })
            })
        ); 
    }
    viewreviewmodal=()=>{this.setState({ openreview: true })}
    closeuserreview = () => {this.setState({ openreview: false })};

    gotocatpage=(urlarr)=>{
        this.props.history.push("/"+urlarr.category+"/"+urlarr.product_for_id)
    }
    
    gotosubcatpage=(urlarr)=>{
        this.props.history.push("/"+urlarr.category+"/"+urlarr.product_name+"/"+urlarr.subcategory_id+"/"+urlarr.product_for_id)
    }


    recview = (pid,pathname) => {    
        this.props.history.push('/p/'+pathname+'/'+pid);
    }

  render() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <Nav>       
                        <Nav.Link as={Link} to="/" className='clothinglinks' style={{paddingRight:"0"}}>Home&nbsp;&nbsp; /</Nav.Link>
                        <Nav.Link onClick={()=>this.gotocatpage(this.state.findprcatsub)} className='clothinglinks' style={{paddingRight:"0"}}>{this.state.findprcatsub.category} &nbsp;&nbsp; /</Nav.Link>
                        <Nav.Link onClick={()=>this.gotosubcatpage(this.state.findprcatsub)} className='clothinglinks' style={{paddingRight:"0"}}>{this.state.findprcatsub.product_name} &nbsp;&nbsp; /</Nav.Link>
                        <Nav.Link className='clothinglinks' style={{paddingRight:"0"}}>{this.state.findprcatsub.pro_name}</Nav.Link>
                    </Nav> 
                </div>
            </div> 
            {
                <div className='row' >
                    <div className='col-md-6 webdiv' style={{position:"relative"}}>
                        <ImageGallery items={
                            this.state.productimage.map(itemss => ({ 
                                original: itemss.imagelink, thumbnail: itemss.imagelink 
                            }))
                        }
                        />
                    </div>

                    <div className='col-md-6 mobdiv' style={{position:"relative"}}>
                        <Carousel>
                            {this.state.productimage.map((itemss,index) => {
                                    return(
                                        <img key={index} src={itemss.imagelink} className="productitemmainimg"/>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    

                    <div className='col-md-6 sidecol'>
                        <h5>BROTHERS BOUTIQUE</h5>
                        <h6 className='productname'>{this.state.prodname.Product_Name}</h6>
                        {
                            this.pricefun(this.state.Price,this.state.Discount,this.state.offerdate)
                        }

                        <span style={{color:"grey",marginLeft:"0",}}>Inclusive of taxes</span>
                        <hr className='productborder'/>
                        <p style={{fontSize:"16px"}}> TriBe members get an extra discount of<span style={{fontWeight: "700",marginLeft:"0"}}> ₹60 </span>and FREE shipping.<span style={{color:"#0dbb93",fontWeight: "700"}}><br/>Learn more</span></p>
                        <hr className='productborder'/>
                        <div className='productsize'>
                        <h6 style={{fontWeight: "700"}}>SELECT SIZE</h6>
                        <h6 className='sizechart'>Size Guide</h6>
                        </div>
                        <div className='sizesdata' id="sizesdata">
                            {
                                this.state.sizearrr.map((itemss,index)=>{
                                    if(itemss.quantity == 0)
                                    {
                                        return(
                                            <p className="emptysize" key={index}>{itemss.product_size}</p>
                                        )
                                    }
                                    if(itemss.quantity > 0)
                                    {
                                        var selsize = "selsize_"+itemss.product_size;
                                        return(
                                            <p className="backwhite" id={selsize} key={index} onClick={()=>this.selectedsize(itemss.size_id,this.state.prodname.pid,selsize,itemss.product_size)}>{itemss.product_size}</p>
                                        )
                                    }
                                })
                            }
                        </div>
                        {
                            (this.state.quansizetotal<=0)?
                            <div>
                                <h6 className='reviewhead' style={{color:"red"}}>Product sold out</h6>
                            </div> 
                            :
                            <></>
                        }
                        {
                            (this.state.quansizetotal<10 && this.state.quansizetotal>0)?
                            <div>
                                <h6 className='reviewhead' style={{color:"red"}}>Hurry! only few left</h6>
                            </div> 
                            :
                            <></>
                        }
                       
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className='producticon' onClick={()=> this.addtowishlist(this.state.prodname.pid,this.state.prodname.Product_Name)}>
                                {this.state.itemwishicon ? (
                                    <>
                                        <FaHeart className='navicons' style={{color:"red"}} onClick={()=> this.removefromwishlist(this.state.prodname.pid)}/>
                                    </>
                                    ) :
                                    (
                                    <>
                                        <FaRegHeart className='navicons'/>  
                                    </>
                                    )
                                } 
                            </div>
                            <div style={{width:"100%",marginLeft:"10px"}}><button className="btn addto" onClick={()=> this.addtocart(this.state.prodname.pid,this.state.prodname.Product_Name)}>add to bag</button></div>
                        </div>
                        <hr className='productborder'/>   
                        <div>
                            <h6 className='reviewhead'>Product Description</h6>
                            <p>{this.state.Productdesc}</p>
                        </div>                  
                        <div>
                            <h6 className='reviewhead'>Product Review</h6>
                            {
                                this.state.gotreview.length == 0 ?(
                                <>
                                    <div className='ratereview'>
                                        <div className='rate'>
                                            <p className='noreview'>Be the first one to review</p>
                                        </div>
                                        <p className='ratebtn' onClick={()=>this.userrateing()}>Rate</p>
                                    </div>
                                </>):
                                (<>
                                    <div className='ratereview'>
                                        <div className='rate'>
                                            <h4>{this.state.finalavg}</h4>
                                            <span className='rantspan'>Based on <br/>{this.state.ratingcount} ratings and {this.state.reviewcount} reviews</span>
                                        </div>
                                        <p className='ratebtn' onClick={()=>this.userrateing()}>Rate</p>
                                    </div>
                                    {/* <p className='my-3'><FaRegThumbsUp/> <b>87%</b> of customers recommemded for this product</p> */}
                                    <div className='rateprogressbar'>
                                        <div className='prgbar'>
                                            <p>5 <FaStar/></p> 
                                            <div style={{width:"80%",margin:"auto"}}><Progress completed={(this.state.fivereview / this.state.ratingcount) * 100} className="prgclr"/></div>
                                            <p>{this.state.fivereview}</p> 
                                        </div>
                                        <div className='prgbar'>
                                            <p>4 <FaStar/></p> 
                                            <div style={{width:"80%",margin:"auto"}}><Progress completed={(this.state.fourreview / this.state.ratingcount) * 100} className="prgclr"/></div>
                                            <p>{this.state.fourreview}</p> 
                                        </div>
                                        <div className='prgbar'>
                                            <p>3 <FaStar/></p> 
                                            <div style={{width:"80%",margin:"auto"}}><Progress completed={(this.state.threereview / this.state.ratingcount) * 100} className="prgclr"/></div>
                                            <p>{this.state.threereview}</p> 
                                        </div>
                                        <div className='prgbar'>
                                            <p>2 <FaStar/></p> 
                                            <div style={{width:"80%",margin:"auto"}}><Progress completed={(this.state.tworeview / this.state.ratingcount) * 100} className="prgclr"/></div>
                                            <p>{this.state.tworeview}</p> 
                                        </div>
                                        <div className='prgbar'>
                                            <p>1 <FaStar/></p> 
                                            <div style={{width:"80%",margin:"auto"}}><Progress completed={(this.state.onereview / this.state.ratingcount) * 100} className="prgclr" /></div>
                                            <p>{this.state.onereview}</p> 
                                        </div>
                                    </div>
                                    <h6 className='custhead mt-4'>Here what our customers say</h6>
                                    {
                                        this.state.gotreview.map((item,index)=>{
                                            var nameuser = item.name;
                                            var usernamee = nameuser.split(" ");
                                            if(index < 2){
                                                return(
                                                    <>
                                                        <div key={index} className='userrating my-3'>
                                                            <div className='stars'>
                                                                <div>
                                                                {
                                                                    this.state.rewstar.map((itemss,indexss)=>{
                                                                    var userstar=item.product_star;
                                                                        if(userstar <= indexss){
                                                                            return(
                                                                                <>
                                                                                    <span className="realstar" key={indexss}> {itemss.icon} </span>
                                                                                </>
                                                                            )
                                                                        } 
                                                                        else{
                                                                            return(
                                                                                <>
                                                                                    <span className="realstar" key={indexss}> {itemss.previcons}</span>
                                                                                </>
                                                                            )
                                                                        } 

                                                                    })
                                                                } 
                                                                <span className='verified'>Verified purchaser</span>
                                                                </div>
                                                                <div><FaRegThumbsUp/></div>
                                                            </div>
                                                            <div className='review'>
                                                                <p>{item.product_review}</p>
                                                            </div>
                                                            <div className='rrname'>
                                                                <p>{usernamee[0]}</p>
                                                                <p>{item.formateddate}</p>
                                                            </div>
                                                        </div>
                                                        <hr className='productborder'/> 
                                                    </>
                                                )
                                            }
                                            
                                        })
                                    }
                                    <div className='viewrrbtn'>
                                        <p onClick={()=>this.viewreviewmodal()}>View all reviews</p>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                </div>    

                
            }   

                <div className='row my-5 recentmob'>
                    <h5 style={{paddingLeft: "87px"}}>Recently Viewed</h5>
                    <Swiper
                        id="swiper"
                        virtual
                        slidesPerView={4}
                        spaceBetween={30}
                        navigation
                        pagination
                        >
                        {
                            this.state.findrecactivity.map((itemss,index) => {
                            return(
                                <SwiperSlide>
                                    <img key={index} src={itemss.proimglink} className="recentlyviewed" onClick={()=> this.recview(itemss.pid,itemss.pathname)}/>
                                    <p>{itemss.proprice}</p>
                                </SwiperSlide>
                            )
                            })
                        }
                    </Swiper>
                </div>
            <ToastContainer className="toastclass"/>

            {/* rating modal */}
                <div style={{padding:"10px 20px"}}>
                    <Modal 
                        show={this.state.openrating}
                        dialogClassName="ratingmodal" 
                        onHide={this.closeuserrateing}
                        centered                   
                        >
                            <div className='mainrew'>
                                <div className='modalreview' >
                                    <div>
                                        <img src={this.state.prodname.promodalimglink} className="productmodalimg"/>
                                    </div>
                                    <div style={{padding:" 0 10px"}}>
                                        <h6 className='brand'>Brothers Boutique</h6>
                                        <h6 style={{marginBottom:"0"}}>{this.state.prodname.Product_Name}</h6>
                                        <div className='starclass'>
                                            {
                                                this.state.rewstar.map((item,index)=>{
                                                    var istar = index + 1;
                                                    if(this.state.starselected == istar){
                                                        return(
                                                            <>
                                                                <span key={index} onClick={()=>this.takestar(istar,this.state.prodname.pid)}>{item.fillicon}
                                                                </span>
                                                            </>
                                                        )
                                                    }
                                                    else {
                                                        if(this.state.starselected < istar){
                                                            return(
                                                                <>
                                                                    <span key={index} onClick={()=>this.takestar(istar,this.state.prodname.pid)}>{item.icon}
                                                                    </span>
                                                                </>
                                                            )
                                                        }
                                                        else {
                                                            return(
                                                                <>
                                                                    <span style={{color:"#fed13e"}}key={index} onClick={()=>this.takestar(istar,this.state.prodname.pid)}>{item.previcons}
                                                                    </span>
                                                                </>
                                                            )
                                                        }
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="reviewbox">
                                    <h6>Write a review</h6>
                                    <textarea  rows='4' style={{width:"88%"}} ref={(input)=>{this.review=input}}></textarea>
                                    <button className="btn subbtn" onClick={()=>this.userreview(this.state.starselected,this.state.prodname.pid)}>Send</button>
                                </div>
                            </div>
                    </Modal>
                </div>   
            {/* review modal */}

            <div>
                <Modal 
                    show={this.state.openreview}
                    dialogClassName="ratingmodal" 
                    onHide={this.closeuserreview}
                    centered                   
                    >
                    <div style={{padding:"10px 20px"}}>
                        {
                            this.state.gotreview.map((item,index)=>{
                                var nameuser = item.name;
                                var usernamee = nameuser.split(" ");
                                return(
                                    <>
                                        <div key={index} className='userrating my-3'>
                                            <div className='stars'>
                                                <div>
                                                {
                                                    this.state.rewstar.map((itemss,indexss)=>{
                                                    var userstar=item.product_star;
                                                        if(userstar <= indexss){
                                                            return(
                                                                <>
                                                                    <span className="realstar" key={indexss}> {itemss.icon} </span>
                                                                </>
                                                            )
                                                        } 
                                                        else{
                                                            return(
                                                                <>
                                                                    <span className="realstar" key={indexss}> {itemss.previcons}</span>
                                                                </>
                                                            )
                                                        } 

                                                    })
                                                } 
                                                <span className='verified'>Verified purchaser</span>
                                                </div>
                                                <div><FaRegThumbsUp/></div>
                                            </div>
                                            <div className='review'>
                                                <p>{item.product_review}</p>
                                            </div>
                                            <div className='rrname'>
                                                <p>{usernamee[0]}</p>
                                                <p>{item.formateddate}</p>
                                            </div>
                                        </div>
                                        <hr className='productborder'/> 
                                    </>
                                )             
                            })
                        }
                    </div>
                    
                </Modal>
            </div>  

      </div>
    )
  }
}