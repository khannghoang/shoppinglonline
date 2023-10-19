import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const textcente={
      textAlign: "center",
    fontSize:"17px",
    fontWeight: "600",
      color: "#1d1d1f",
    marginTop:"10px",
    }
    const fullbox={
      margin:"10px",
      padding:"10px",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      borderRadius:"18px",
      // height: "29.41176rem",
      // boxShadow: "2px 4px 12px rgba(0,0,0,.08)",
    }
    const marginfor={
      marginLeft:"160px"
    }
    const marginfor2={
      marginLeft:"150px"
    }
    const span={
      fontSize:"20px"
    }
   const spanprice={
    color:"red"
   }
   
    const prods = this.state.products.map((item) => {
      return (
        <div style={fullbox} key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="250px" height="250px" alt="" /></Link>
            <figcaption style={textcente} ><span style={span}>{item.name}</span><br /><span style={spanprice}>Price: {item.price}</span></figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div style={marginfor} className="text-center">
        <h2 style={marginfor2} className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }  else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);