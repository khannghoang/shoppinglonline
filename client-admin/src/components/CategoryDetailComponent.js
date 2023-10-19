import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
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
      height:"390px",
  
    }
    const detail={
     marginTop:"37px"
    }
    const detail2={
      border:"1px solid black",
      borderRadius:"5px",
      padding:"2px",
      width:"197px"
    }
    const button={
      borderRadius: "15px",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "#6A7CE0",
      color: "white",
      border: "none",
      cursor: "pointer",
      textAlign: "center",
      margin:"5px",
      position:"relative",
      right:"17%",

    }
    const flex={
      display:"flex",
      marginTop:"80px",
      marginLeft:"20px"
    }
  
    return (
    <div style={full} className="float-right">
      <h2 style={detail} className="text-center">CATEGORY DETAIL</h2>
      <div>
        <form >
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td ><input style={detail2}  type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td ><input style={detail2} type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td style={flex} className='button-detail'>
                  <input className='but' style={button} type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input className='but' style={button} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input className='but'style={button} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
    );
  }
  //even-handler
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
   // event-handlers
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
    // event-handlers
    btnDeleteClick(e) {
      e.preventDefault();
      if (window.confirm('ARE YOU SURE?')) {
        const id = this.state.txtID;
        if (id) {
          this.apiDeleteCategory(id);
        } else {
          alert('Please input id');
        }
      }
    }
   // apis
   apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
   // apis
   apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}
export default CategoryDetail;