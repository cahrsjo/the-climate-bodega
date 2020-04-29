import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Globe } from './Globe';
import { Chart } from './Chart';
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
    const TreesElement = () => {
      let pixels = 50;
      let images = [];
      for (let index = 0; index < 10; index++) {
        pixels += Math.random() * (100 - 15) + 15;
        if (index === 5) pixels += 800;
        images.push(
          <img
            key={index}
            style={{
              height: '2.5em',
              position: 'absolute',
              top: '43px',
              left: `${pixels}px`,
            }}
            src="./images/3419927.svg"
            alt="tree"
          />
        )
      }
      return images;
    }
    return (
      <Router>
        <div>
          <nav className="navigation">
            <div>
              {TreesElement()}              
            </div>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/chart"><span aria-label="chart">Chart</span></Link>
            </div>
            <div>
              <Link to="/globe"><span role="img" aria-label="globe">🌍</span></Link>
            </div>
          </nav>

          <Switch>
            <Route path="/globe">
              <Globe />
            </Route>
            <Route path="/chart">
              <Chart />
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