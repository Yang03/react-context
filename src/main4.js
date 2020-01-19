import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PinchToZoom from 'react-pinch-and-zoom'
import {
  Carousel,
  Popup
} from 'zarm'

import 'zarm/dist/zarm.min.css'

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

function getDistance(touches) {
  return Math.sqrt(
    (touches[0].clientX - touches[1].clientX) ** 2 +
    (touches[0].clientY - touches[1].clientY) ** 2
  );
}

function range(num, min, max)  {
  return Math.min(Math.max(num, min), max)
}

let startDistance = 0
let moving = false
let zooming = false
let scale = 1
let startMoveX = 0
let startMoveY = 0
let moveX = 0
let moveY = 0
let maxMoveX = 0
let maxMoveY = 0
let deltaX = 0
let deltaY = 0
let startX = 0
let startY = 0
let startScale = scale

function App() {
  const [style, setStyle] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)

  function startZoom(event) {
    moving = false;
    zooming = true;
    startScale = scale
    startDistance = getDistance(event.touches);
  }

  function startMove(event) {
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    moving = true;
    startMoveX = moveX
    startMoveY = moveY
    maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
    maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
  }

  function onImageTouchStart(event) {
    const { touches } = event
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    if (touches.length === 1 && scale !== 1) {
      startMove(event)
    } else if (touches.length === 2) {
      startZoom(event)
    }
  }

  function onImageTouchMove(event) {
     const { touches } = event
     deltaX = touches.clientX - startX
     deltaY = touches.clientY - startY
    if (moving || zooming) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (moving) {
      const x = deltaX + startMoveX
      const y = deltaY = startMoveY
      moveX = range(x, -maxMoveX. maxMoveX)
      moveY = range(y, -maxMoveY, maxMoveY)
    }

    if (zooming && touches.length === 2) {
      const distance = getDistance(touches)
      const temp = startScale * distance / startDistance
      scale = range(temp, 1, 3)
      setStyle({
        transform: `scale3d(${scale}, ${scale}, 1) translate(${
          moveX / scale}px, ${moveY / scale}px)`
      })
    }
  }

  function onImageTouchEnd(event) {
    if (moving || zooming) {
      let stopPropagation = true

      if (moving && startMoveY === moveX && startMoveY === moveY) {
        stopPropagation = flase
      }

      if (event.touches.length) {
        moving = false
        zooming = false
        startMoveX = 0
        startMoveY = 0
        startScale = 1
      }

      if (stopPropagation) {
        event.stopPropagation()
        event.preventDefault()
      }
    }
    
  }
  const contentRender = () => {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <img src={item} 
            alt=""
            style={activeIndex === 0 ? style : {}}
            draggable={false} 
            onTouchStart={onImageTouchStart}
            onTouchMove={onImageTouchMove}
            onTouchEnd={onImageTouchEnd}
            // touchcancel={onImageTouchEnd}
          />
      </div>
    );
  });
}

  return (<div>
     <Popup
          visible={true}
          direction="center"
          width="100%"
          afterClose={() => console.log('关闭')}
        >
          <Carousel
            onChange={(index) => {
              setActiveIndex(index)
              console.log(`onChange: ${index}`);
            }}
            showPagination={false}
          >
            {contentRender()}
          </Carousel>
        </Popup>
  </div>)
}

ReactDOM.render( < App / > , document.getElementById('root'))