import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Link } from 'react-router-dom'
import simon from './images/ana-profile-pic-copy@2x.png';
import illus from './images/group-3@2x.png';
import next from './images/icon-arrowright-18-px.svg';

export default class Onboarding extends Component {
  state = {
    currentSlide:0
  }
  componentDidMount() {
    setTimeout(() => { 
      this.setState({ currentSlide: 1 })
    }, 3000)
  }

  renderSlide = () => {
    const { currentSlide } = this.state;
    if(currentSlide === 0) {
      return (
        <div>
          <h1 className="welcome__title">Welcome to class, Holly</h1>
          <p className="welcome__byline">You'll be learning JavaScript for Beginners today</p>
          <div className="mentor__block mentor__block--onboarding">
            <img src={simon} alt="mentor" />
            <p>Your mentor is <span>Simon</span></p>
          </div>
          <img className="illus" src={illus} alt="illustrative" />
        </div>
      )
    } else if(currentSlide === 1) {
      return (
        <div className="animIn">
          <h1 className="welcome__title">Learn at your own pace!</h1>
          <p className="welcome__byline">You can review the lesson and examples at anytime.</p>
          <div className="next__button">
            <a onClick={() => this.setState({currentSlide: 2})}>NEXT</a> <img src={next} alt="right arrow" />
          </div>
        </div>
      )
    } else if(currentSlide === 2) {
      return (
        <div>
          <div className="animIn">
            <h1 className="welcome__title">Feeling the challenge?</h1>
            <p className="welcome__byline">Adjust difficulty level to how you like it.</p>
            <Link className="toApp" to='/exercise1'>LET'S START</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
       <Header />
       <div className="wrap welcome">
        {this.renderSlide()}
       </div>
      </div>
    );
  }
}