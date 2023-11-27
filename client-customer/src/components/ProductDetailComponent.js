import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
class ProductDetail extends Component {
    static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  
  }
  render() {
    const font={
      fontWeight:"600"
    }
    const font2={
      color:"red"

    }
  
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div  className="align-center fullboxdetail scroll-animation">
          <h2 className="text-centerr scroll-animation2">CHI TIẾT SẢN PHẨM</h2>
          <figure className="caption-right scroll-animation2">
            <img className='imagedetailrespon' src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption className='figurerespon '>
              <form >
                <table >
                  <tbody style={font} >
                    {/* <tr >
                      <td align="right">ID:</td>
                      <td style={font2}>{prod._id}</td>
                    </tr> */}
                    <tr >
                      <td align="right">NAME:</td>
                      <td style={font2}>{prod.name}</td>
                    </tr>
                    <tr >
                      <td align="right">PRICE:</td>
                      <td style={font2}>{prod.price}</td>
                    </tr>
                    <tr>
                      <td align="right">CATEGORY:</td>
                      <td style={font2}>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Description:</td>
                        <td style={font2}>
                       <div className="">
                        {prod.description}
                       </div>
                       </td>
                  </tr>
                    <tr>
                      <td align="right">QUANTITY:</td>
                      <td ><input type="number" min="1" max="99"  value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}   /></td>
                    </tr>
                    <tr >
                      <td></td>
                      <td><input className='but buttonStyle' type="submit" value="THÊM VÀO GIỎ" onClick={(e) => this.btnAdd2CartClick(e)}   /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    
    return (<div />);
  }
 
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thêm giỏ hàng thành công');
    } else {
      alert('Hãy chọn số lượng');
    }
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);
