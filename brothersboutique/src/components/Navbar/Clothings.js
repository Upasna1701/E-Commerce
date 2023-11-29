import React, { Component ,useEffect,useState} from 'react'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link, NavLink} from 'react-router-dom';
import { FaAngleDown,FaRegHeart,FaHeart } from "react-icons/fa";
import axios from "axios";
import Sideaccordian from './Sideaccordian';
import {Accordion,AccordionSummary,AccordionDetails,Typography} from '@material-ui/core';


export default class Clothings extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            prodname:[],  
            wishlistdata:[],
            sssssssss:"",
            subid:0,
            productimage:[],
            width: window.innerWidth,
            prodcat:[],
            clearclass:"clearfilter",
            // clearfilclass:"clearfilterdis"
        };  
        this.fetchmensdetails();
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
    
    fetchmensdetails=()=>{
        console.log(this.props);
        var catid = this.props.match.params.catid;
        const data = {
            matchclothlist:"yes",
            userid:localStorage.getItem("userid"),
            catid:catid,
        }       
        axios.post('http://localhost/E-Commerce/brothers/clothingpage.php',data)
        .then(res => {
            console.log(res.data);
            this.setState({prodname:res.data.productname})
            this.setState({prodcat:res.data.productcategory})
            this.setState({titlename:res.data.producttitlearr})
            this.setState({productcount:res.data.productcount})
        })  
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
                console.log(res.data);
                this.fetchmensdetails();
            })
            return
        }
        else{
            this.props.history.push('/Login')
            return
        }
    }
   
    productdetails = (pid,pathname) => { 
        this.props.history.push('/p/'+pathname+'/'+pid);
    }

    removefromwishlist=(pid)=> {
        const removewishdata = {
            productids:pid,
            userid:localStorage.getItem("userid"),
            removewishlistdata:"yes",          
        }
        axios .post('http://localhost/E-Commerce/brothers/wishlist.php',removewishdata)
        .then(res => {
            console.log(res.data);
            this.fetchmensdetails();
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
                    <span>₹{Price-(Price * Discount/100)}</span>
                    <s>{Price}</s>
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


    gotocategories=(category,product_name,subcategory_id,product_for_id)=>{
        this.props.history.push("/"+category+"/"+product_name+"/"+subcategory_id+"/"+product_for_id);
    }

    Ssize=(size)=>{
        var catid = this.props.match.params.catid;
        const smallsize={
            smsize:size,
            findsize:"yes",
            catid : catid,
        }
        console.log(smallsize)
        axios .post('http://localhost/E-Commerce/brothers/clothingpage.php',smallsize)
        .then(res => {
            const currentClass = "clearfilterdis";
            this.setState({clearclass: this.state.currentClass});
            this.setState({newsizes:res.data.findsize});
            this.setState({prodname:res.data.productname})
            this.setState({prodcat:res.data.productcategory})
            this.setState({titlename:res.data.producttitlearr})
            this.setState({productcount:res.data.productcount})
        })
    }
    
    discountfilter=(dis)=>{
        var catid = this.props.match.params.catid;
        const disc={
            finddisc:"yes",
            catid : catid,
            dis:dis
        }
        console.log(disc)
        axios .post('http://localhost/E-Commerce/brothers/clothingpage.php',disc)
        .then(res => {
            const currentClass = "clearfilterdis";
            this.setState({clearclass: this.state.currentClass});
            this.setState({prodname:res.data.productname})
            this.setState({titlename:res.data.producttitlearr})
            this.setState({productcount:res.data.productcount})
        })
    }
    
    sortprize=(sp)=>{
        var catid = this.props.match.params.catid;
        const sortp={
            findsort:"yes",
            catid : catid,
            price : sp,
        }
        console.log(sortp)
        axios .post('http://localhost/E-Commerce/brothers/clothingpage.php',sortp)
        .then(res => {
            const currentClass = "clearfilterdis";
            this.setState({clearclass: this.state.currentClass});
            this.setState({prodname:res.data.productname})
            this.setState({titlename:res.data.producttitlearr})
            this.setState({productcount:res.data.productcount})
        })
    }

    ratingfilter=(ra)=>{
        var catid = this.props.match.params.catid;
        const rate={
            findrate:"yes",
            catid : catid,
            rate:ra
        }
        console.log(rate)
        axios .post('http://localhost/E-Commerce/brothers/clothingpage.php',rate)
        .then(res => {
            const currentClass = "clearfilterdis";
            this.setState({clearclass: this.state.currentClass});
            this.setState({prodname:res.data.productname})
            this.setState({titlename:res.data.producttitlearr})
            this.setState({productcount:res.data.productcount})
        })
    }

    clearfilter=()=>{
        
        var currentClass = "clearfilter";
        this.setState({clearclass: this.state.currentClass});
        this.fetchmensdetails();
    }

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (!isMobile) {
        return (    
            <div className='container menscontainer'> 
              <div className='row'>
                  <div className='col-md-12'>
                      <Nav>       
                      <Nav.Link as={Link} to="/" className='clothinglinks' style={{paddingRight:"0"}}>Home&nbsp;&nbsp; /</Nav.Link>
                      <Nav.Link className='clothinglinks'>{this.state.titlename} Clothing</Nav.Link>
                  </Nav> 
                  </div>
              </div>
              <div className='row'>
                  <div className='col-md-12'>
                  <h1 className='menheading'>{this.state.titlename} Clothing<span>({this.state.productcount}) 
                  </span></h1>
                  </div>
              </div>  
              <div  className='container'>
                  <div className='row'>
                      <div className='col-md-3'>    
                          <div className='container-fluid' style={{padding:"0"}}>
                              <div className='row'style={{marginTop:"35px"}}>
                                    <div className='col-md-12'>
                                        <div className='fil'>
                                            <p className='ftag'>FILTERS</p>  
                                            <p className={this.state.clearclass ? "clearfilter" : "clearfilterdis"} onClick={()=>this.clearfilter()}>Clear All</p>  
                                            {/* <p className={this.state.clearclass}>Clear All</p>   */}
                                        </div>
                                        <div>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<FaAngleDown/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                >
                                                <Typography>Category</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                <Typography>
                                                    <ul className='acc-list'>
                                                    {
                                                        this.state.prodcat.map((item,index)=>{
                                                        return(
                                                            <li key={index} onClick={()=>this.gotocategories(item.category,item.product_name,item.subcategory_id,item.product_for_id)}>{item.product_name}</li>
                                                            )
                                                        })
                                                    }
                                                    </ul>
                                                </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<FaAngleDown />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                >
                                                <Typography>Sizes</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                <Typography>
                                                    <ul className='acc-list'>
                                                        <li onClick={()=>this.Ssize('XS')}>XS</li>
                                                        <li onClick={()=>this.Ssize('S')}>S</li>
                                                        <li onClick={()=>this.Ssize('M')}>M</li>
                                                        <li onClick={()=>this.Ssize('L')}>L</li>
                                                        <li onClick={()=>this.Ssize('XL')}>XL</li>
                                                        <li onClick={()=>this.Ssize('XXL')}>XXL</li>
                                                    </ul>
                                                </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<FaAngleDown />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                >
                                                <Typography>Rating</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                <Typography>
                                                    <ul className='acc-list'>
                                                        <li onClick={()=>this.ratingfilter('4.5')}>4.5 & Above</li>
                                                        <li onClick={()=>this.ratingfilter('4')}>4 & Above</li>
                                                        <li onClick={()=>this.ratingfilter('3')}>3 & Above</li>
                                                        <li onClick={()=>this.ratingfilter('2')}>2 & Above</li>
                                                    </ul>
                                                </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<FaAngleDown />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                >
                                                <Typography>Discount</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                <Typography>
                                                    <ul className='acc-list'>
                                                        <li onClick={()=>this.discountfilter('10')}>10% or More</li>
                                                        <li onClick={()=>this.discountfilter('20')}>20% or More</li>
                                                        <li onClick={()=>this.discountfilter('30')}>30% or More</li>
                                                        <li onClick={()=>this.discountfilter('40')}>40% or More</li>
                                                        <li onClick={()=>this.discountfilter('50')}>50% or More</li>
                                                    </ul>
                                                </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<FaAngleDown />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                >
                                                <Typography>Sort By</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                <Typography>
                                                    <ul className='acc-list'>
                                                        <li onClick={()=>this.sortprize("desc")}>Price High-to-low</li>
                                                        <li onClick={()=>this.sortprize("asc")}>Price low-to-High</li>
                                                    </ul>
                                                </Typography>
                                                </AccordionDetails>
                                            </Accordion>               
                                        </div> 
                                      {/* <Sideaccordian/> */}
                                    </div>
                              </div>      
                          </div>
                      </div>
                      <div className='col-md-9 clothcloth' style={{marginTop:"65px"}}>
                          <div className='container-fluid'>
                              <div className='row'>
                              {
                                  this.state.prodname.map((item,index)=>{
                                  return(
                                      <div className='col-md-4 imgcard' key={index} >
                                          <div className='imgheart'  onClick={()=> this.addtowishlist(item.pid,item.Product_Name)}>
                                              {item.wishlist ? (
                                              <>
                                                  <FaHeart style={{color:"red"}} onClick={()=> this.removefromwishlist(item.pid)}/>
                                              </>
                                              ) :
                                              (
                                              <>
                                                  <FaRegHeart />  
                                              </>
                                              )
                                              }
                                          </div>
                                          <div className='card clothdetail' onClick={()=> this.productdetails(item.pid,item.pathname)}>
                                              <img className="mensclothimg" src={item.proimglink}/>
                                              <p>{item.Product_Name}<br/>
                                              {
                                                  this.pricefun(item.productdetails.Price,item.productdetails.Discount,item.productdetails.offerdate)
                                              }
                                              </p>                                        
                                              <p style={{background:"#f1ecec",marginBottom:"0"}}>₹ 250 for triBe members</p>
                                          </div>
                                      </div>
                                      )
                                  })
                              }
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>   
              {/* <Footer/>    */}
            </div>   
        )
    }
    else{
        return(
            <>
            <div className='container'> 
              <div className='row'>
                  <div className='col-md-12'>
                      <Nav>       
                      <Nav.Link as={Link} to="/" className='mobile-clothinglinks' style={{paddingRight:"0"}}>Home&nbsp;&nbsp; /</Nav.Link>
                      <Nav.Link className='mobile-clothinglinks'>{this.state.titlename} Clothing</Nav.Link>
                  </Nav> 
                  </div>
              </div>
              <div className='row'>
                  <div className='col-md-12'>
                  <h1 className='mobile-menheading'>{this.state.titlename} Clothing<span>({this.state.productcount}) 
                  </span></h1>
                  </div>
              </div>  
              <div  className='container'>
                  <div className='row mobile-row'>
                    {
                        this.state.prodname.map((item,index)=>{
                        return(
                            <div className='col-6 mobile-imgcard' key={index} >
                                <div className='imgheart'  onClick={()=> this.addtowishlist(item.pid,item.Product_Name)}>
                                    {item.wishlist ? (
                                    <>
                                        <FaHeart style={{color:"red"}} onClick={()=> this.removefromwishlist(item.pid)}/>
                                    </>
                                    ) :
                                    (
                                    <>
                                        <FaRegHeart />  
                                    </>
                                    )
                                    }
                                </div>
                                <div className='card mobile-clothdetail' onClick={()=> this.productdetails(item.pid,item.pathname)}>
                                    <img className="mobile-mensclothimg" src={item.proimglink}/>
                                    <p>{item.Product_Name}<br/>
                                    {
                                        this.pricefun(item.productdetails.Price,item.productdetails.Discount,item.productdetails.offerdate)
                                    }
                                    </p>                                        
                                    <p style={{background:"#f1ecec",marginBottom:"0"}}>₹ 250 for triBe members</p>
                                </div>
                            </div>
                            )
                        })
                    }
                  </div>   
              </div>   
              {/* <Footer/>    */}
            </div> 
            </>
        )
    }
    
  }
}
