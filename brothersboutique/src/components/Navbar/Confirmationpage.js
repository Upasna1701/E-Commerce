import React, { Component } from 'react'
import { GrDeliver } from "react-icons/gr";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";



export default class Confirmationpage extends Component {
    constructor(props){
        super(props);
        this.state={
            findconorder:[],
            findconfirmusername:"",
            findaddress:[],
            steps:[{status: "Confirmed"},{status: "Preparing your Order"},{status: "Shipped"},{status: "OutForDelivery"},{status: "Delivered"}],
            transfer:{status: "Shipped" }
        };
        this.fetchconfirmeddetail()
        
    }
        
    getStepPosition = (transferStatus) => {
        return this.state.steps.findIndex(({ status }) => status === transferStatus);
    };

    fetchconfirmeddetail=()=>{
        const data={
            user_id: localStorage.getItem('userid'),
            confirmid : this.props.location.state.cid,
            findconfirm:"yes"
        }
        axios .post('http://localhost/E-Commerce/brothers/confirmorder.php',data)
        .then(res => {
            console.log(res.data);
            this.setState({findconorder:res.data.findconorder})
            this.setState({findaddress:res.data.findaddress})
            this.setState({findconfirmusername:res.data.findconfirmusername})
        })
    }

    gotoorder=()=>{
        this.props.history.push('/Userorder')
    }

    productdetails = (pid,pathname) => {
        this.props.history.push('/p/'+pathname+'/'+pid);
    }
  render() {
    return (
      <>
        <div className='container cart-container'>
        <div className='container'>
            <div className='row mx-md-2 mt-3'>
                <div className='col-md-12'>
                    <p className='accacc' onClick={()=>this.gotoorder()}><AiOutlineLeft/>Back to My Order</p>
                </div>
            </div> 
            <div className='row'>
                <div className='col-md-7 pr-md-0'>
                    <div className='container p-0'>                             
                        <div className='row'>
                        <div className='conorder'>
                            <p className='ordernumber'>Order# {this.state.findconorder.order_number}</p>
                            <p className='orddet'>Order Placed on 23 May 2022 01:20 PM</p>
                        </div>
                            <div className='col-md-12' style={{marginBottom:"15px"}}>
                                <div className='card'>
                                    <div className='procarddetail' style={{justifyContent:"start"}}>
                                      <div onClick={()=> this.productdetails(this.state.findconorder.conproid,this.state.findconorder.pathname)} style={{cursor:"pointer"}}>
                                        <img src={this.state.findconorder.imgurl} className="pr-img"/>
                                      </div>
                                      <div className="clothdetail" style={{marginLeft:"10px"}}>
                                          <p onClick={()=> this.productdetails(this.state.findconorder.conproid,this.state.findconorder.pathname)} style={{cursor:"pointer"}}>{this.state.findconorder.pro_name}</p>
                                          <p>Rs. {this.state.findconorder.product_price} | Size: {this.state.findconorder.product_size}</p> 
                                          <p style={{fontSize:"15px"}}><GrDeliver/> Delivery date : <span style={{fontSize:"15px"}}> {this.state.findconorder.delivery}</span></p>                                           
                                      </div>                                       
                                    </div>
                                    <div className='progressclass'>
                                    <ProgressBar
                                        percent={
                                            100 *
                                            ((this.getStepPosition(this.state.transfer.status) + 1) / (this.state.steps.length - 1)) -
                                            1
                                        }
                                        filledBackground="linear-gradient(to right, #41ad49, #41ad49)"
                                        >
                                        {this.state.steps.map((step, index, arr) => {
                                            return (
                                            <Step
                                                children={({ accomplished }) => (
                                                <div
                                                className='helloprg'
                                                >
                                                    <span className='helloprogress'
                                                    style={{
                                                        backgroundColor: accomplished ? "#07bc0c" : "gray"
                                                        }}
                                                    ></span>
                                                    <br />
                                                    <br />
                                                    <br />
                                                <br />
                                                <span className="progressspan">{step.status}</span>
                                                </div>
                                                )}
                                            />
                                            );
                                        })}
                                        </ProgressBar>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                    </div>   
                </div>
                <div className='col-md-5' style={{marginTop:"40px"}}>
                    <div className='coupon-para mb-2'>
                        <p className='headingdd'>Shipping Details</p>
                        <p className='username'>{this.state.findconfirmusername}</p>
                        <p style={{marginBottom:"0"}}>{this.state.findaddress.address} &nbsp;
                        {this.state.findaddress.area} &nbsp;
                        {this.state.findaddress.landmark},&nbsp;
                        {this.state.findaddress.city},&nbsp;
                        {this.state.findaddress.state} - &nbsp;
                        {this.state.findaddress.pincode}</p>
                    </div>
                    <div className='price-div'>
                        <p className='price-summary'>PRICE SUMMARY</p>
                          <div className='ttl'>
                              <div className='amt-div'>
                                  <p>Total MRP (Incl. of taxes) </p>
                                  <p>₹ {this.state.findconorder.product_price}</p>
                              </div>
                              <div className='amt-div'>
                                  <p>Delivery Fee  </p>
                                  <p>FREE</p>
                              </div>
                              <div className='amt-div'>
                                  <p>Bag Discount </p>
                                  <p>- ₹{this.state.findconorder.product_discount}</p>
                              </div>
                              <div className='amt-div'>
                                  <p>Subtotal  </p>
                                  <p>₹ {this.state.findconorder.product_price - this.state.findconorder.product_discount}</p>
                              </div>  
                              <div className='amt-div' style={{borderTop: "1px solid #b1a8a8"}}>
                                  <p style={{color:"#000"}}>Total</p>
                                  <p style={{color:"#000"}}>₹ {this.state.findconorder.product_price - this.state.findconorder.product_discount}</p>
                              </div> 
                          </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
      </>
    )
  }
}
