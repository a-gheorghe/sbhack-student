import React, { Component } from 'react';
import './App.css';
import { incrementAttempts } from "./actions";
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import exercises from './config/codetests';
import { attemptsRef, errorsRef } from "./config/firebase";
import Header from './components/Header';
import Toast from './components/Toast';
import CourseNav from './components/CourseNav';
import Tip from './components/Tip';
import AtendeeBlock from './components/AttendeeBlock';
import ExerciseInfoBlock from './components/ExerciseInfoBlock';

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
    if (nextProps.attempts !== this.props.attempts) {
      attemptsRef.set(nextProps.attempts);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.error) {
      return errorsRef.set(nextProps.attempts);
    } else {
      return true;
    }
  }

  onChange = newValue => {
    try {
      this.setState({
        value: newValue,
      })
    } catch (e) {
      console.log(e);
    }
  }

  onClick = () => {
    this.props.incrementAttempts();
    const { value, exercise } = this.state;
    let result;
    try {
      result = eval(value);
    } catch (e) {
      console.log(e);
    }
    const errorState = result !== exercise[1];
    try {
      this.setState({
        result,
        error: errorState
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { error, result } = this.state;
    return (
      <div className="App fadeIn">
        <div className="main__wrap">
          <Header />
          <AtendeeBlock attendee="Holly" mentor="Simon" />
          <ExerciseInfoBlock />
          <div className="inner-wrap wrap">
            <button onClick={this.onClick} className="code-run-button">RUN CODE</button>
            <AceEditor
              mode="javascript"
              theme="monokai"
              onClick={this.onClick}
              onChange={this.onChange}
              showGutter={true}
              editorProps={{ $blockScrolling: false }}
              width="855px"
              height="350px"
              value={this.state.value}
              debounceChangePeriod={1000}
              showPrintMargin={false}
              className="code_pad"
              setOptions={{
                showLineNumbers: true
              }}
            />
            <div className="popin">
              {Toast(error, result)}
            </div>
            <Tip />
          </div>
          <CourseNav />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attempts: state.attempts };
};

export default connect(mapStateToProps, { incrementAttempts })(App);