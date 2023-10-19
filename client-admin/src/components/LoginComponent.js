import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { FaUser, FaLock } from "react-icons/fa";
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    const cardStyle = {
      borderRadius: "15px",
      padding: "20px",
      backgroundColor: "white",
      width: "300px",
      margin: "0 auto",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      marginTop: "12%",
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
      


    if (this.context.token === '') {
      return (
        <div style={cardStyle}>
          <h2 className="text-center">ADMIN LOGIN</h2>
          <form >
            <table className="align-center">
              <tbody>
                <tr>
                  <td class="fauser"><FaUser /></td>
                  <td><input style={inputStyle} placeholder="Username" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                </tr>
                <tr>
                  
                  <td class="fauser"><FaLock /></td>
                  <td><input style={inputStyle} placeholder="Password" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input className='but' style={buttonStyle} type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {alert(result.message);
      }
    });
  }
}
export default Login;
