import React from 'react'
import { RecoilRoot, useRecoilState, atom, useRecoilValue, selector } from 'recoil'
import ReactDOM from 'react-dom'

// 定义一个状态
const todoListState = atom({
  key: 'todoListState', // unique
  default: [] //默认值
})


function TodoItem() {
  const 
}

function TodoList() {
  const todoList = useRecoilValue(todoListState)
  return (
    <>
      {
        todoList.map((todoItem) => {
          return <TodoItem key={todoItem.key} item={todoItem} />
        })
      }
    </>
  )
}

function App() {
  
  return (<div>
    <TodoList />
  </div>)
}

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
)