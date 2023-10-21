import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import {FaLocationDot,FaPhone} from "react-icons/fa6";
import {ImMail4} from "react-icons/im"
import withRouter from '../utils/withRouter';
class Footer extends Component {
    static contextType = MyContext
    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          txtKeyword: ''
        };
    }
    render(
       
    ) {
        
        const cates = this.state.categories.map((item) => {
            return (
              <li key={item._id} className='hoverr' ><Link className="hoverr text2" to={'/product/category/' + item._id}>{item.name}</Link></li>
            );
          });
          
          const test2={
            display:"flex",
            flexDirection:"column", 
          }
          const dot={
            listStyle:"none",
           textDecoration:"none"
          }
          const text={
            fontWeight:"700",
            fontSize:"20px",
            margin:"5px",
            textTransform:"uppercase",
            marginLeft:"40px"
          }
          const text2={
            color:"rgb(92,92,93)",
            fontWeight:"500"
          }
          const compo={
            marginRight:"90px"
          }
      return (
<footer>
  <div class="container">
    <div  class="row test">
     <div style={compo} >
        <h6 style={text}>About Us</h6>
        <ul  style={dot}>
          <li >
          <p style={text2}> <span><FaLocationDot/></span> 1/11/52 Hẻm 1 Đặng Thùy Trâm, Bình Thạnh, Hồ Chí Minh</p>
          </li>
          <li>
            <p style={text2} ><span><FaPhone/></span> 0123456789</p>
          </li>
          <li>
            <p style={text2}><span><ImMail4/></span> Loremlpsum@gmail.com</p>
          </li>
        </ul>
      </div>
      <div style={compo} >
        <h6 style={text}>Shopping</h6>
        <ul style={dot} className="footer-links">
         <span className='text2'>{cates}</span>
        </ul>
      </div>
      <div  className='compo'>
        <h6 style={text}>Customer</h6>
        <ul >
          <div style={compo}>
            {this.context.token === '' ? (
              <div >
                <div style={test2} >
                <Link className='hoverr' to="/login">Login</Link>   
                <Link className='hoverr' to="/signup">Sign-up</Link> {" "}
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




      )}

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
