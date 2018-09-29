import React, { Component } from 'react';
import './App.css';
import { incrementAttempts } from "./actions";
import posed from 'react-pose';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import exercises from './codetests';
import { attemptsRef, errorsRef } from "./firebase";

import 'brace/mode/javascript';
import 'brace/theme/monokai';


class App extends Component {

  state = {
    result: '',
    value: exercises.exercise1[0],
    exercise: exercises.exercise1,
    error: 'loaded',
    title: 'exercise1',
    errors: 0
  }

  componentDidMount() {
    attemptsRef.set(0);
    errorsRef.set(0);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.attempts !== this.props.attempts) {
      attemptsRef.set(nextProps.attempts);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.error) {
      return errorsRef.set(nextProps.attempts);
    } else {
      return true;
    }
  }

  // exerChange = e => {
  //   const exercise = e.target.value.toLowerCase().replace(/ /g,'');
  //   this.setState({
  //     title: e.target.value,
  //     value: exercises[exercise],
  //     exercise
  //   })
  // }
  
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
    this.props.incrementAttempts();
    const { value, exercise } = this.state;
    const result = eval(value);
    const errorState = result !== exercise[1];
    try {
      this.setState({
        result,
        error:errorState
      })
      } catch(e) {
        console.log(e);
      }
  }


  PopIn = () => {
    const { error } = this.state;
    if(error === true) {
      return (
        <div className="error code-status">Sorry, we couldn’t complete your request Please try again later.</div>
      )
    } else if (!error) {
      return (
        <div className="success code-status">Nice you got it!</div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CLC Student</h1>
        </header>
        <div>
          <div className="header"> 
            <div className="inner-wrap">
              <h1>JavaScript for Beginners</h1>
              <p>Oct 27, 2018</p>
            </div>
          </div>
          <div className="main__wrap">
          <div>
            <div className="inner-wrap">
              <div><p>Excercise 1 — Addition</p></div>
              <div><span>DIFFICULTY: BASIC</span> <span>VIEW LESSON</span></div>
            </div>
          </div>
            <div className="inner-wrap">
              <button onClick={this.onClick} className="code-run-button">RUN CODE</button>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  onClick={this.onClick}
                  onChange={this.onChange}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{$blockScrolling: false}}
                  width="855px"
                  height="350px"
                  value={this.state.value}
                  debounceChangePeriod={1000}
                  showGutter={false}
                  showPrintMargin={false}
                  className="code_pad"
                />
                <div className="popin">
                  {this.PopIn()}
                </div>
                <div className="tip">
                  <p>Tip: Around 50 percent of orangutans have fractured bones, due to falling out of trees on a regular basis.</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attempts: state.attempts };
};

export default connect(mapStateToProps, { incrementAttempts })(App);