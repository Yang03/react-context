import React from 'react'
import { RecoilRoot, useRecoilState, atom, useRecoilValue, selector } from 'recoil'
import ReactDOM from 'react-dom'

import './index.scss'

// 定义一个状态
const textState = atom({
  key: 'textState', // unique
  default: '' //默认值
})

function TextInput () {
  const [text, setText] = useRecoilState(textState)

  return <input value={text} onChange={(e) => setText(e.target.value)} />
}

const valueLength = selector({
  key: "valueLength",
  get: ({get}) => {
    // 通过 get 可以读取其它状态
    const inputValue = get(textState);
    return inputValue.length;
  },
});


function CharCount() {
  const count = useRecoilValue(valueLength) 
  return <span>{count}</span>
}
function App() {
  
  return (<div>
    <TextInput />
    <CharCount />
  </div>)
}

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('app')
)