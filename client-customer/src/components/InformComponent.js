import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuClipboardList} from "react-icons/lu";

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const flexx={
      display:"flex",
      justifyContent:"space-between",
      backgroundColor:"white",
      border:"none",
      
    }
    const flexxx={
      display:"flex",
      
    }
    const number={
      position:"relative",
      bottom:"10px",
      fontSize:"13px",
    }
    const order={
      marginLeft:"10px"
    }
    const cart={
      color:"black",
      fontSize:"20px"
    }
    const logpro={
      color:"black",
      textDecoration:"none",
      fontWeight:"600"

    }
    return (
      <div style={flexx} className="border-bottom">
        <div className="float-left">
        {this.context.token === '' ?
          <div><Link  style={logpro}  to='/login' >Login</Link> | <Link style={logpro} to='/signup'>Sign-up</Link> | <Link  style={logpro} to='/active'>Active</Link></div>
          :
          <div >Hello <b>{this.context.customer.name}</b> | <Link  style={logpro} to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> | <Link  style={logpro} to='/myprofile'>My Profile</Link></div>
        }        </div>
        <div style={flexxx} className="float-right">
          <Link className="hoverrr" to='/mycart'><td style={cart}><AiOutlineShoppingCart /></td></Link> <b style={number}>{this.context.mycart.length}</b> 
          <span style={order} className="float-clear" /><Link className="hoverrr" to='/myorders'><td style={cart}><LuClipboardList /></td></Link>
        </div>
        
      </div>
    );
  }
   // event-handlers
   lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;