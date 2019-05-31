import React, { createContext, PureComponent, Component } from 'react'



const createProvider = (setProvider, Provider, initialState) => 
    class EnhanceProvider extends Component {
        constructor(props) {
            super(props)
            this.state = props.initialState || initialState
            setProvider(this)
        }
        render() {
            return (<Provider value={this.state}>{this.props.children}</Provider>)
        }
    }



class Prevent extends PureComponent {
    render() {
        const {renderComponent, ...rest} = this.props
        return renderComponent(rest)  
    }
}
const createConnect = (Consumer) => {
    return (mapStateToProps) => {
        return (WrappedComponent) => {
            const renderComponent = (props) => {
                return <WrappedComponent {...props}/>
            }
            const ConnectedComponent = (props) => {
                return (
                    <Consumer>
                        {
                            (state) => {
                                console.log(mapStateToProps)
                                const filteredState = mapStateToProps(state || {}, props)
                                return (<Prevent renderComponent={renderComponent} {...props} {...filteredState} />)
                            }
                        }
                    </Consumer>
                )
            }
            return ConnectedComponent
        }
       
    } 
}

const createStore = ({
    initialState,
    actionsCreators = {}
}, middlewares = []) => {
    const context = createContext()
    let providerObj 
    const setProvider = self => {
        const initaializedMiddlewares = middlewares.map(middleware => 
            middleware({initialState, actionsCreators}, self, actions))
        providerObj = {
            setState: (state, callback) => self.setState(state, callback),
            initaializedMiddlewares
        }     
    }

    let state = initialState
    const setState = (action, result, ...args) => {
        state = {...state, ...result}
        return new Promise(resolve => {
            providerObj.setState(state, () => {
                providerObj.initaializedMiddlewares.forEach(m  => m(action, ...args))
            })
            resolve()
        })
    }

    const actions = Object.keys(actionsCreators).reduce((r, v) => ({
        ...r, [v]: (...args) => {
            if (!providerObj) {
                console.error('<provider/> is not initialized yet')
            }
            const result = actionsCreators[v](state, actions, ...args) 
            return result.then 
            ? result.then(result => setState(v, result, ...args))
            : setState(v, result, ...args)
        }
    }), {})

    const Provider = createProvider(setProvider, context.Provider, initialState)
    const connect = createConnect(context.Consumer)
    const getState = () => {
        return state
    }

     return {
         Provider,
         connect,
         actions,
         getState 
     }
}

export default createStore