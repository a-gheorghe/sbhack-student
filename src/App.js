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
    //this.props.incrementAttempts();
    valsRef.set(0);
  }

  exerChange = e => {
    this.setState({
      title: e.target.value,
      value: exercises[e.target.value.toLowerCase().replace(/ /g,'')],
      exercise: e.target.value.toLowerCase().replace(/ /g,'')
    })
  }
  
  onChange = newValue => {
    console.log(this.state.exercise);
    try {
      var result = eval(newValue);
      this.setState({
        value: newValue,
        result,
        error: result === this.state.exercise[1]
      })
      } catch(e) {
        console.log(e);
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
            <h1>{this.state.title}</h1>
            <select onChange={this.exerChange}>
              <option>Exercise 1</option>
              <option>Exercise 2</option>
              <option>Exercise 3</option>
            </select>
          </div>
          <div className="main__wrap">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              width="600px"
              value={this.state.value}
              debounceChangePeriod={1000}
            />
            <div className="output">
              Your output is: {this.state.result || ''}
              <p>{this.state.error ? 'no error' : 'error'}</p>
            </div>
          </div>
          <button onClick={this.props.incrementAttempts}>click</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attempts: state.attempts };
};

export default connect(mapStateToProps, { incrementAttempts })(App);