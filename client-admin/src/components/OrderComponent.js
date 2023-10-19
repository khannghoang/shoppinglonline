import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
//style
const headertable = {
  display:'flex',
  width:'1200px',
  background:'#6A7CE0',
  borderRadius:"5px",
  margin: '0 auto'

}
const colandrow ={
padding:"10px",
width:'200px',
}
const colfordate ={
  padding:"10px",
  width:'300px',
}

const colorHeader ={
color : "white",

}

const tableRow = {
  backgroundColor:"#ffffff",
  boxShadow:"0px 0px 9px 0px rgba(0,0,0,0.1)",
  borderRadius:"5px",
  with:"1200px",
}

const full ={
  borderTopLeftRadius:"10px",
  borderTopRightRadius:"10px",
  padding: "10px",
  backgroundColor: "white",
  marginTop:"20px",
  width:"1400px"
}
const full1 ={
  padding: "10px",
  backgroundColor: "white",
  borderBottomLeftRadius:"10px",
  borderBottomRightRadius:"10px",
  width:"1400px"
}

    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} style={tableRow} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div ><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} style={tableRow}>
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div style={full} className="align-center">
          <h2 className="text-center">ORDER LIST</h2>
          <table style={headertable}>
            <tbody>
              <tr style={colorHeader}>
                <th style={colandrow}>ID</th>
                <th style={colfordate}>Creation date</th>
                <th style={colandrow}>Cust.name</th>
                <th style={colandrow}>Cust.phone</th>
                <th style={colandrow}>Total</th>
                <th style={colandrow}>Status</th>
                <th style={colandrow}>Action</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div style={full1} className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table style={headertable}>
              <tbody>
                <tr style={colorHeader}>
                  <th style={colandrow}>No.</th>
                  <th style={colandrow}>Prod.ID</th>
                  <th style={colandrow}>Prod.name</th>
                  <th style={colandrow}>Image</th>
                  <th style={colandrow}>Price</th>
                  <th style={colandrow}>Quantity</th>
                  <th style={colandrow}>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }

// Duyá»‡t or tá»« chá»‘i

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Order;