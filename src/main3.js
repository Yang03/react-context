import React from 'react'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'
import Picker from './picker'
import {
    Popup as Popup2
} from 'zarm/lib'


import {
    PickerView as PickerView2
} from 'zarm/lib'

import {
    Picker as Picker2
} from 'zarm/lib'
import Popup from './popup'
import 'zarm/dist/zarm.min.css'
 import './main3.css'


 const CASCADE_DATA = [{
         code: '1',
         label: '北京市',
         children: [{
                 code: '11',
                 label: '海淀区'
             },
             {
                 code: '12',
                 label: '西城区'
             },
         ],
     },
     {
         code: '2',
         label: '上海市',
         children: [{
                 code: '21',
                 label: '杨浦区'
             },
             {
                 code: '22',
                 label: '静安区'
             },
         ],
     },
 ];


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource2: ['选项一', '选项二', '选项三', '选项四'],
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
            visible: false,
            dataSource3: CASCADE_DATA,
            value3: ['1', '2']
        }
        this.wheelWrapper = null
        this.wheels = []
    }
    
    render() {
        const { visible, value, dataSource} = this.state
        return (
            <div>
                <div onClick={() => this.setState({visible: true})}>open</div>
                {/* <Picker2
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
                /> */}
                {/* <Picker  dataSource={this.state.dataSource}/> */}

                <Popup2 visible={this.state.visible} mask={false}>
                    {/* <Picker dataSource={this.state.dataSource2}/> */}
                    <PickerView2  dataSource={this.state.dataSource3} value={this.state.value3} valueMember="code" onChange={selected => console.log('PickerView onChange: ', selected)}/>
                </Popup2>

                {/* <Popup2 mask={false} visible={this.state.visible}>
                    <Picker  dataSource={this.state.dataSource}/>
                </Popup2> */}
        </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))