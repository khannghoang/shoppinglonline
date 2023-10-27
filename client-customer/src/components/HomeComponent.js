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
    
    const textcente={
      textAlign: "center",
    fontSize:"17px",
    fontWeight: "600",
      color: "#1d1d1f",
    marginTop:"40px",
    }
    const span={
      // fontSize:"20px"
    }
    const margin={
      marginTop:"80px"
    }
   const spanprice={
    color:"red"
   }
    const newprods = this.state.newprods.map((item) => {
      return (
         <div key={item._id} className="inline fullbox scroll-animation3 ">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}><img className='imagerespon' src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>
            <figcaption className='textcenterespon' style={textcente} ><span  className='textcenterespon truncate-text' >{item.name}</span><br /><span  className='textcenterespon truncate-text' style={spanprice}>Price: {item.price}</span></figcaption>
          </figure>
        </div>
      
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div  key={item._id} className="inline fullboxlistproduct scroll-animation3">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}><img className='imagerespon' src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>
            <figcaption  className='textcenterespon' style={textcente} ><span className='textcenterespon'>{item.name}</span><br /><span className='textcenterespon' style={spanprice}>Price: {item.price}</span></figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div >
        <div  className="text-center text-center-respon scroll-animation2" >
          <h2  className="text-center ">NEW PRODUCTS</h2>
        {newprods}
      </div>
        {this.state.hotprods.length > 0 ?
          <div className="text-center text-center-respon scroll-animation2" >
            <h2  className="text-center ">HOT PRODUCTS</h2>
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
