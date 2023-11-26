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
  
    const marginfor={
      // marginLeft:"160px"
    }
    const marginfor2={
      // marginLeft:"150px"
    }
    const margin={
      marginTop:"80px"
    }
   
 
   
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline fullbox scroll-animation">
          <figure style={margin}>
            <Link to={'/product/' + item._id}><img className='imagerespon' src={"data:image/jpg;base64," + item.image} width="250px" height="250px" alt="" /></Link>
            <figcaption style={textcente} ><div className='spanrespon truncate-text' >{item.name}</div><br /><span className="spanpricerespon truncate-text" >{item.price} đ</span></figcaption>
          </figure>
        </div>
      );
    });
    // return (
    //   <div style={marginfor} className="text-center text-center-respon scroll-animation" >
    //     <h2 style={marginfor2} className="text-center">LIST PRODUCTS</h2>
    //     <div className='wrapper'>
    //     {prods}
    //     </div>
        
    //   </div>
    // );
    return (
      <div  className="text-center text-center-respon scroll-animation" >
        <h2  className="text-center">DANH SÁCH SẢN PHẨM</h2>
        <div className='wrapper '>
        {this.state.products.length > 0 ? prods :
          <p className='pp'>KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO VỚI TỪ KHÓA TRÊN.</p>
        }
        </div>
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
