import React, { Component } from 'react';
import './App.css';
import { incrementAttempts } from "./actions";
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import exercises from './codetests';
import { valsRef } from "./firebase";

import 'brace/mode/javascript';
import 'brace/theme/monokai';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      value: exercises.exercise1[0],
      exercise: exercises.exercise1,
      error: false,
      title: 'exercise1',
      attempts: 0,
      errors: 0
    }
  }
  componentDidMount() {
    valsRef.set(0);
  }

  exerChange = e => {
    const exercise = e.target.value.toLowerCase().replace(/ /g,'');
    this.setState({
      title: e.target.value,
      value: exercises[exercise],
      exercise
    })
  }
  
  onChange = newValue => {
    try {
      this.setState({
        value: newValue,
      })
      } catch(e) {
        console.log(e);
      }
  }
  
  onClick = () => {
    const { value, exercise } = this.state;
    try {
      var result = eval(value);
      this.setState({
        result,
        error: result === exercise[1]
      })
      } catch(e) {
        console.log(e);
      }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.attempts !== this.props.attempts) {
      valsRef.set(nextProps.attempts);
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CLC Student</h1>
        </header>
        <div>
          <div className="header"> 
            <h1>JavaScript for Beginners</h1>
            <p>Oct 27, 2018</p>
          </div>
          <div className="main__wrap">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onClick={this.onClick}
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: false}}
              width="855px"
              value={this.state.value}
              debounceChangePeriod={1000}
            />
          </div>
        </div>
        <div className="output">
        Your output is: {this.state.result || ''}
        <p>{this.state.error ? 'no error' : 'error'}</p>
        </div>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attempts: state.attempts };
};

export default connect(mapStateToProps, { incrementAttempts })(App);