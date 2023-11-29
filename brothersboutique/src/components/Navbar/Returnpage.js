import React, { Component } from 'react'

export default class Returnpage extends Component {
  render() {
    return (
    <div className='container cart-container'>
        <div className='row emptycartdetails'>
        <div className='noresult'>
            <p>Money will be returned within 7-10 days</p>
            <span>Thanks for shopping</span>
            <button type="button" className="btn continueshopping">Continue Shopping</button>
        </div>
        </div>
      </div>
    )
  }
}
