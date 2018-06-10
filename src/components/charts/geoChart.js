import React, { Component } from 'react';
import axios from 'axios';

export default class GeoChart extends Component {
  constructor() {
    super();
    this.state = {
      bars: []
    };
  }
  componentDidMount() {
    axios
      .get('/v1/bars')
      .then(res => res.data)
      .then(bars => this.setState({ bars }));
  }

  geoMapChart() {
    const { bars } = this.state;

    let geoArr = [['City', 'Bar Name', 'Teams'], ['Brooklyn', 'edie', 5]];
    let tempArr = [];
    bars.length
      ? bars.map(bar => {
          console.log(bar.latitude, bar.longitude);
          return axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                bar.latitude
              },${bar.longitude}&key=${process.env.MAPS_KEY}`
            )
            .then(res => res.data)
            .then(data => console.log(data));
        })
      : null;
    //data.results[0].address_components.map(data => {
    //   if (data.types.length === 3) console.log(data.long_name);
    // })

    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: process.env.MAP_JS_KEY
    });
    google.charts.setOnLoadCallback(drawMap);

    function drawMap() {
      var data = google.visualization.arrayToDataTable(geoArr);

      var options = {
        region: 'US',
        displayMode: 'markers',
        colorAxis: { colors: ['green', 'blue'] },
        animation: {
          startup: true,
          duration: 5000,
          easing: 'inAndOut'
        }
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById('draw')
      );
      chart.draw(data, options);
    }
  }
  render() {
    this.geoMapChart();
    return <div id="draw" />;
  }
}
