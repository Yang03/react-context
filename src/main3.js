import React from 'react'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'
import Picker from './picker'
import {
    Popup as Popup2
} from 'zarm/lib'

import {
    Picker as Picker2
} from 'zarm/lib'
import Popup from './popup'
import 'zarm/dist/zarm.min.css'
import './main3.css'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //dataSource: ['选项一', '选项二', '选项三', '选项四'],
            dataSource: [{
                    value: '1',
                    label: '选项一'
                },
                {
                    value: '2',
                    label: '选项二'
                },
            ],
            value: '',
            visible: false
        }
        this.wheelWrapper = null
        this.wheels = []
    }
    
    render() {
        const { visible, value, dataSource} = this.state
        return (
            <div>
                <div onClick={() => this.setState({visible: true})}>open</div>
                <Picker2
                visible={visible}
                value={value}
                dataSource={dataSource}
                onOk={(selected) => {
                    console.log('Picker onOk: ', selected);
                    this.setState({
                        visible: false
                    })
                }}
                onCancel={() => this.setState({visible: false})}
                />
                {/* <Picker  dataSource={this.state.dataSource}/> */}

                {/* <Popup visible={this.state.visible}>
                    <Picker  dataSource={this.state.dataSource}/>
                </Popup> */}

                {/* <Popup2 mask={false} visible={this.state.visible}>
                    <Picker  dataSource={this.state.dataSource}/>
                </Popup2> */}
        </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))