import React from 'react';
import simon from '../../images/ana-profile-pic-copy@2x.png';

const AntendeeBlock = props => (
  <div className="header wrap"> 
    <div>  
      <h1 className="course__title">Hi, {props.attendee}</h1>
      <p className="course__date">You’re learning JavaScript for Beginners</p>
    </div>
    <div className="mentor__block">
      <img src={simon} alt="mentor" />
      <p>Your mentor is <span>{props.mentor}</span></p>
    </div>
  </div>
)

export default AntendeeBlock;