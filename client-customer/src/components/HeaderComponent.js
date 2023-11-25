import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoLocationSharp } from "react-icons/io5";
import MyContext from '../contexts/MyContext';
import axios from 'axios';
import './HeaderComponent.css'; // Tên tệp CSS của bạn
import {SlMagnifier} from 'react-icons/sl';
import {MdAccountCircle} from 'react-icons/md';
import withRouter from '../utils/withRouter';


class HeaderComponent extends Component {
  static contextType = MyContext;


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      newprods: [],
      isAccountMenuOpen: false, // Thêm biến trạng thái cho menu dropdown
    };
  }


  // Hàm để mở/đóng menu dropdown
  toggleAccountMenu = () => {
    this.setState((prevState) => ({
      isAccountMenuOpen: !prevState.isAccountMenuOpen,
    }));
  };

  


  render() {
    const isLoggedIn = this.context.token !== '';
    const { customer } = this.context;
    const { txtKeyword, isAccountMenuOpen } = this.state;
    const buttonStyle = {
      position: 'relative',
      right: '3%',
      borderRadius: "5px",
      margin: "10px 0",
      padding: "12px",
      backgroundColor: "#0047b3",
      color: "white",
      border: "none",
      width: "35%", // Giảm chiều rộng để chia sẻ không gian với ô tìm kiếm
      cursor: "pointer",
      textAlign: "center",
    };
    const cart={
        position:'relative',
        top:'6px',
      color:"white",
      fontSize:"20px"
    }

    return (
     
      <div className="header menuStyle menurespon2">
         <div className='menu-toggle'>
          <label for="menu-toggle">
            <td >< AiOutlineUnorderedList /></td>
          </label>  
         </div>
        <div className='testforflex '>
        <input  type='checkbox' id='menu-toggle' hidden />
        <label className='overlay' for="menu-toggle"></label>
         <div className="header-left menurespon">
          <div className='flex-item'>
          <Link className="style hoverr" to="/">Trang chủ</Link> 
          <Link className='style hoverr' to="/shop">Trang sản phẩm</Link> {' '}
             <div className='moving hoverr style'>
             <Link className="hoverr style " to='/mycart'><td style={cart}><AiOutlineShoppingCart /></td></Link> <b className='moving' >{this.context.mycart.length}</b>
            </div> 
  
     
            <div className='moving2'>
             <Link className="hoverr style " to='/mycart'>Giỏ hàng</Link> <b className='moving' >{this.context.mycart.length}</b>
            </div>  
            <div className='moving'>
              <div className="gmapmove hoverr style"><Link className="gmapmove" to='/gmap'><IoLocationSharp /></Link></div> 
            </div>
            <div className='moving2'>
              <div className="gmapmove hoverr style"><Link className="gmapmove" to='/gmap'>Vị trí</Link></div> 
            </div> 
          </div>
        </div>
        <div className="header-right menurespon">
          <div className="menu-dropdown">
            <div className='flex-item'>
            <span onClick={this.toggleAccountMenu}> <td ><MdAccountCircle/></td></span> 
            <div className={`menu-content ${isAccountMenuOpen ? 'open' : ''}`}>
              {isLoggedIn ? (
                <>
               <a className='contentcss'>Hello<b className='spacing'>{customer.name}</b></a>
                  <Link className='contentcss hover-effect' to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
                  <Link  className='contentcss hover-effect ' to="/myprofile">My Profile</Link>
                  <Link className="contentcss hover-effect" to='/myorders'><td >Đơn đã mua</td></Link>
                </>
              ) : (
                <>
                  <Link  className='contentcss hover-effect' to="/login">Login</Link>
                  <Link to="/signup"  className='contentcss hover-effect'>Sign-up</Link> {' '}
                  <Link  className='contentcss hover-effect' to="/active">Active</Link>  
                </>
              )}
            </div>
            </div>
          </div>
         
          <div className="search-bar">
          <form className="search scroll-animation" style={{ display: "flex" }}>
          <input className='hoverr inputStyle' type="search" placeholder="Enter keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
          <input style={buttonStyle} className='but' type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} /> 
          {/* <input style={buttonStyle}   className='but' type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)}> <td className='magni' ><SlMagnifier/></td></input> */}
        </form>
        </div>
      </div>
    </div>
  </div>
      
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
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


export default withRouter(HeaderComponent) ;




