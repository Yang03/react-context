import React from 'react'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'


export default class Picker extends React.Component {
    constructor(props) {
        super(props)
        this.wheelWrapper = null
        this.wheels = null
    }
    componentDidMount() {

        // for (let i = 0; i < this.props.dataSource.length; i++) {
            
        // }
        //}

        this.wheels = new BScroll(this.wheelWrapper, {
            wheel: {
                selectedIndex: 0,
                /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item'
            },
            probeType: 3
        })
        this.wheels.on('scrollEnd', () => {
            alert(this.wheels.getSelectedIndex())
            //alert(this.wheels[i].getSelectedIndex())
        })

    }
    render() {
        const { dataSource } = this.props
        return (
            <div>
                    <div className="picker-content">
                        <div className="mask-top"></div>
                        <div className="mask-bottom"></div>
                        <div className="wheel-wapper">
                            <div className="wheel" ref={(el) => {this.wheelWrapper = el; console.log(this.wheelWrapper)}}>
                                
                                <ul className="wheel-scroll">
                                    {
                                        dataSource.map((item, index) => <li className="wheel-item" key={+index}>{item}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}