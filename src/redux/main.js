import React from 'react'
import ReactDOM, {
  unstable_batchedUpdates
} from 'react-dom'

const createStore = (reducer, initState = {}) => {
  let state = initState
  const listeners = []

  return {
    getState() {
      return state
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener)
        listeners.splice(index, 1)
      }
    },
    dispatch(action) {
      state = reducer(state, action)
      // v1，v2
      // listeners.forEach(listener => listener())
      // v3
      unstable_batchedUpdates(() => {
        listeners.forEach(listener => {
          listener();
        })
      })
    }
  }
}

const Context = React.createContext()

const Provider = ({ children, store }) =>  (
  <Context.Provider value={store}>
    {children}
  </Context.Provider>
)


const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE': {
      return  {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    }
    default: 
      return state
  }
}


const connect = mapStateToProps => WrappedComponent => props => {
  const store = React.useContext(Context)
  //v1
  // const [state, setState] = React.useState(() => {
  //   console.log(store.getState(), '------------------>')
  //   return mapStateToProps(store.getState(), props)
  // })

  // v2
  const [, forceUpdate] = React.useReducer(c => c + 1, 0)
  const state = mapStateToProps(store.getState(), props)

  const propsRef = React.useRef()
  propsRef.current = props

  //v1
  // React.useEffect(() => {
  //   return store.subscribe(() => {
  //     setState(
  //       mapStateToProps(store.getState(), propsRef.current)
  //     )
  //   })
  // }, [store, setState, propsRef])
  // v2
  React.useEffect(() => {
    return store.subscribe(() => {
      forceUpdate();
    });
  }, [store, forceUpdate]);

  console.log(WrappedComponent, 'fffffff')
  return (
    <WrappedComponent
      {...props}
      {...state}
      dispatch={store.dispatch}
    />
  )
}


const store = createStore(reducer, {
  todos: [{
    id: 'a',
    content: 'A'
  }]
})

const Todo = ({id, content, dispatch}) => (
  <li
    // onClick={() => dispatch({type: 'DELETE', payload: id})}
    onClick = {
      () => setTimeout(() => {
        dispatch({
          type: 'DELETE',
          payload: id
        })
      })  
    }
  >
    {
      console.log('Todo')
    }
    {content}
  </li>
)

const TodoContainer = connect((state, ownProps) => {
  // console.log(state.todos.find(todo => todo.id === ownProps.id))
  return {
    content: state.todos.find(todo => todo.id === ownProps.id)
    .content,
  }
})(Todo)


const TodoList = ({todos = []}) => (
  <ul>
    {
      console.log('toList', todos)
    }
    {
      todos.map(todo => (
        <TodoContainer key={todo.id} id={todo.id} />
      ))
    }
  </ul>
)

const TodoListContainer = connect(state => ({
  todos: state.todos,
}))(TodoList)

ReactDOM.render(
  <Provider store={store}>
    <TodoListContainer />
  </Provider>,
  document.getElementById('root')
)



