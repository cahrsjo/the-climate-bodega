import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Globe } from './Globe';
import Home from './Home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navigation">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/globe"><span role="img" aria-label="globe">🌍</span></Link>
            </div>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/globe">
              <Globe />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);