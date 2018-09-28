import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchAnswers } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  componentWillMount() {
    this.props.fetchAnswers();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CLC Student Portal</h1>
        </header>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    );
  }
}


export default connect(null, { fetchAnswers })(App);