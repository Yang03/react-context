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
  console.log('____________range', num, min, max)
  return Math.min(Math.max(num, min), max)
}

let startDistance = 0
let moving = false
let zooming = false
let scale = 3
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
let maxScale = 5

function App() {
  const [style, setStyle] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)

  function startZoom(event) {
    console.log('startZoom')
    moving = false;
    zooming = true;
    startScale = scale
    startDistance = getDistance(event.touches);
  }

  function startMove(event) {
    console.log('startMove', '______________>')
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();
    console.log(rect, ':--------rect:--------')
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    moving = true;
    startMoveX = moveX
    startMoveY = moveY
    maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
    maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
    // console.log(maxMoveY, maxMoveX, '<____________________________')
  }

  function onImageTouchStart(event) {
    // console.log('onImageTouchStart')
    const { touches } = event
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    if (touches.length === 1 && scale !== 1) {
      startMove(event)
    } else if (touches.length === 2) {
      startZoom(event)
    }
     // startMove(event)
  }

  function onImageTouchMove(event) {
    // console.log('onImageTouchMove')
     const { touches } = event
     deltaX = touches[0].clientX - startX
     deltaY = touches[0].clientY - startY
     // console.log('touches.clientX', touches.clientX)
    if (moving || zooming) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (true) {
      const x = deltaX + startMoveX
      const y = deltaY + startMoveY
      // console.error('moving:',y)
      moveX = range(x, -maxMoveX, maxMoveX)
      moveY = range(y, -maxMoveY, maxMoveY)

      setStyle({
        transform: `scale3d(${scale}, ${scale}, 1) translate(${
          moveX / scale}px, ${moveY / scale}px)`
      })
    }

    // console.log('moving2:', moveX, moveY)

    // console.log('moveX:', moveX, 'moveY:', moveY)
    if (zooming && touches.length === 2) {
     // console.log('setStyle------->')
     const distance = getDistance(touches)
     const temp = startScale * distance / startDistance
     // console.log('temp-scale:------->:', temp)
      scale = range(temp, 1, maxScale)

      // console.log(moveY, moveX)
      // //console.log('scale:------->:', scale, moveX, moveY)

      // console.log({
      //   transform: `scale3d(${scale}, ${scale}, 1) translate(${
      //     moveX / scale}px, ${moveY / scale}px)`
      // })
      setStyle({
        transform: `scale3d(${scale}, ${scale}, 1) translate(${
          moveX / scale}px, ${moveY / scale}px)`
      })
    }
  }

  function onImageTouchEnd(event) {
    // console.log('onImageTouchEnd')
    if (moving || zooming) {
      let stopPropagation = true

      if (moving && startMoveY === moveX && startMoveY === moveY) {
        stopPropagation = false
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
//   const contentRender = () => {
//   return ITEMS.map((item, i) => {
//     return (
//       <div className="carousel__item__pic" key={+i}>
//         <img src={item} 
//             alt=""
//             style={parseInt(activeIndex, 10) === i ? style : {}}
//             draggable={false} 
//             onTouchStart={onImageTouchStart}
//             onTouchMove={onImageTouchMove}
//             onTouchEnd={onImageTouchEnd}
//             // touchcancel={onImageTouchEnd}
//           />
//       </div>
//     );
//   });
// }
  console.log(style)
  return (<div className="box">
     {/* <Popup
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
        </Popup> */}
        <img
        src="https://static.zhongan.com/website/health/zarm/images/banners/1.png"
        style={style} 
        onTouchEnd={onImageTouchEnd}
        onTouchMove={onImageTouchMove}
        onTouchStart={onImageTouchStart}
        />
  </div>)
}

ReactDOM.render( < App / > , document.getElementById('root'))