### RecoilRoot

 组件使用 recoil state 需要 RecoilRoot
 出现在父组件， 一个好的地方是根组件

 ### Atom

 Atom 代表一段state, Atoms 可以从任何组件
 读写， 读取atom值的组件隐式订阅了atom, 所以
 任何atom 更新结果会导致所有订阅了atom 的组件重新渲染

 * key 一个唯一key
 * default 默认值

 ```
  const todoList = atom({
    key: 'todoList',
    default: []
  })
 ```

 * useRecoilValue 当你只需要读取atom， 组件订阅atom 
 ```
 const todos = useRecoilValue(todoList)
  
 ```
 * useRecoilState 当你需要读写atom， 组件订阅atom [get, set]

 ```
 const [todos, setTodos] = useRecoilState(todoList)
  
 ```

 * useSetRecoilState() 当你只需要写atom 

 ```
  const setTodos = useSetRecoilState(todoList)
 ```

  当你需要读取 atom value 但是组件不需要订阅 `useRecoilCallback`

  ```
  const todos = useRecoilCallback(async ({ getPromise}) => {
    const items = await getPromise(todoList)
  })
  ```




 ### Selector
* key 唯一key
* get 读取recoilState
* set? 

```
const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelcius = selector({
  key: 'tempCelcius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});
```