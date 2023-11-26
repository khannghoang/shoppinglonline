import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      txtDescription: '',
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    const full={
      borderRadius: "15px",
      borderTopLeftRadius:"0px",
      borderBottomLeftRadius:"0px",
      padding: "10px",
      backgroundColor: "white",
      width: "300px",
      margin: "0 auto",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
      marginTop:"20px",
      height:"620px"
      // marginRight:
    }
    const detail={
      padding:"2px",
      borderRadius:"5px",
      width:"200px"
    }
    const button={
      borderRadius: "15px",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "rgb(118, 74, 188)",
      color: "white",
      border: "none",
      cursor: "pointer",
      textAlign: "center",
      margin:"5px",
      position:"relative",
      right:"17%",
    }
   
    const flex ={
      display:"flex",
    }
   
    const addnew={
      borderRadius: "15px",
      padding: "10px",
      backgroundColor: "white",
      width: "280px",
      boxShadow: "0px 5px 15px 10px rgba(0,0,0,0.1)",
    }
    const picture={
      marginTop:"20px"
    }
    
    return (
    <div style={full} className="float-right">
      <div style={addnew}> 
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <div >
              <tr>
                <td>ID</td>
                <td><input style={detail} type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td>Tên</td>
                <td><input style={detail} type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Giá</td>
                <td><input style={detail} type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Mô Tả</td>
                <td><input style={detail} type="text" value={this.state.txtDescription} onChange={(e) => { this.setState({ txtDescription: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Image</td>
                <td><input style={detail} type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td><select style={detail} onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select></td>
              </tr>
              <tr>
                <td></td>
                <td  style={flex}>
                  <input className='but'  style={button} type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input className='but' style={button} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input className='but' style={button} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
              </div>
            </tbody>
          </table>
        </form>
      </div>
        <div style={picture}>
            <div colSpan="2"><img src={this.state.imgProduct} width="300px" height="275px" alt="" /></div>
        </div>
    </div>
      
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtDescription: this.props.item.description,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const description = this.state.txtDescription;
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price,description:description, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Hãy nhập tên, giá, mô tả và hình ảnh để thêm sản phẩm');
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÊM THÀNH CÔNG');
        this.apiGetProducts();
      } else {
        alert('THÊM KHÔNG THÀNH CÔNG');
      }
    });
  }
   // event-handlers
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const description = this.state.txtDescription;
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, description: description, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Hãy nhập tên, giá, mô tả và hình ảnh để cập nhật sản phẩm');
    }
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('CẬP NHẬT THÀNH CÔNG!');
        this.apiGetProducts();
      } else {
        alert('CẬP NHẬT KHÔNG THÀNH CÔNG!');
      }
    });
  }
   // event-handlers
   btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('BẠN CHẮC CHẮN MUỐN XÓA')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('HÃY NHẬP ID');
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('XÓA THÀNH CÔNG!');
        this.apiGetProducts();
      } else {
        alert('XÓA KHÔNG THÀNH CÔNG');
      }
    });
  }
}
export default ProductDetail;
