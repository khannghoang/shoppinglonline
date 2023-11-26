import axios from 'axios';
import React, { Component } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { ImProfile,ImMail} from "react-icons/im";
import { BsTelephoneFill} from "react-icons/bs";

class Signup extends Component {
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
      backgroundColor: "#0047b3",
      color: "white",
      border: "none",
      width: "100%",
      cursor: "pointer",
      textAlign: "center",
      };
      const move={
        marginLeft:"75px"
      }
      const move2={
        marginRight:"15px",
        fontSize:"25px"
      }
    return (
      <div className="align-centerr cardStyle scroll-animation">
        <h2 style={move2} className="text-center">SIGN-UP</h2>
        <form>
          <table style={move} className="align-centerr signup scroll-animation2">
            <tbody>
              <tr>
              <td class="fauser"><FaUser /></td>
                <td><input style={inputStyle} placeholder='Username' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><FaLock /></td>
                <td><input style={inputStyle} placeholder='Password' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
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
                <td><input className='but' style={buttonStyle} type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Hãy nhập Username, Password, Tên, SĐT, và Email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;
