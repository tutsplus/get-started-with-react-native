import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import haversine from 'haversine';

import RunInfo from './components/run-info';
import RunInfoNumeric from './components/run-info-numeric';

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

let id = 0;

export default class GetStarted extends Component {
  constructor(props) {
    super(props);

    let watchID = navigator.geolocation.watchPosition((position) => {
      let distance = 0;

      if (this.state.previousCoordinate) {
        distance = this.state.distance + haversine(this.state.previousCoordinate,
                                                   position.coords, { unit: 'mile' });
        this.distanceInfo.setState({ value: distance });
      }

      this.speedInfo.setState({ value: position.coords.speed });

      let x = position.coords.heading;
      if ((x > 0 && x <= 23) || (x > 338 && x <= 360))
        this.directionInfo.setState({ value: 'N' });
      else if (x > 23 && x <= 65)
        this.directionInfo.setState({ value: 'NE' });
      else if (x > 65 && x <= 110)
        this.directionInfo.setState({ value: 'E' });
      else if (x > 110 && x <= 155)
        this.directionInfo.setState({ value: 'SE' });
      else if (x > 155 && x <= 203)
        this.directionInfo.setState({ value: 'S' });
      else if (x > 203 && x <= 248)
        this.directionInfo.setState({ value: 'SW' });
      else if (x > 248 && x <= 293)
        this.directionInfo.setState({ value: 'W' });
      else if (x > 293 && x <= 338)
        this.directionInfo.setState({ value: 'NW' });

      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords,
        distance
      });
    }, null, { distanceFilter: 10 });

    this.state = { markers: [], watchID };

    // setInterval(() => {
    //   this.distanceInfo.setState({ value: Math.random() * 100 });
    //   this.speedInfo.setState({ value: Math.random() * 15 });
    //   this.directionInfo.setState({
    //     value: this.directionInfo.state === 'N' ? 'NW' : 'N'
    //   });
    // }, 1000);
  }

  componentWillUnmount() {
    navigator.geolocation.stopWatch(this.state.watchID);
  }

  addMarker(region) {
    let now = (new Date).getTime();
    if (this.state.lastAddedMarker > now - 5000) {
      return;
    }

    this.setState({
      markers: [
        ...this.state.markers, {
          coordinate: region,
          key: id++
        }
      ],
      lastAddedMarker: now
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: 37.33307,
            longitude: -122.0324,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Polyline
            coordinates={this.state.markers.map((marker) => marker.coordinate)}
            strokeWidth={5}
          />
        </MapView>
        <View style={styles.infoWrapper}>
          <RunInfoNumeric title="Distance" unit="mi"
            ref={(info) => this.distanceInfo = info}
          />
          <RunInfoNumeric title="Speed" unit="km/h"
            ref={(info) => this.speedInfo = info}
          />
          <RunInfo title="Direction"
            value="NE"
            ref={(info) => this.directionInfo = info}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('GetStarted', () => GetStarted);
