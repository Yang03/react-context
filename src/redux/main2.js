import React from 'react'
import ReactDOM, {
  unstable_batchedUpdates,
} from 'react-dom'


function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }

  return true
}

const createSubscription = () => {
  const listeners = []

  return {
    subscribe(listener) {
      console.log(listener)
      listeners.push(listener)

      return () => {
        const index = listeners.indexOf(listener)
        listeners.splice(index, 1)
      }
    },
    notifyUpdates() {
      console.log(listeners, 'listeners')
      listeners.forEach(listener => {
        listener()
      })
    }
  }
}

/**
 * createSubscription 和 crateStore 的区别是，
 * 前者不保存任何状态， 有一个notifyUpdates 函数
 * 用来通知所有子组件，触发它们的listener 回调
 * 
 * 
 */

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
      listeners.forEach(listener => listener())
      // v3
      // unstable_batchedUpdates(() => {
      //   listeners.forEach(listener => {
      //     listener();
      //   })
      // })
    }
  }
}

const Context = React.createContext()

const Provider = ({ children, store }) =>  (
  <Context.Provider value={store}>
    {children}
  </Context.Provider>
)

const connect = mapStateToProps => WrappedComponent => props => {
  const store = React.useContext(Context)

  console.log(store, '------------------>')

  const subStore = React.useMemo(
    () => ({
      ...store,
      ...createSubscription(),
    }),
    [store]
  )

  const [, forceUpdate] = React.useReducer(c => c + 1, 0)

  const stateRef = React.useRef()

  stateRef.current = mapStateToProps(store.getState(), props)


  const propsRef = React.useRef()

  propsRef.current = props

  React.useEffect(() => {
    return store.subscribe(() => {
      console.log('----------')
      const nextState = mapStateToProps(store.getState(), propsRef.current)

      if (shallowEqual(stateRef.current, nextState)) {
        subStore.notifyUpdates()
        return
      }
      forceUpdate()
    })
  }, [store, propsRef, forceUpdate, stateRef, subStore])

  React.useEffect(() => {
    subStore.notifyUpdates()
  })

  console.log(WrappedComponent)

  return (<Provider store={subStore}>
    <WrappedComponent
      {...props}
      {...stateRef.current}
      dispatch={store.dispatch}
    />
  </Provider>)
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    }
    default:
      return state
  }
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


