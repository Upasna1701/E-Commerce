import React, { Component } from 'react';
import menbew3 from '../../images/bew3.png';
import emptywish from '../../images/emptycart.jpg';
import axios from "axios";
import { GrClose } from "react-icons/gr";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';

export default class Wishlist extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            wishlistdata:[],
            count:0,
            sizearrr:[],
            width: window.innerWidth,
        };
         
        this.fetchwishdata();
        
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
    fetchwishdata=()=>{
        const data = {
            user_id: localStorage.getItem('userid'),
            fetchwishlist:"yes"
        }   
        axios.post('http://localhost/E-Commerce/brothers/wishlist.php',data).then(res => {
            console.log(res.data);    
            this.setState({wishlistdata:res.data.productwishname});
            this.setState({wishlistimgdata:res.data.proimgwish});
            this.setState({sizearrr:res.data.sizearr});
        })
    }

    removefromwishlist=(wishlist_id)=> {
        const removewishdata = {
            wishlistid:wishlist_id,
            userid:localStorage.getItem("userid"),
            removewishlist:"yes",           
        }
        axios .post('http://localhost/E-Commerce/brothers/wishlist.php',removewishdata).then(res => {
            console.log(res.data);
            this.fetchwishdata();
        })
    }

    movetocart=(wid,Product,movebtn,btnsize)=>{
        var movebtnval=movebtn.split("_");
        for(var i=0;i<this.state.wishlistdata.length;i++){
            let tempsbtn = "movebtn_"+this.state.wishlistdata[i]['wishlist_id'];
            let tempmbtn = "btnsize_"+this.state.wishlistdata[i]['wishlist_id'];
            document.getElementById(tempsbtn).classList="bagbtn";
            document.getElementById(tempmbtn).classList="sizebtn";
        }
        if(wid == movebtnval[1] ){
            document.getElementById(movebtn).classList="addbtncart";
            document.getElementById(btnsize).classList="sizebtndropdown";
        }
    }

    getproductsize = (sa,pid,Product) =>{
        console.log(sa);
        return(
        <>
            {
                sa.map((itemss,index)=>{
                    if(itemss.quantity != 0)
                    {
                        return (
                            <NavDropdown.Item className='dropmenu' key={index} onClick={ () => this.prohandlechange(itemss.size_id,pid,Product)} value={itemss.size_id}>{itemss.product_size}</NavDropdown.Item>
                        )
                    }
                })
            }
        </>
        )
    }

    prohandlechange=(size,pid,Product)=>{
        const cartdata = {
            addprtocart:"yes",
            productid:pid,
            productname:Product,
            userid:localStorage.getItem("userid"),
            useremail:localStorage.getItem("useremail"),
            prsize:size,
        }
        console.log(cartdata);
        axios .post('http://localhost/E-Commerce/brothers/cart.php',cartdata)
        .then(res => {
            console.log(res.data);
            this.fetchwishdata();
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
    productdetails = (pid,pathname) => {
        this.props.history.push('/p/'+pathname+'/'+pid);
    }

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (!isMobile) {
        return (    
            <div className='container'>    
              {this.state.wishlistdata.length==0 ? (
              <>
                  <div className='container cart-container'>
                  <div className='row emptycartdetails'>
                      <div className='col-md-12'>
                          <img src={emptywish} className="emptyimg"/>
                          <h3 className='nothing'>Your Wishlist is Empty !</h3>
                          <button type="button" className="btn continueshopping">Continue Shopping</button>
                      </div>
                  </div>
                  </div>
              </>)
              :
              (<>
                  <div className='row'>
                      <div className='col-md-12'>
                          <h4 className='wish'>WISHLIST</h4>
                      </div>
                      <div className='row'>
                      {
                          this.state.wishlistdata.map((item,index)=>{
                              var pid = item.pid;
                              var movebtn = "movebtn_"+item.wishlist_id;
                              var btnsize = "btnsize_"+item.wishlist_id;
                          return(
                          <div className='col-md-3 imgcard' key={index} style={{marginTop:"10px"}}>
                              <div className='card clothdetail'>
                                  <div className='imgheart' onClick={()=> this.removefromwishlist(item.wishlist_id)}><GrClose/></div>
                                  <div onClick={()=> this.productdetails(item.pid,item.pathname)}>
                                      <img  className="wishimg" src={item.proimgwish}/>
                                      <p>{item.Product}<br/>
                                          {
                                              this.pricefun(item.productwishdetails.Price,item.productwishdetails.Discount,item.productwishdetails.offerdate)
                                          }
                                      </p>
                                  </div>
                              </div>
                              <div >
                                  <button type="button" id={movebtn} className="bagbtn" onClick={()=>this.movetocart(item.wishlist_id,item.Product,movebtn,btnsize)}>Move to bag</button>
                                  <button type="button" id={btnsize} className="sizebtn">
                                      <NavDropdown id="qwertyu" title="Select Size">                    
                                      {
                                          this.getproductsize(item.sizewisharr,item.pid,item.Product)
                                      }
                                      </NavDropdown> 
                                  </button>
                              </div>
                          </div>
                          )
                      })              
                  }
                      </div>
                  </div>
              </>)}
            </div>
          )
    }
    else{
        return(
            <>
                <div className='container'>    
              {this.state.wishlistdata.length==0 ? (
              <>
                  <div className='container cart-container'>
                  <div className='row emptycartdetails'>
                      <div className='col-md-12'>
                          <img src={emptywish} className="emptyimg"/>
                          <h3 className='nothing'>Your Wishlist is Empty !</h3>
                          <button type="button" className="btn continueshopping">Continue Shopping</button>
                      </div>
                  </div>
                  </div>
              </>)
              :
              (<>
                  <div className='row'>
                      <div className='col-md-12'>
                          <h4 className='wish'>WISHLIST</h4>
                      </div>
                      <div className='row'>
                        {
                          this.state.wishlistdata.map((item,index)=>{
                                var pid = item.pid;
                                var movebtn = "movebtn_"+item.wishlist_id;
                                var btnsize = "btnsize_"+item.wishlist_id;
                                return(
                                <div className='col-6 mobile-imgcard' key={index} style={{marginTop:"10px"}}>
                                    <div className='card mobile-clothdetail'>
                                        <div className='imgheart' onClick={()=> this.removefromwishlist(item.wishlist_id)}><GrClose/></div>
                                        <div onClick={()=> this.productdetails(item.pid,item.pathname)}>
                                            <img className="mobile-wishimg" src={item.proimgwish}/>
                                            <p>{item.Product}<br/>
                                                {
                                                    this.pricefun(item.productwishdetails.Price,item.productwishdetails.Discount,item.productwishdetails.offerdate)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" id={movebtn} className="bagbtn" onClick={()=>this.movetocart(item.wishlist_id,item.Product,movebtn,btnsize)}>Move to bag</button>
                                        <button type="button" id={btnsize} className="sizebtn">
                                            <NavDropdown id="qwertyu" title="Select Size">                    
                                            {
                                                this.getproductsize(item.sizewisharr,item.pid,item.Product)
                                            }
                                            </NavDropdown> 
                                        </button>
                                    </div>
                                </div>
                                )
                            })              
                        }
                      </div>
                  </div>
              </>)}
            </div>
            </>
        )
    }
  }
}
