import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";

class Footer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const slicedCategories = this.state.categories.slice(0, 4); // Chỉ lấy 4 phần tử đầu tiên
    const cates = slicedCategories.map((item) => (
      <li key={item._id} className='hoverr'>
        <Link className="hoverr text2" to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    const test2 = {
      display: "flex",
      flexDirection: "column",
    };

    const dot = {
      listStyle: "none",
      textDecoration: "none",
    };

    const text2 = {
      color: "rgb(92,92,93)",
      fontWeight: "500",
    };

    return (
      <footer>
        <div className="container scroll-animation3">
          <div className="row test ">
            <div className='compo' >
              <h6 className='text'>About Us</h6>
              <ul style={dot}>
                <li >
                <Link className="gmapmove" to='/gmap'> <p style={text2}> <span><FaLocationDot /></span> 1/11/52 Hẻm 1 Đặng Thùy Trâm, Bình Thạnh, Hồ Chí Minh</p></Link> 
                </li>
                <li>
                  <p style={text2} ><span><FaPhone /></span> 0123456789</p>
                </li>
                <li>
                  <p style={text2}><span><ImMail4 /></span> Loremlpsum@gmail.com</p>
                </li>
              </ul>
            </div>
            <div className='compo' >
              <h6 className='text'>Shopping</h6>
              <ul style={dot} className="footer-links">
                <span className='text2'>{cates}</span>
              </ul>
            </div>
            <div className='compo'>
              <h6 className='text'>Customer</h6>
              <ul >
                <div className='compo'>
                  {this.context.token === '' ? (
                    <div >
                      <div style={test2} >
                        <Link className='hoverr' to="/login">Login</Link>
                        <Link className='hoverr' to="/signup">Sign-up</Link>{" "}
                        <Link className='hoverr' to="/active">Active</Link>
                      </div>
                    </div>
                  ) : (
                    <div style={test2}>
                      Hello <b>{this.context.customer.name}</b><br />
                      <Link className='hoverr' to="/home" onClick={() => this.lnkLogoutClick()}>Logout</Link><br />
                      <Link className='hoverr' to="/myprofile">My Profile</Link>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Footer;
