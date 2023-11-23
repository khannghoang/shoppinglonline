import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BiSolidRightArrowSquare } from "react-icons/bi";
import withRouter from '../utils/withRouter';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      currentProducts: [],
      isCategorySelected: false,
    };
  }

  componentDidMount() {
    this.apiGetCategories();
    this.apiGetNewProducts();
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
      this.setState({ isCategorySelected: true });
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ currentProducts: result, isCategorySelected: false });
    });
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ currentProducts: result, isCategorySelected: true });
    });
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ currentProducts: result, isCategorySelected: false });
    });
  }

  handleCategoryClick(categoryId) {
    this.apiGetProductsByCatID(categoryId);
  }

  render() {
    const { categories, currentProducts, isCategorySelected } = this.state;

    const styles = {
     
      listItem: {
        marginBottom: '10px',
      },
      headerBar: {
        marginBottom: '10px',
        padding:'10px'
      },
      textCenter: {
        textAlign: 'center',
        fontSize: '17px',
        fontWeight: '600',
        color: '#1d1d1f',
        marginTop: '10px',
      },
      margin:{
        marginTop:'80px',
      },
      menuToggle: {
        // Add styles for menu toggle if needed
      },
      overlay: {
        // Add styles for overlay if needed
      },
      menuRespon: {
        // Add styles for menu responsive if needed
      },
    
    };

    const cates = categories.map((item) => (
      <li key={item._id} className="" style={{ ...styles.listItem, ...styles.headerBar }}>
        <Link className="menuItemStyle hover-effect" to="#" onClick={() => this.handleCategoryClick(item._id)}>
          {item.name}
        </Link>
      </li>
    ));

    const prods = currentProducts.map((item) => (
      <div key={item._id} className="inline fullbox scroll-animation">
        <figure style={styles.margin}>
          <Link to={'/product/' + item._id}>
            <img className="imagerespon" src={'data:image/jpg;base64,' + item.image} width="250px" height="250px" alt="" />
          </Link>
          <figcaption style={styles.textCenter}>
            <div className="spanrespon truncate-text">{item.name}</div>
            <br />
            <span className="spanpricerespon  truncate-text ">Price: {item.price}</span>
          </figcaption>
        </figure>
      </div>
    ));

    return (

      <div className="sidebar-container menurespon3" style={{ display: 'flex' }}>
        <div className='sidebar'>
          <div className="menu-toggle2">
            <label htmlFor="menu-toggle2">
            <BiSolidRightArrowSquare />
            </label>
          </div>
          <input type="checkbox" id="menu-toggle2" hidden />
          <label className="overlay" htmlFor="menu-toggle2"></label>
          <div className="menurespon1 scroll-animation">
            <ul className="ul " style={{ padding: 0, listStyleType: 'none' }}>
              <li className="hoverr " style={styles.headerBar}>
                <strong>Danh mục sản phẩm</strong>
              </li>
              {cates}
            </ul>
          </div>
        </div>

        <div className='productList'>
          <h2 className="text-center" style={styles.textCenter}>
            {isCategorySelected ? 'LIST PRODUCTS' : 'NEW PRODUCTS'}
          </h2>
          <div className="wrapper">{prods}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shop);
