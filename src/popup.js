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
        return ReactDOM.createPortal(
            <div className="popup">
                {this.props.children}
            </div>
        , document.body)
    }
}