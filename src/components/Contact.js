import React from 'react';

export default () => {
  return (
    <div id="instant-message">
      <img className="car" src={require('../images/car3.png')} />
      <p>
        אם יש לכם שאלות הערות המלצות או שינויים,
        אנא שלחו לנו במייל
    </p>
      <div >
        <a id="mail" href="mailto:timorss@gmail.com" target="_top">timorss@gmail.com</a>
      </div>
    </div>
  )
}
