import React, { Component } from 'react'

export default class Exchangeproduct extends Component {
  render() {
    return (
    <div className='container cart-container'>
        <div className='row emptycartdetails'>
        <div className='noresult'>
            <p>Your Exchange request has been accepted</p>
            <span>Thanks for shopping</span>
            <button type="button" className="btn continueshopping">Continue Shopping</button>
        </div>
        </div>
      </div>
    )
  }
}