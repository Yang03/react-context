1. 第一次渲染后，<TodoList> 和 <Todo> 都在 useEffect 里面订阅了store
触发的顺序是下到上， <Todo> 第一，然后<TodoList>

2. 当用户点击<Todo>,触发DELETE,希望删掉这条数据

3. store 接收action 执行reducer, 改变todos 的状态
变成了一个空数组 {todos:[]}

4. 然后store 调用订阅的listeners, 由于<Todo>第一个订阅
所以会第一个调用

5. <Todo> 中 connect 触发listeners. 用最新的state(store.getState())和当前的props(propsRef.current)调用
mapStateToProps (mapStateToProps里面调用了setState触发重新渲染)

6. 由于state不再存在todos， 所以尝试
访问state.todos[ownProps.id] 返回undefined, 访问
undefined.content 会出现错误 

这就是有名的 `zombie children` 

V2

5. <Todo> 中 connect 触发listeners. 调用`forceUpdate()`重新渲染
6. <TodoList> 同上
7. <TodoList> 渲染，返回的元素是个空数组， 紧紧渲染了<ul> ,<Todo>
不会渲染


After adding setTimeout

6. <Todo> 渲染 调用 mapStateToProps(currentState, currentProps)
7. 由于父类(<TodoList>)还没有渲染，<Todo>中的道具实际上是陈旧的道具，但是状态已经是最新的了。调用state.todos [ownProps。导致未定义和调用(未定义)。内容会导致错误。

因为用了闭包，所以无法合并并批量处理，不能保证从上到下的重新渲染，在父组件<TodoList>未重新渲染的情况下
子组件<Todo>重新渲染了，但是state, props 都发生了改变

区别在这两步

前者调用父侦听器中的另一个侦听器(<TodoList>)，而后者首先呈现子侦听器(<Todo>)。调用forceUpdate()后不久<Todo>同步重新呈现

在我们的例子中，react 批量同时处理<Todo> forceUpdate() 和 <TodoList>的forceUpdate(). 最后一次性渲染它们，注意，在重新渲染期间 React 将
确保从上到下的执行，这就是为什么父节点<TodoList> 会重新渲染。 然后
跳过渲染<Todo>


### 嵌套的订阅模式

我们希望最小化容器组件中的渲染 因此，我们想提出一种方法来在forceUpdate（）调用之前在侦听器回调中提早解决更新。 我们还想强制执行自上而下的顺序，以便我们不重新提出stale props和zombie children问题。

Redux团队在react-redux v5中提出了一种有趣的方法来解决这个问题。 通过使用嵌套订阅模型，我们可以尽早提供更新援助，还可以stale props问题。

基本思想是，我们不分批地进行更新以使其自上而下，而是将侦听器回调的触发延迟到父级完全重新呈现为止。 这样，我们可以确保更新始终是自上而下的，子级不会在侦听器回调中获得陈旧的道具，因为当我们触发回调时，道具已经是最新的了。

1. 第一次渲染，Todo subscribe TodoList在useEffect里 创建并通过Provider 传递的 `substore`

2. TodoList subscibles global `store`

3. Clicks <Todo> 触发 `delete`, 修改了 state {todos: []}

4. TodoList Store listeners 会被调用，Todo的不会调用， 因为dispacth 是crateStroe() 创建的
store 的方法

5. TodoList call listener 调用`MapStateToProps`

6. shallowEqual 返回 fasle 调用`forceUpdate()` 重新渲染，
 getState() 返回的 todos = [], 返回一个<ul>

7. Todo 卸载，useEffect 里面会unsubscrible listener `(return store.subscribe())`, remove listener 在 `subStore`

8. TodoList 在渲染后会调用 `subStore.notifyUpdates()`, subStore listeners 已经
清空。

渲染的顺序

```
<Provider store={store}>
  <TodoListContainer />
</Provider>,

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

```

```
 TodoList connect

  store = React.useContext(Context)
  store = Context.value
  此时的store 是通过 createStore 创建出来的

 第一渲染之后 ---- > 订阅了事件

 替换了store 变成了 createSubscription创建出来的

 Todo connect

 store = subStore

 调用 notifyUpdates() 
 执行了listener

  const nextState = mapStateToProps(store.getState(), propsRef.current)

  if (shallowEqual(stateRef.current, nextState)) {
    subStore.notifyUpdates()
    return
  }
  forceUpdate()


```

1. 第一次渲染后 ToDoList and Todo subscribe store in Effect
Todo 先订阅  然后TodoList 订阅

2. click 触发

3. store todos = []

4. store 调用订阅事件。 todo调用 

5. todos find return undefined 访问content 报错



