import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
static contextType = MyContext;

render() {
const menuStyle = {
display: 'flex',
backgroundColor: '#6A7CE0',
padding: '10px',
listStyleType: 'none',
width: '1400px', // make the menu have a fixed length
};

const removemark = {
  listStyleType: 'none',
  marginRight:'20px'
};
const menuItemStyle = {
marginRight: '20px',
color: 'white', // change the text color to white
textDecoration: 'none', // remove the underline of the links
listStyleType: 'none', // remove the marker
marginLeft:'20px'
};

const rightAlign = {
display: 'flex',
marginLeft: 'auto',
color: 'white',
alignSelf: 'center', // align Hello Admin vertically center
};
return (
<div style={menuStyle}>
<ul style={{ padding: 0, display: 'flex' }}>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/home'>Home</Link></li>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/category'>Category</Link></li>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/product'>Product</Link></li>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/order'>Order</Link></li>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/customer'>Customer</Link></li>
</ul>
<div style={rightAlign}>
<li className='hoverr' style={removemark}>Hello <b >{this.context.username}</b></li>
<li className='hoverr' style={removemark}><Link style={menuItemStyle} to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></li>
</div>
</div>
);
}

lnkLogoutClick() {
this.context.setToken('');
this.context.setUsername('');
}
}

export default Menu;