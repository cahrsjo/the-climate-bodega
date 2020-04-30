import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import './Chart.css';


export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }
 
  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }
 
  getStructuredData = data => {
    const group = _.groupBy(data, 'category');
    return {
      labels: [...new Set(data.map(d => d.month))].sort(),
      datasets: [
        {
          data: group['travel'].map(t => +t.sum),
          label: group['travel'][0].category,
          borderColor: "red",
          fill: false
        },
        {
          data: group['Electronics'].map(t => +t.sum),
          label: group['Electronics'][0].category,
          borderColor: "green",
          fill: false
        },
        {
          data: group['Facilities'].map(t => +t.sum),
          label: group['Facilities'][0].category,
          borderColor: "blue",
          fill: false
        },
        {
          data: group['Expendables'].map(t => +t.sum),
          label: group['Expendables'][0].category,
          borderColor: "yellow",
          fill: false
        }
      ]
    }
  }
  render() {
    const { data, subData } = this.props;

    console.log({subData, data});
    
    let structuredData = {};
    if (data.length) {
      structuredData = this.getStructuredData(data);
    }

    return (
      <div
        className="container"
      >
        <div className="line">
          <Line
            ref={this.chartReference}
            data={structuredData}
            options={{ maintainAspectRatio: false,
              title: {
                display: true,
                text: 'EMISSIONS PER CATEGORY',
                fontSize: 25,
                fontFamily: 'fantasy'
                },
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 15,
                      fontFamily: 'fantasy'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Emission (CO2)',
                      fontSize: 15,
                      fontFamily: 'fantasy'
                    }
                  }]
                }
              }
            }
          />
        </div>
        <div className="line">
          <Line
            ref={this.chartReference}
            data={structuredData}
            options={{ maintainAspectRatio: false,
              title: {
                display: true,
                text: 'EMISSIONS PER CATEGORY PER COUNTRY',
                fontSize: 25,
                fontFamily: 'fantasy'
                },
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 15,
                      fontFamily: 'fantasy'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Emission (CO2)',
                      fontSize: 15,
                      fontFamily: 'fantasy'
                    }
                  }]
                }
              }
            }
          />
        </div>
      </div>
    );
  }
}