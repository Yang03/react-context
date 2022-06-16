import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll';

import './index.scss'

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10]

function Test() {

  const el = useRef();
  useEffect(() => {
    new BScroll(el.current, {
      click: true,
      // probeType: 3,
    })
  }, [])

  const goTo = () => {
    console.log('test')
  }

  return (
    <div>
      <div className="header">header</div>
      <div className="flex">
        <div className="menu">menu</div>
        <div className="wrapper" ref={el}>
          <div div="content">
              {
                data.map((item) => <div key={item} className="item" onClick={goTo}>{item}</div>)
              }
          </div>
        </div>
      </div>
    </div>
  )
}


ReactDOM.render(
  <Test />,
  document.getElementById('app')
)