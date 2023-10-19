import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
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
      height:"370px"
    }
    const table={
      border:" 1px solid #fff",
      marginLeft:"80px",
      width:"900px",
      fontSize:"20px",
      marginBottom:"30px"
      
    }
    // const footer={
    //   padding: "100px",
    //   backgroundColor: "white",
    //   width: "1260px",
    //   margin: "0 auto",
    //   boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
    //   marginTop:"40px",
    // }
    return (
      <div>
        <div style={full} className="float-left">
          <h2 className="text-center">CATEGORY LIST</h2>
          <table style={table} className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
        <div  className='footer'>
          
        </div>
      </div>
     
    );
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;