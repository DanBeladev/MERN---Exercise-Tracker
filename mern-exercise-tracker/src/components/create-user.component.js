import React, { Component } from "react";
import axios from 'axios'

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      phone: "",
      query:"",
      usersByQuery:[]
    };
  }
  onChangeUserName = e => {
    this.setState({ userName: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangePhone = e => {
    this.setState({ phone: e.target.value });
  };

  onChangeQuery = e => {
    this.setState({ query: e.target.value });
  };
//userName=dan
  getUsersByQuery = () =>{
    axios.get(`http://localhost:3000/users/search?${this.state.query}`)
    .then(res =>this.setState({usersByQuery:res.data}))
    .catch(err=>console.log('error in get users by query: ',err));
  }

  renderUsers = () => {
    // console.log('IN RENDER FUNC- USERS IS:')
    const users = [...this.state.usersByQuery];
    return users.map(user=> <h1 key={user._id}>user: {user.userName}</h1>)
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
      email: this.state.email,
      phone: this.state.phone,
    };

    console.log(user);

    axios.post('http://localhost:3000/users/add',user)
    .then(res =>console.log(res.data));
    
    this.setState({ userName: "" });
    this.setState({ email: "" });
    this.setState({ phone: "" });
    // window.location = '/';
  };
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
            required
            className="form-control"
            value={this.state.userName}
            onChange={this.onChangeUserName} />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="text"
            required
            className="form-control"
            value={this.state.email}
            onChange={this.onChangeEmail} />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input type="text"
            required
            className="form-control"
            value={this.state.phone}
            onChange={this.onChangePhone} />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        <div className="form-group">
        <input type="text"
            required
            className="form-control"
            value={this.state.query}
            onChange={this.onChangeQuery} />
        <button className="btn btn-warning" onClick={this.getUsersByQuery}>Get Users By Query</button>
        {this.renderUsers()}
        </div>
      </div>
    );
  }
}
