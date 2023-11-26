import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
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
      marginLeft:"5px",
      
      };
      
      const buttonStyle = {
      borderRadius: "15px",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: " #0047b3",
      color: "white",
      border: "none",
      width: "100%",
      cursor: "pointer",
      textAlign: "center",
      };
      const move={
        marginLeft:"35px"
      }
      const move2={
        marginRight:"5px",
        fontSize:"25px"
      }
    return (
      <div  className="align-centerr cardStyle scroll-animation">
        <h2  style={move2} className="text-center">ACTIVE ACCOUNT</h2>
        <form>
          <table style={move} className="align-centerr scroll-animation2">
            <tbody>
              <tr>
                <td>ID</td>
                <td><input  style={inputStyle} type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Token</td>
                <td><input  style={inputStyle} type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='but' style={buttonStyle} type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Hãy nhập Id và Token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Active thành công');
      } else {
        alert('Active thất bại');
      }
    });
  }
}
export default Active;
