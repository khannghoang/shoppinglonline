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
class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        <Menu />
        <Inform />
        <Routes>
          <Route path='/' element={<PrivateRoute><Navigate replace to='/home' /></PrivateRoute>} />
          <Route path='/home' element={<PrivateRoute><Slider /><Home /></PrivateRoute>} />
          <Route path='/product/category/:cid' element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path='/product/search/:keyword' element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path='/product/:id' element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/active' element={<Active />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/myprofile' element={<PrivateRoute><Myprofile /></PrivateRoute>} />
          <Route path='/mycart' element={<PrivateRoute><Mycart /></PrivateRoute>} />
          <Route path='/myorders' element={<PrivateRoute><Myorders /></PrivateRoute>} />
        </Routes>
        
      </div>
    );
  }
}
export default Main;