import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td className='none'>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td ><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>
          
        </tr>
      );
    });
   
 
    const move={
      // marginLeft:"33%"
    }
    return (
      <div className="align-centerr fullorderlist scroll-animation">
        <h2 style={move} className="text-centerr movingitemlist">ITEM LIST</h2>
        <table  className="datatable tableorderlist" border="1">
          <tbody className='bodycart'>
            <tr className="datatable datatable1 scroll-animation-right ">
              <th>No.</th>
              <th className='none'>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {mycart}
            <tr className='cartrespon'>
              <td colSpan="6"></td>
              <td className='cartrespon'>Total</td>
              <td className='cartrespon'>{CartUtil.getTotal(this.context.mycart)}</td>
              <td className='cartrespon'><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
   // event-handlers
   lnkCheckoutClick() {
    if (window.confirm('Bạn chắc chắn muốn thanh toán')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Giỏ hàng bạn trống');
      }
    }
  }
   // apis
   apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thanh toán thành công');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Thanh toán thất bại');
      }
    });
  }
}

export default withRouter(Mycart);
// export default Mycart;
