import React from 'react';
import tip from '../../images/tips-36-px.svg';


const Tip = () => (
  <div className="tip">
    <img alt="tip" src={tip} />
    <p><span className="bold">Tip:</span> Around 50 percent of orangutans have fractured bones, due to falling out of trees on a regular basis.</p>
  </div>
)

export default Tip;