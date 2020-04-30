import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import './Chart.css';


export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      selectedCategory: 'Facilities',
    }
  }
 
  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  sortFn = (a, b) => {
    return a.month > b.month ? 1 : -1;
  }
 
  getStructuredData = data => {
    const group = _.groupBy(data, 'category');
    console.log(group['travel']);
    return {
      labels: [...new Set(data.map(d => d.month))].sort(),
      datasets: [
        {
          data: group['travel'].sort(this.sortFn).map(t => +t.sum),
          label: group['travel'][0].category,
          borderColor: "red",
          fill: false
        },
        {
          data: group['Electronics'].sort(this.sortFn).map(t => +t.sum),
          label: group['Electronics'][0].category,
          borderColor: "green",
          fill: false
        },
        {
          data: group['Facilities'].sort(this.sortFn).map(t => +t.sum),
          label: group['Facilities'][0].category,
          borderColor: "blue",
          fill: false
        },
        {
          data: group['Expendables'].sort(this.sortFn).map(t => +t.sum),
          label: group['Expendables'][0].category,
          borderColor: "yellow",
          fill: false
        }
      ]
    }
  }

  getCountryData = data => {
    const group = _.groupBy(data, 'country');
    const temp = [];    
    Object.keys(group).forEach(g => {
      temp.push({
        data: group[g].sort(this.sortFn).map(t => +t.sum),
        label: g,
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        fill: false
      })
    });
    return {
      labels: [...new Set(data.map(d => d.month))].sort(),
      datasets: temp,
    }
  }

  onChangeCat = async(event) => {
    const { fetchSubData } = this.props;
    this.setState({ selectedCategory: event.target.value});
    await fetchSubData(event.target.value);
  }
  render() {
    const { data, subData } = this.props;
    const { selectedCategory } = this.state;
    
    let structuredData = {};
    let countryData = {};
    if (data.length) {
      structuredData = this.getStructuredData(data);
    }

    if (subData.length) {
      countryData = this.getCountryData(subData);
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
            data={countryData}
            options={{ maintainAspectRatio: false,
              title: {
                display: true,
                text: `${selectedCategory.toUpperCase()} EMISSIONS PER COUNTRY`,
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
          <select className="dropdown" onChange={event => this.onChangeCat(event)}>
            <option value="travel">Travel</option>
            <option value="Facilities" selected>Facilities</option>
            <option value="Expendables">Expendables</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        
      </div>
    );
  }
}