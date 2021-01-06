import React from 'react'
import ReactDOM from 'react-dom'

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

const useDispatch = () => React.useContext(Context).dispatch

// const useSelector = selector => {
//   const store = React.useContext(Context)

//   const [, forceUpate] = React.useReducer(c => c + 1, 0)

//   const state = selector(store.getState())

//   React.useEffect(() => {
//     return store.subscribe(() => {
//       forceUpate()
//     })
//   }, [store, forceUpate])

//   return state
// }

// const useSelector = selector => {
//   const store = React.useContext(Context);
//   const [state, setState] = React.useState(() =>
//     selector(store.getState())
//   );

//   React.useEffect(() => {
//     return store.subscribe(() => {
//       console.log(store.getState())
//       setState(selector(store.getState()));
//     });
//   }, [store, setState, selector]);

//   return state;
// }


const useSelector = selector => {
  const store = React.useContext(Context);
  const [, forceUpdate] = React.useReducer(c => c + 1, 0);
  const currentState = React.useRef();
  // Try to get the state in the render phase to safely get the latest props
  currentState.current = selector(store.getState());

  React.useEffect(() => {
    return store.subscribe(() => {
      try {
        const nextState = selector(store.getState());

        if (nextState === currentState.current) {
          // Bail out updates early
          return;
        }
      } catch (err) {
        console.log(err)
        // Ignore errors
      }

      // Either way we want to force a re-render
      forceUpdate();
    });
  }, [store, forceUpdate, selector, currentState]);

  return currentState.current;
};

const Todo = ({ id }) => {
  const content = useSelector(
    state =>
      state.todos.find(todo => todo.id === id).content
  );
  const dispatch = useDispatch();

  return (
    <li
      onClick={() => {
       setTimeout(dispatch({ type: 'DELETE', payload: id }), 1000);
      }}
    >
      {content}
    </li>
  );
};

const TodoList = () => {
  const todos = useSelector(state => state.todos);

  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} id={todo.id} />
      ))}
    </ul>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
)