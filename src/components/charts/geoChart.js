import React, { Component } from 'react';
import axios from 'axios';

let geoArr = [['City', 'Bar Name', 'Teams', 'games played']];
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
      .then(bars => {
        this.setState({ bars });
        bars.map(bar => {
          let tempArr = [];
          return axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                bar.latitude
              },${bar.longitude}&key=${process.env.MAPS_KEY}`
            )
            .then(res => res.data)
            .then(data => {
              data.results[0].address_components.map(addressTypes => {
                if (addressTypes.types[0] === 'administrative_area_level_1') {
                  tempArr.push(
                    addressTypes.long_name,
                    bar.name,
                    bar.teams.length,
                    bar.games.length
                  );
                  geoArr.push(tempArr);
                }
              });
            });
        });
      });
  }

  geoMapChart() {
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
        colorAxis: { colors: ['green', 'blue'] }
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
