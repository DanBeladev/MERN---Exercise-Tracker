import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


export default class EditExercise extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName :'',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
componentDidMount (){
  axios.get('http://localhost:3000/exercises/'+this.props.match.params.id)
  .then(response => {
    this.setState({
      userName:response.data.userName,
      description:response.data.description,
      duration:response.data.duration,
      date:new Date(response.data.date)
    })
  })
  .catch(err => console.log(err))

  axios.get('http://localhost:3000/users/')
  .then(response => {
    if(response.data.length>0){
      this.setState({
        users: response.data.map(user=>user.userName),
        userName:response.data[0].userName
      })
    }
  })
}

onChangeUserName = (e) => {
  this.setState({userName:e.target.value});
}
onChangeDescription = (e) => {
  this.setState({description:e.target.value});
}
onChangeDuration = (e) => {
  this.setState({duration:e.target.value});
}
onChangeDate = (date)=> {
  this.setState({date:date});
}

onSubmit=(e)=> {
  e.preventDefault();
  const exercise = {
    userName:this.state.userName,
    description:this.state.description,
    duration:this.state.duration,
    date:this.state.date,
  }

  console.log(exercise);
  axios.post('http://localhost:3000/exercises/update/'+this.props.match.params.id,exercise)
  .then(res => console.log(res.data))
  .catch(err => console.log('Error '+ err))
  window.location = '/';
}
     render() {
        return(
          <div>
            <h3>Edit New Exercise Log</h3>
            <form onSubmit ={this.onSubmit}>
              <div className="form-group">
                <label>Username: </label>
                <select ref="userInput"
                required
                className="form-control"
                value={this.state.userName}
                onChange={this.onChangeUserName}>
                  {
                    this.state.users.map(function(user){
                      return <option 
                      key={user}
                      value={user}>{user}
                      </option>
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Description: </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                type="text"
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                <DatePicker 
                selected ={this.state.date}
                onChange={this.onChangeDate}
                  />
                  </div>
              </div>
              <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
     }
}

