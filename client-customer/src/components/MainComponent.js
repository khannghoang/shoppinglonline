import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import PrivateRoute from './PrivateRoute';
import Slider from './slider';
import Footer from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import Shop from './shop';
import Gmap from './GmapComponent';
class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        {/* <Menu /> */}
        <HeaderComponent/>
        {/* <Inform /> */}
        <Routes>
          <Route path='/' element={<PrivateRoute><Navigate replace to='/home' /></PrivateRoute>} />
          <Route path='/home' element={<PrivateRoute><Slider /><Home /></PrivateRoute>} />
          <Route path='/product/category/:cid' element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path='/product/search/:keyword' element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path='/product/:id' element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path='/signup' element={<PrivateRoute><Signup /></PrivateRoute>} />
          <Route path='/active' element={<PrivateRoute><Active /></PrivateRoute>} />
          <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>}/>
          <Route path='/myprofile' element={<PrivateRoute><Myprofile /></PrivateRoute>} />
          <Route path='/mycart' element={<PrivateRoute><Mycart /></PrivateRoute>} />
          <Route path='/myorders' element={<PrivateRoute><Myorders /></PrivateRoute>} />
          <Route path='/shop' element={<PrivateRoute><Shop /></PrivateRoute>} />
          <Route path='/gmap' element={<PrivateRoute><Gmap /></PrivateRoute> } />
        </Routes>
     
      </div>
    );
  }
}
export default Main;
