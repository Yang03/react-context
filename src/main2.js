import React, {
    Component,
    useState,
    useContext
} from 'react'
import ReactDOM from 'react-dom'

// import 'zarm/dist/zarm.min.css';
// import {
//     Provider,
//     Consumer,
//     actions,
//     connect
// } from './stroe'

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



// let User = ({ user }) => {
//     console.log(user)
//     return user && <img src={user.avatar} width={50} alt="avatar" />
//   }
  
  
// const mapStatToProps = ( {user}) => {
//     return {
//         user
//     }
// }
// //User = connect( ({user }) => ({ user }))(User)
// User = connect(mapStatToProps)(User)
// class App extends Component {
//     componentDidMount() {
//         // actions.getUser()
//        console.log(actions)
//        actions['getUser']()
//     }
//     render() {
//         return (<Provider><User /></Provider>)
//     }
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// )


// function Example() {
//     const [count, setCount] = useState(0)
//     return (<div>
//          <p> You clicked {count}times </p> 
//          <button onClick = {
//                 () => setCount(count + 1)
//             } >
//         Click me </button>
//     </div>)
// }


// const ThemeContext = React.createContext();

// function TestHookContext() {
//     const context = useContext(ThemeContext);

//     return ( <div style = {context}> TestFuncContext </div>)
// }

// function TestNativeContext() {
//     return ( <ThemeContext.Consumer>{
//         value => (
//             <div style={value}>TestNativeContext</div>
//         )
//     }</ThemeContext.Consumer>)
// }

// function useMemoHook() {

// }
// function App () {
//     return (
//         <div className = "App" >
//             <h1 > Hello </h1> <h2 > Start editing to see some magic happen! </h2>
//             <ThemeContext.Provider value={{color: 'red'}}>
//                 <TestHookContext />
//             </ThemeContext.Provider>
//             <ThemeContext.Provider value={{color: 'green'}}>
//                 <TestNativeContext/>
//             </ThemeContext.Provider>
//         </div>
//     );
// }

ReactDOM.render(
    <App/> ,
    document.getElementById('root')
)
