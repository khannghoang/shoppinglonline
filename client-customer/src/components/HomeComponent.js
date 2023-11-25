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
    // marginTop:"40px",
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
   const buttonStyle = {
    position: 'relative',
    right: '3%',
    borderRadius: "5px",
    margin: "10px 0",
    padding: "12px",
    backgroundColor: "#0047b3",
    color: "white",
    border: "none",
    width: "45%", // Giảm chiều rộng để chia sẻ không gian với ô tìm kiếm
    cursor: "pointer",
    textAlign: "center",
    
  };
    const newprods = this.state.newprods.map((item) => {
      return (
         <div key={item._id} className="inline fullbox scroll-animation3 ">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}>
            <img className='imagerespon' src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>

            <figcaption className='textcenterespon' style={textcente} ><p className='textcenterespon  truncate-text' >{item.name}</p>
            <br /><span className='textcenterespon ' style={spanprice}>{item.price} đ</span><br/>
            <Link  to={'/product/' + item._id}><button className='but buttonStyle' >CHI TIẾT </button></Link>
            </figcaption>
          </figure>
        </div>
      
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div  key={item._id} className="inline fullbox scroll-animation3">
          <figure style={margin}>
          <Link  to={'/product/' + item._id}><img className='imagerespon' src={`data:image/jpg;base64,${item.image}`} width="250px" height="250px" alt="" /></Link>
          <figcaption className='textcenterespon' style={textcente} ><p className='textcenterespon  truncate-text' >{item.name}</p>
            <br /><span className='textcenterespon ' style={spanprice}>{item.price} đ</span><br/>
            <Link  to={'/product/' + item._id}><button className='but buttonStyle' >CHI TIẾT </button></Link>
            </figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div >
        <div className="text-center text-center-respon scroll-animation2" >
          <h2 className="text-center ">SẢN PHẨM MỚI</h2>
          <div className=' wrapper'>
          {newprods}
          </div>
       
      </div>
        {this.state.hotprods.length > 0 ?
          <div className="text-center text-center-respon scroll-animation2" >
            <h2  className="text-center ">BEST SELLER</h2>
            <div className=' wrapper'>
              {hotprods}
              </div>
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
