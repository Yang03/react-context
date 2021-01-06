import * as React from "react";
import ReactDOM from 'react-dom'

import Button from './components/button/index.jsx';
import Text from './components/text/index.jsx';

import { createRender } from './render';

const componentsConfig = {
  Button,
  Text,
}

const Render = createRender(componentsConfig)

export default function App() {

  const modules = [
    {
      componentType: 'Button',
      content: {
        buttonText: 'ok'
      }
    },
    {
      componentType: 'Text',
      content: {
        text: 'test'
      }
    }
  ]

  return (
    <div>
      <Render modules={modules} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)