import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {

const button={
  backgroundColor: 'rgb(234,234,234)',
  color: 'rgb(92, 92, 93)',
  borderRadius: '0px',
  padding: '5px 10px 5px px',
  cursor: 'pointer',
  textDecoration: 'none',
  size:"10%",
  display:"flex",
  justifyContent: 'center',
  alignItems: 'center',
}
const tableRow = {
  backgroundColor:"#ffffff",
  boxShadow:"0px 0px 9px 0px rgba(0,0,0,0.1)",
  borderRadius:"5px",
  with:"1200px",
}

//Function
    const customers = this.state.customers.map((item) => {
      return (
        <tr  key={item._id} style={tableRow} onClick={() => this.trCustomerClick(item)}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td >{item.active}</td>
          <td>
            {item.active === 0 ?
              <span style={button}  className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
              :
              <span style={button} className="link" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} style={tableRow} onClick={() => this.trOrderClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
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


    
  const headertable = {
      display:'flex',
      width:'1200px',
      background:'rgb(234, 234, 234)',
      borderRadius:"5px",
      margin: '0 auto'
    }
  const colandrow ={
    padding:"10px",
    width:'200px',
  }
  const colorHeader ={
    color : "rgb(92, 92, 93)",   
  }
  const full ={
    borderTopLeftRadius:"10px",
    borderTopRightRadius:"10px",
    padding: "10px",
    backgroundColor: "white",
    width:"1400px",
    marginTop:"10px",
  }
  const full1 ={
    padding: "10px",
    backgroundColor: "white",
    width:"1400px",
  }
  const full2 ={
    padding: "10px",
    backgroundColor: "white",
    borderBottomLeftRadius:"10px",
    borderBottomRightRadius:"10px",
    width:"1400px",
  }
    return (
      <div>
        <div style={full} className="align-center">
          <h2 className="text-center">CUSTOMER LIST</h2>
          <table style={headertable}  >
            <tbody>
              <tr style={colorHeader}>
                <th style={colandrow} >ID</th>
                <th style={colandrow} >Username</th>
                <th style={colandrow}>Password</th>
                <th style={colandrow}>Name</th>
                <th style={colandrow}> Phone</th>
                <th style={colandrow}>Email</th>
                <th style={colandrow}>Active</th>
                <th style={colandrow}>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>
        {this.state.orders.length > 0 ?
          <div style={full1} className="align-center">
            <h2 className="text-center">ORDER LIST</h2>
            <table style={headertable}>
              <tbody>
                <tr style={colorHeader} >
                  <th style={colandrow}>ID</th>
                  <th style={colandrow}>Creation date</th>
                  <th style={colandrow}>Cust.name</th>
                  <th style={colandrow}>Cust.phone</th>
                  <th style={colandrow}>Total</th>
                  <th style={colandrow}>Status</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
          : <div />}
        {this.state.order ?
          <div style={full2} className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table style={headertable}>
              <tbody>
                <tr className="datatable">
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

  // send mail
  
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
// Deactive account
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('KHÔNG THÀNH CÔNG!');
      }
    });
  }

  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Customer;
