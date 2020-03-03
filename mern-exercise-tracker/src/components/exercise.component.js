import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Excercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.exercise.userName}</td>
        <td>{this.props.exercise.description}</td>
        <td>{this.props.exercise.duration}</td>
        <td>{this.props.exercise.date.substring(0, 10)}</td>
        <td>
          <Link to={"/edit/" + this.props.exercise._id}>
            <button className="btn btn-outline-primary">edit</button>
          </Link>{"  "} | {"  "} 
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.deleteExercise(this.props.exercise._id);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
}
