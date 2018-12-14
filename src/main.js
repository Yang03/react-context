import React, { createContext, Component } from 'react'
import ReactDOM from 'react-dom'
import {
    Provider,
    Consumer,
    actions,
    connect
} from './stroe'

// const Context = createContext()
// const ContextProvider = Context.Provider
// const ContextConsumer = Context.Consumer

// function Test() {
//     return (
//         <ContextProvider value={{name: 'yp'}}>
//             <ContextConsumer>
//                 {
//                     (context) => (
//                         <div>{context.name}</div>
//                     )
//                 }
//             </ContextConsumer>
//         </ContextProvider>
//     )
// }



let User = ({ user }) => {
    console.log(user)
    return user && <img src={user.avatar} width={50} alt="avatar" />
  }
  
  
const mapStatToProps = ( {user}) => {
    return {
        user
    }
}
//User = connect( ({user }) => ({ user }))(User)
User = connect(mapStatToProps)(User)
class App extends Component {
    componentDidMount() {
        // actions.getUser()
       console.log(actions)
       actions['getUser']()
    }
    render() {
        return (<Provider><User /></Provider>)
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
