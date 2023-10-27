import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
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
      
      // const buttonStyle =
      // borderRadius: "15px",
      // margin: "10px 0",
      // padding: "10px",
      // backgroundColor: "rgb(118, 74, 188)",
      // color: "white",
      // border: "none",
      // width: "100%",
      // cursor: "pointer",
      // textAlign: "center",
      // };
      const move={
        marginLeft:"35px"
      }
      const move2={
        marginRight:"15px",
        fontSize:"25px"
      }
    return (
      <div  className="align-centerr cardStyle scroll-animation">
        <h2 style={move2} className="text-center">CUSTOMER LOGIN</h2>
        <form>
          <table style={move} className="align-center scroll-animation2">
            <tbody>
              <tr>
              <td class="fauser"><FaUser /></td>
                <td><input  style={inputStyle} placeholder='Username' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
              <td class="fauser"><FaLock /></td>
                <td><input style={inputStyle} placeholder='Password' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='but buttonStylelogin'  type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
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
      alert('Hãy nhập Username và Password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);
