import React, { Component } from "react";
import { Doughnut, Line, Bubble } from 'react-chartjs-2';
import './Chart.css';

const bubbleData = {
  labels: "Africa",
      datasets: [{
          label: ["China"],
          backgroundColor: "rgba(255,221,50,0.2)",
          borderColor: "rgba(255,221,50,1)",
          data: [{
            x: 21269017,
            y: 5.245,
            r: 15
          }]
        }, {
          label: ["Sweden"],
          backgroundColor: "rgba(60,186,159,0.2)",
          borderColor: "rgba(60,186,159,1)",
          data: [{
            x: 258702,
            y: 7.526,
            r: 10
          }]
        }, {
          label: ["Germany"],
          backgroundColor: "rgba(0,0,0,0.2)",
          borderColor: "#000",
          data: [{
            x: 3979083,
            y: 6.994,
            r: 15
          }]
        }, {
          label: ["Japan"],
          backgroundColor: "rgba(193,46,12,0.2)",
          borderColor: "rgba(193,46,12,1)",
          data: [{
            x: 4931877,
            y: 5.921,
            r: 15
        }]
      }
    ],
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }, scales: {
        yAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Happiness"
          }
        }],
        xAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "GDP (PPP)"
          }
        }]
      }
    } 
};

const lineData = {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [168,170,178,190,203,276,408,547,675,734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [40,20,10,16,24,38,74,167,508,784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [6,3,2,2,7,26,82,172,312,433],
        label: "North America",
        borderColor: "#c45850",
        fill: false
      }
    ],
    options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
};

const doughnutData = {
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
    const { data } = this.props;

    console.log({chartData: data})
    return (
      <div
        className="container"
      >
        <div className="bubble">
          <Bubble
            ref={this.chartReference}
            data={bubbleData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="line">
          <Line
            ref={this.chartReference}
            data={lineData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="doughnut">
          <Doughnut
            ref={this.chartReference}
            data={doughnutData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  }
}