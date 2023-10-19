import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const fullbox={
      margin:"10px",
      padding:"15px",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      borderRadius:"18px",
      height: "29.41176rem",
      marginLeft:"20px",
      backgroundColor:"white"
      // boxShadow: "2px 4px 12px rgba(0,0,0,.08)",
    }
    const textcente={
      textAlign: "center",
    fontSize:"17px",
    fontWeight: "600",
      color: "#1d1d1f",
    marginTop:"40px",
    }
    const span={
      fontSize:"20px"
    }
    const margin={
      marginTop:"80px"
    }
   const spanprice={
    color:"red"
   }
   const textt={
    marginLeft:"150px"
   }
    const newprods = this.state.newprods.map((item) => {
      return (
        <div style={fullbox} key={item._id} className="inline">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}><img src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>
            {/* <a href=""><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></a> */}
            <figcaption style={textcente} ><span style={span}>{item.name}</span><br /><span style={spanprice}>Price: {item.price}</span></figcaption>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div style={fullbox} key={item._id} className="inline">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}><img  src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>

            {/* <a href=""><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></a> */}
            <figcaption style={textcente} ><span style={span}>{item.name}</span><br /><span style={spanprice}>Price: {item.price}</span></figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 style={textt} className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;