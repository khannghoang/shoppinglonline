import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaUser, FaLock } from "react-icons/fa";
import { ImProfile,ImMail} from "react-icons/im";
import { BsTelephoneFill} from "react-icons/bs";
import Password from 'antd/es/input/Password';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    const cardStyle = {
      borderRadius: "15px",
      padding: "30px",
      backgroundColor: "white",
      width: "350px",
      margin: "0 auto",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      marginTop:"5%"
      };
      
      const inputStyle = {
      borderRadius: "15px",
      margin: "10px 0",
      padding: "10px",
      border: "1px solid #ccc",
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      marginLeft:"10px",
      
      };
      
      const buttonStyle = {
      borderRadius: "15px",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "rgb(118, 74, 188)",
      color: "white",
      border: "none",
      width: "100%",
      cursor: "pointer",
      textAlign: "center",
      };
      const move={
        marginLeft:"45px"
      }
      const move2={
        marginRight:"5px",
        fontSize:"25px"
      }
  
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div  style={cardStyle}  className="align-centerr">
        <h2 style={move2} className="text-center">MY PROFILE</h2>
        <form>
          <table style={move} className="align-centerr">
            <tbody>
              <tr>
              <td class="fauser"><FaUser /></td>
                <td><input style={inputStyle} placeholder='Username' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><FaLock /></td>
                <td><input style={inputStyle} placeholder='Password'  type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><ImProfile/></td>
                <td><input style={inputStyle} placeholder='Name' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><BsTelephoneFill/></td>
                <td><input style={inputStyle} placeholder='Phone' type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><ImMail/></td>
                <td><input style={inputStyle} placeholder='Email' type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={buttonStyle} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Hãy nhập Username, Password, Tên, SĐT, và Email');
      
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.context.setCustomer(result);
      } else {
        alert('Thất bại');
      }
    });
  }
}
export default Myprofile;
