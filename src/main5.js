import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import omit from 'omit.js';
import ResizeObserver from 'rc-resize-observer';

import { Button } from 'zarm'
import 'zarm/dist/zarm.css'

function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() :
  {
    top: 0,
    bottom: window.innerHeight
  }
}

function getFixedTop(
  placeholderReact,
  targetRect,
  offsetTop,
) {
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

function getFixedBottom(
  placeholderReact,
  targetRect,
  offsetBottom,
) {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

function getPrefixCls (suffixCls, customizePrefixCls) {
  const prefixCls = 'ant'
  if (customizePrefixCls) return customizePrefixCls
  return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
}

let observerEntities = []

function addObserveTarget(target, affix) {
  if (!target) return
  let entity = observerEntities.find(item => item.target == target)

  if (entity) {
    entity.affixList.push(affix)
  } else {
    entity = {
      target,
      affixList: [affix],
      eventHandlers: {}
    }
    observerEntities.push(entity)
  }

}

class Affix extends Component {
  // offsetTop;
  // offsetBottom;
  // target;
  constructor(props) {
    super(props)
    this.state = {
      status: 0,
      lastAffix: false,
      prevTarget: null,
    }
    // this.target = getDefaultTarget()
  }

  componentDidMount() {
     console.log('DidMount')
    const { target } = this.props;
    if (target) {
      setTimeout(() => {
        addObserveTarget(target(), this);
        this.updatePosition()
      })
    }
  }

  componentDidUpdate() {
    console.log('DidUpdate')
  }

  updatePosition() {
    this.prepareMeasure()
  }

  prepareMeasure() {
    this.setState({
      status: 1,
      affixStyle: undefined,
      placeholderStyle: undefined,
    })
  }

  saveFixedNode = (node) => {
    this.fixedNode = node;
  }
  render() {
    const { children, prefixCls } = this.props
    const { affixStyle, placeholderStyle } = this.state

    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: affixStyle,
    })

    return (<div>
      {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
      <div className={className} ref={this.saveFixedNode} style={affixStyle}>
        {children}
      </div>
    </div>)
  }
}

ReactDOM.render(
  <div>
    <Affix offsetTop={100}>
      <Button>top</Button>
    </Affix>
  </div>,
  document.getElementById('root')
)