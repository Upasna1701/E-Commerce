import React, { Component } from 'react';
import { FaFacebook,FaInstagram,FaTwitter,FaSnapchatGhost,FaPinterestP,FaApple } from "react-icons/fa";
import './navElements.css';

export default class Footer extends Component {
  render() {
    return (
        <div className='homefooter'>
        <div className='container-fluid'>
            <div className='container' style={{paddingTop:"95px"}}>
                <div className='row'>
                    <h5 style={{margin:"10px 80px"}}>Brothers Boutique</h5>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>CUSTOMER SERVICE</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                        </ul>                 
                    </div>
                    <div className='col-md-3 footcol'>
                        <ul>
                        <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>About Us</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                        </ul>                
                    </div>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>CONNECT WITH US</li>
                            <li><FaFacebook style={{marginRight:"10px"}}/>Contact Us</li>
                            <li><FaInstagram style={{marginRight:"10px"}}/>Track Order</li>
                            <li><FaSnapchatGhost/>
                            <FaPinterestP className='icon'/>
                            <FaApple className='icon'/>
                            <FaTwitter className='icon'/></li>
                        </ul>              
                    </div>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>KEEP UP TO DATE</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                        </ul>                   
                    </div>
                    <div className='row'>
                       <div className='col-md-3 footcol'>
                       <p style={{marginBottom:"0"}}>15 days return policy</p>
                            <p>Cash on Delivery<span style={{color:"#000"}}>aaa</span></p>
                       </div>
                       <div className='col-md-3 footcol'>
                       <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>Download the app</p>
                       </div>
                       <div className='col-md-3 footcol'>
                       <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>100% secure payment</p>
                       </div>
                       <div className='col-md-3 footcol'></div> 
                   </div>                   
                </div>
                <hr className='footborder'/>
                <div className='row' style={{paddingTop:"15px"}}>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Mens clothing</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                        </ul>                   
                    </div>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Womens clothing</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                            <li>We're Hiring</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Blog</li>
                        </ul>                   
                    </div>
                    <div className='col-md-3 footcol'>
                        <ul>
                            <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Kids clothing</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                            <li>Contact Us</li>
                            <li>Track Order</li>
                            <li>Return Order</li>
                            <li>Cancel Order</li>
                        </ul>                   
                    </div>
                    <div className='col-md-3 footcollast'>
                        <ul>
                            <li>FANBOOK</li>
                            <li>OFFERS</li>
                            <li>SITEMAP</li>
                        </ul>                   
                    </div>
                </div>
                
            </div>
           
        </div>
        </div>
    )
  }
}
