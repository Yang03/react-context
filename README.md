<<<<<<< HEAD
### react hook
`hook` 不能在`classes` 里面使用，但是你可以用来替代`classes`

#### `lifeCycle`对应的`hook`
* `constructor` 函数组件不需要`constructor`，你可以通过`useState`初始花状态，如果计算初始状态很昂贵，可以将函数传递给useState。
* `getDerivedStateFromProps` 渲染时候更新
* `shouldComponentUpdate` React.memo
* `render`
* `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, useEffect
* `componentDidCatch`, `getDerivedStateFromError`暂时没有对应的


#### useState

```
    const [count, setCount] = useState(0)
    //0 是count 的初始值, setCount 是返回函数
    // setCount(count + 1)
```

#### `useState`做了什么？
它声明了一个`state variable` 状态变量，和 `this.state`在类组件中的作用一样，当函数
退出时变量消失，但是react保留状态变量 

#### `useState`接收什么参数？
useState()钩子的惟一参数是初始状态，不像`classes`,不是一个对象，是字符串或者数字，如果我们要储存两个
不同的值，要跳用useState两次
或者
```
    function Box() {
        const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
    // ...
    }
    useEffect(() => {
    function handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Note: this implementation is a bit simplified
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
    }, []);
```

更新一个状态变量时，我们替换了它的值。类中的setState，它将更新后的字段合并到对象中。

#### `useState` 返回什么？
它返回一对值:当前状态和更新它的函数。

#### `useEffect`
```
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    return () => {
        document.title = '';
    }
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
`useEffect` 对应了`componentDidMount`, `componentDidUpdate`,`componentDidUnMount`
 
 函数在`componentDidMount`, `componentDidUpdate` 时调用，返回一个函数在`componentDidUnMount`时调用

有两种不同的`side effects` , 需要清理的`side effects` 和不需要清理的。

#### `useEffect` 干了什么？
 `react` 会记住您传递的函数，组件会在`render`之后执行，并在执行DOM更新(`componentDidUpdate`)后稍后调用它

#### `useEffect` 会在没次`render`后执行吗？
是的，通常，他会在第一次`render`每次更新之后。
与componentDidMount或componentDidUpdate不同，使用useEffect调度的效果不会阻止浏览器更新屏幕。这让你的应用程序感觉更灵敏。大多数影响不需要同步发生。在不常见的情况下(比如测量布局)，有一个单独的useLayoutEffect钩子，其API与useEffect相同。
`Effect cleanup` 发生在没次更新之后，而不是在组件卸载的时候执行一次，比如，你有一个好友列表，在组件`didMount`的时候render, 但是`props`改变的时候，你就需要改变它，所以你需要`didUpdatre` ，而`useEffect`正好解决了这个问题。


### `Optimizing Performance by Skipping Effects` 通过跳过优化性能

```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
只有`count`发生改变的时候才会更新

#### `useMemo` , `useCallback`

`useMemo`和`useCallback`都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，`useCallback`返回缓存的函数。



=======
# react-context

react new context Api
>>>>>>> 7db230a935b87b021cbbcd8de7e205e891098f79
