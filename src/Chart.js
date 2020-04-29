import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';

const data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ["#FF4136", "#ffff00", "#0000ff"]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }
 
  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }
 
  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh", cursor: "grab", paddingTop: '6vw' }}
      >
        <Doughnut
          ref={this.chartReference}
          data={data}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}