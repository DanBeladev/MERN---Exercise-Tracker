import React, { Component } from "react";
import axios from "axios";
import Excercise from './exercise.component'

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excercises: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/exercises/")
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ excercises: response.data });
      }
    })
    .catch(err => console.log(err))
  }

  deleteExercise = (id) => {
    axios.delete('http://localhost:3000/exercises/'+id)
    .then(res=> console.log(res.data));
    this.setState({excercises: this.state.excercises.filter(ex=>ex._id !== id)})
  }

  exerciseList = () => {
    return this.state.excercises.map(currentexercise => {
      return <Excercise 
      key={currentexercise._id}
      exercise={currentexercise}
      deleteExercise={this.deleteExercise} />
    })
  }

  render() {
    return (
      <div>
       <h3>Logged Exercises</h3>
       <table className="table">
         <thead className="thead-light">
           <tr>
             <th>Username</th>
             <th>Description</th>
             <th>Duration</th>
             <th>Date</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {this.exerciseList()}
         </tbody>
       </table>
      </div>
    );
  }
}
