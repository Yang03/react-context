import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";


function A () {
     let history = useHistory();
    function go() {
      history.push('/b')
    }
    return(<div>
      <h3>A</h3>
      <button onClick={go}>B</button>

    </div>)
}

function B () {
   let history = useHistory();

   function go() {
     history.replace('/c')
   }
    return(<div>
      <h3>B</h3>
      <button onClick={go}>C</button>

    </div>)
}

function C () {
    return(<div>C</div>)
}


function App() {
    return (
         <Router>
      <div>
        {/* <ul>
          <li>
            <Link to="/">a</Link>
          </li>
          <li>
            <Link to="/b">b</Link>
          </li>
          <li>
            <Link to="/c">c</Link>
          </li>
        </ul> */}

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <A />
          </Route>
          <Route path="/b">
            <B />
          </Route>
          <Route path="/c">
            <C />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))