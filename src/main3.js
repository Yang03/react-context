import React from 'react'
import ReactDOM from 'react-dom'
import { Popup } from 'zarm/lib'
import BScroll from 'better-scroll'
import Picker from './picker'

import 'zarm/dist/zarm.min.css'
import './main3.css'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: ['选项一', '选项二', '选项三', '选项四'],
            visible: false
        }
        this.wheelWrapper = null
        this.wheels = []
    }
    
    render() {
        return (
            <div>
                <div onClick={() => this.setState({visible: true})}>open</div>
                <Picker  dataSource={this.state.dataSource}/>

                <Popup visible={this.state.visible}>
                    <Picker  dataSource={this.state.dataSource}/>
                </Popup>
        </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))