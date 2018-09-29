import React, { Component } from 'react';
import './App.css';
import { incrementAttempts } from "./actions";
import posed from 'react-pose';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import exercises from './codetests';
import { attemptsRef, errorsRef } from "./firebase";
import Header from './components/Header'

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import chevDown from './images/chervon-down-copy-2.svg';
import library from './images/group.svg';
import tip from './images/tips-36-px.svg';


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
    // dangerous, but just for POC
    // would move to sandboxed iframe in future
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
        <div className="error code-status">Your output was {this.state.result || '...nothing'}, it did not meet the expected output.</div>
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
       <Header />
        <div>
          <div className="header"> 
            <h1 className="course__title">JavaScript for Beginners</h1>
            <p className="course__date">Oct 27, 2018</p>
          </div>
          <div className="main__wrap">
          <div className="exercise__info">
            <div><p className="exercise__title">Excercise 1 — Addition</p></div>
            <div className="lesson__wrap"><span className="lesson__info">DIFFICULTY: BASIC <img alt="chevron down" src={chevDown} /></span><span className="break"></span><span className="lesson__info"><img alt="chevron down" src={library} />VIEW LESSON</span></div>
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
                  <img alt="tip" src={tip} />
                  <p><span className="bold">Tip:</span> Around 50 percent of orangutans have fractured bones, due to falling out of trees on a regular basis.</p>
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