import React from 'react';
import chevDown from '../../images/chervon-down-copy-2.svg';
import library from '../../images/group.svg';

const ExerciseInfoBlock = () => (
  <div className="exercise__info wrap">
    <div><p className="exercise__title">Excercise 1 — Addition</p></div>
    <div className="lesson__wrap"><span className="lesson__info">DIFFICULTY: BASIC <img alt="chevron down" src={chevDown} /></span><span className="break"></span><span className="lesson__info"><img alt="chevron down" src={library} />VIEW LESSON</span></div>
  </div>
)

export default ExerciseInfoBlock;