import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Globe } from './Globe';
import { Chart } from './chart/Chart';
import Home from './Home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const INGRESS_URL = 'https://ingress.dev.dazzl.io/bc83c830-8a19-11ea-acc0-9b8d5e2cb83a/get';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      subData: []
    }

    this.fetchSubData = this.fetchSubData.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
    await this.fetchSubData();
    // this.setState({data, subData})
  }
  

  fetchData = async() => {
    return await fetch(`${INGRESS_URL}?cat=?`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic '+btoa('climatebodega:yolo123'),
      },
    })
    .then(response => response.json())
    .then(data => {
      this.setState({data});
      return data;
    });
  }

  fetchSubData = async(cat = 'Facilities') => {
    return await fetch(`${INGRESS_URL}?cat=${cat}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic '+btoa('climatebodega:yolo123'),
      },
    })
    .then(response => response.json())
    .then(data => {
      this.setState({subData: data});
      return data;
    });
  }

  render() {
    const { data, subData } = this.state;

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
              <Link to="/chart"><span aria-label="chart">Charts</span></Link>
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
              <Chart data={data} subData={subData} fetchSubData={this.fetchSubData}/>
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