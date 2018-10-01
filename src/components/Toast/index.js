import React from 'react';
import alert from '../../images/combined-shape-copy-2.svg';
import check from '../../images/check.svg';

const Toast = (error, result) => {
  if(error === true) {
    return (
      <div className="error code-status" key={result}>
        <img src={alert} alt="no valid" />
        <p><span>Oops</span>, your code is missing something. Please check line 5.</p>
      </div>
    )
  } else if (!error) {
    return (
      <div className="success code-status" key={result}>
        <img src={check} alt="valid" />
        <p><span>Awesome job</span>, you did it!</p>
      </div>
    )
  }
}

export default Toast;