import React from 'react'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'


export default class Popup extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
   
    }
    render() {
        const { visible } = this.props
        if (!visible) return null
        return ReactDOM.createPortal(
            <div className="popup-container">
                <div className="za-popup za-popup--bottom za-popup--mask">
                    <div className="za-popup__wrapper">
                        <div className="picker-content">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="za-mask za-mask--normal"></div>
                   
                </div>
               
            </div>
        , document.body)
    }
}