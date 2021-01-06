import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal,
  Carousel,
  Button
} from 'zarm'

import 'zarm/dist/zarm.min.css'

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

const contentRender = () => {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <img src={item} alt="" draggable={false} />
      </div>
    );
  });
}

export default class Demo extends React.Component {
  state = {
    visible: false,
    activeIndex: 0
  }
  onChange = (index) => {
    this.setState({
      visible: true,
      activeIndex: index
    })
  }
  render() {
    const { visible, activeIndex } = this.state
    return (<div>
      <Button onClick={() => this.onChange(0)}>1</Button>
      <Button onClick={() => this.onChange(1)}>2</Button>
      <Button onClick={() => this.onChange(2)}>3</Button>
      <Modal visible={visible}>
        <Carousel
          activeIndex={activeIndex}
          onChange={(index) => {
            console.log(`onChange: ${index}`);
          }}
        >
          {contentRender()}
        </Carousel>
      </Modal>
    </div>)
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'))