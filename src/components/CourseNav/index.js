import React from 'react';
import left from '../../images/icon-arrowright-18-px-copy.svg';
import right from '../../images/icon-arrowright-18-px.svg';

const CourseNav = () => (
  <div className="wrap footer__nav">
    <div className="footer__item footer__item--left"><img src={left} alt="left arrow" />INTRODUCTION</div>
    <div className="footer__item footer__item--right">EXCERCISE 2: SUBTRACTION<img src={right} alt="left arrow" /></div>
  </div>
)

export default CourseNav;