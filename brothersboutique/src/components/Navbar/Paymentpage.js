import React, { Component } from 'react'
import axios from "axios";
import { FaRupeeSign} from "react-icons/fa";
import { GrNext} from "react-icons/gr";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';


export default class Paymentpage extends Component {
    constructor(props){
        super(props);
        this.state={
            findaddress:[],
            productcartarrr:[],
            productarr:[]
        }
        this.fetchpaymentdetails()        
    }

    fetchpaymentdetails=()=>{
        const data = {
            user_id: localStorage.getItem('userid'),
            fetchorderlist:"yes",
        }      
        console.log(this.productid) 
        axios.post('http://localhost/E-Commerce/brothers/confirmorder.php',data)
        .then(res => {
            console.log(res.data); 
            this.setState({pricetotaldata:res.data.pricetotal});
            this.setState({discountdata:res.data.offerpricetotal});
            this.setState({findaddress:res.data.findaddress});
            this.setState({findusername:res.data.findusername});
            this.setState({productarr:res.data.productcartid});
            this.setState({pids:res.data.pids})
            this.setState({sizes:res.data.sizes})
            this.setState({prcartid:res.data.prcartid})
            this.setState({productcartarrr:res.data.productcartarr})
        })
        console.log(this.state.productarr)
    }

    confirmorder=(ord,paymethod)=>{
        const orderdata={
            user_id: localStorage.getItem('userid'),
            order_id:ord,
            confirmuserorder:"yes",
            pid:this.state.pids,
            sizes:this.state.sizes,
            prcartid:this.state.prcartid,
            paymethod:paymethod,
            product_quantity:this.state.productarr.product_quantity
        }
        console.log(orderdata)
        axios.post('http://localhost/E-Commerce/brothers/confirmorder.php',orderdata)
        .then(res => {
            this.setState({
                alert: submitpralertss()
              });
        })

        const submitpralertss = () => (
            Swal.fire({
                title:"Order Placed",
                timer:1500,
                icon:"success",
                timerProgressBar: true,
                showConfirmButton:false
            }).then(()=>{
                this.props.history.push('/Userorder')
            })
        ); 
    }
    hideAlert() {
    this.setState({
      alert: null
    });
  }


    productdetails = (pid,pathname) => {
        this.props.history.push('/p/'+pathname+'/'+pid);
    }

    editaddress=()=>{
        this.props.history.push('/Editaddress');
    }

  render() {
    return (
      <>
        <div className='container'>
            <h4 className='mt-4'>Choose your payment method</h4>
            <div className='row mt-3'> 
                <div className='col-md-8'>
                    <div className='card paymentcard'>
                        <div className='paymentmethods'>
                            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active zzz" id="v-pills-cod-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cod" type="button" role="tab" aria-controls="v-pills-cod" aria-selected="true"><FaRupeeSign/>Cash On Delivery</a>
                                <hr/>
                                <a className="nav-link zzz" id="v-pills-credit-debit-tab" data-bs-toggle="pill" data-bs-target="#v-pills-credit-debit" type="button" role="tab" aria-controls="v-pills-credit-debit" aria-selected="false"><FaRupeeSign/>Debit / Credit Card</a>
                                <hr/>
                                <a className="nav-link zzz" id="v-pills-upi-tab" data-bs-toggle="pill" data-bs-target="#v-pills-upi" type="button" role="tab" aria-controls="v-pills-upi" aria-selected="false"><FaRupeeSign/>UPI</a>
                                <hr/>
                                <a className="nav-link zzz" id="v-pills-netbanking-tab" data-bs-toggle="pill" data-bs-target="#v-pills-netbanking" type="button" role="tab" aria-controls="v-pills-netbanking" aria-selected="false"><FaRupeeSign/>Net banking</a>
                                <hr/>
                            </div>
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-cod" role="tabpanel" aria-labelledby="v-pills-cod-tab">cod
                                    <button className='paybtn' onClick={()=>this.confirmorder(this.state.findaddress.order_id,"cod")}>Pay ₹{this.state.pricetotaldata-this.state.discountdata}</button>    
                                </div>
                                <div className="tab-pane fade" id="v-pills-credit-debit" role="tabpanel" aria-labelledby="v-pills-credit-debit-tab">d/c
                                    <button className='paybtn' onClick={()=>this.confirmorder(this.state.findaddress.order_id,"crditdebit")}>Pay ₹{this.state.pricetotaldata-this.state.discountdata}</button>                       
                                </div>
                                <div className="tab-pane fade" id="v-pills-upi" role="tabpanel" aria-labelledby="v-pills-upi-tab">
                                    <button className='paybtn' onClick={()=>this.confirmorder(this.state.findaddress.order_id,"upi")}>Pay ₹{this.state.pricetotaldata-this.state.discountdata}</button>                       
                                </div>
                                <div className="tab-pane fade" id="v-pills-netbanking" role="tabpanel" aria-labelledby="v-pills-netbanking-tab">
                                    <button className='paybtn' onClick={()=>this.confirmorder(this.state.findaddress.order_id,"netbanking")}>Pay ₹{this.state.pricetotaldata-this.state.discountdata}</button>                       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 '>
                        {/* <p style={{marginBottom:"0"}}>Delivering order to {this.state.findusername}</p> */}
                        <p style={{marginBottom:"0"}}>Delivering order to {this.state.findaddress.fullname}</p>
                        <div className='deliverydetails'>
                            <p>
                                {this.state.findaddress.address} &nbsp;
                                {this.state.findaddress.area} &nbsp;
                                {this.state.findaddress.landmark},&nbsp;
                                {this.state.findaddress.city},&nbsp;
                                {this.state.findaddress.state} - &nbsp;
                                {this.state.findaddress.pincode}
                            </p>
                            
                            <div onClick={()=>this.editaddress()}>
                                <GrNext style={{fontSize:"20px"}}/>
                            </div>
                        </div>                   
                    <hr/>
                    <h6>You are paying for these items</h6>
                    {
                        this.state.productcartarrr.map((item,index)=>{
                            return(
                                <div className='itemclass mb-2' key={index}>
                                    <div className='quancount'>
                                        <img src={item.proimgcart} className="payimg" onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)}/>
                                        <span>{this.state.productarr.product_quantity}</span>
                                    </div>
                                    <div className='imgspan' onClick={()=> this.productdetails(item.pid,item.productcartdetails.pathname)}>
                                        <p>{item.Product} <br/> Estimated delivery date <span>04 june 2022</span></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <hr/>
                    <h6>Price Summary</h6>
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
                            <p>Discount on MRP </p>
                            <p>- ₹{this.state.discountdata}</p>
                        </div>
                        <hr/> 
                        <div className='amt-div'>
                            <p>Final amount</p>
                            <p>₹ {this.state.pricetotaldata-this.state.discountdata}</p>
                        </div>                         
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
}
