import * as React from "react";
import ReactDOM from 'react-dom'

import Demo from './hookForm';

// import 'zarm/dist/zarm.min.css';

export default function App() {

  return (
    <div>
      <Demo />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)