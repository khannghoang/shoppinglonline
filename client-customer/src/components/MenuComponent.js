import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }


  render() {

    const menuStyle = {
      display: 'flex',
      backgroundColor: '#eaeaea',
      padding: '10px',
      listStyleType: 'none',
      width: '1430px', // make the menu have a fixed length
      };
      
      const removemark = {
        listStyleType: 'none',
        marginRight:'20px'
      };
      const menuItemStyle = {
      marginRight: '20px',
      color: '#5c5c5d', // change the text color to white
      textDecoration: 'none', // remove the underline of the links
      listStyleType: 'none', // remove the marker
      marginLeft:'20px',
      fontWeight:"500"
      };
      
      const rightAlign = {
      display: 'flex',
      marginLeft: 'auto',
      color: 'white',
      alignSelf: 'center', // align Hello Admin vertically center
      
      };
      const inputStyle = {
        borderRadius: "5px",
        margin: "10px 10px 10px 0", // Thêm margin phía bên phải
        padding: "10px",
        border: "1px solid #ccc",
        width: "70%", // Giảm chiều rộng để chia sẻ không gian với nút tìm kiếm
        boxSizing: "border-box",
      };
      
      const buttonStyle = {
        borderRadius: "5px",
        margin: "10px 0",
        padding: "10px",
        backgroundColor: "rgb(118, 74, 188)",
        color: "white",
        border: "none",
        width: "30%", // Giảm chiều rộng để chia sẻ không gian với ô tìm kiếm
        cursor: "pointer",
        textAlign: "center",
      };
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="hoverr" style={removemark}><Link style={menuItemStyle} to={'/product/category/' + item._id}>{item.name}</Link></li>
        
        
      );
    });
    return (
      <div style={menuStyle}>
        <div>
          <ul style={{ padding: 0, display: 'flex' }}>
            <li className="hoverr" style={removemark}><Link style={menuItemStyle} to='/'>Home</Link></li>
            {cates}
          </ul>
        </div>
        <div style={rightAlign}>
          <form className="search" style={{ display: "flex" }}>
            <input className='hoverr' type="search" placeholder="Enter keyword" style={inputStyle} value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <input className='but' type="submit" value="SEARCH" style={buttonStyle} onClick={(e) => this.btnSearchClick(e)} />
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }



  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);