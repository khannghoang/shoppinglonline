import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    const number={
    backgroundColor:" #6A7CE0",
    }
    const full={
      borderRadius: "15px",
      borderTopRightRadius:"0px",
      borderBottomRightRadius:"0px",
      padding: "20px",
      backgroundColor: "white",
      width: "1060px",
      margin: "0 auto",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      marginTop:"20px",
      height:"570px"
    }
    const table={
      border:" 1px solid #fff",
      marginLeft:"80px",
      width:"900px"
    }
    

    return (
      <div>
        <div style={full} className="float-left">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table style={table} className="datatable" border="1">
            <tbody >
              <tr className="datatable">
                <th>ID</th>
                <th >Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
                <td style={number} colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        {/* <ProductDetail item={this.state.itemSelected} /> */}
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;