import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList} from 'react-icons/ai';
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
    
      const removemark = {
        listStyleType: 'none',
        marginRight:'20px'
      };
    
      
      const rightAlign = {
      display: 'flex',
      marginLeft: 'auto',
      color: 'white',
      alignSelf: 'center', // align Hello Admin vertically center
      
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
        <li key={item._id} className="hoverr" style={removemark}><Link className="menuItemStyle"  to={'/product/category/' + item._id}>{item.name}</Link></li>
        
        
      );
    });
    return (
      
      <div className='menuStyle menurespon2'  >
         <div className='menu-toggle'>
          <label for="menu-toggle">
            <td >< AiOutlineUnorderedList /></td>
          </label>  
        </div>
        <input  type='checkbox' id='menu-toggle' hidden />
        <label className='overlay' for="menu-toggle"></label>
        <div className='menurespon'>
          <ul className='ul' style={{ padding: 0, display: 'flex' }}>
            <li className="hoverr  " style={removemark}><Link className="menuItemStyle"  to='/'>Home</Link></li>
              {cates}
          </ul>
        </div>
        
        <div style={rightAlign}>
          <form className="search" style={{ display: "flex" }}>
            <input className='hoverr inputStyle' type="search" placeholder="Enter keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
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
