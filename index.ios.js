import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

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
    this.state = { markers: [] };

    setInterval(() => {
      this.distanceInfo.setState({ value: Math.random() * 100 });
      this.speedInfo.setState({ value: Math.random() * 15 });
      this.directionInfo.setState({
        value: this.directionInfo.state === 'N' ? 'NW' : 'N'
      });
    }, 1000);
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
          followsUserLocation
          initialRegion={{
            latitude: 37.33307,
            longitude: -122.0324,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          onRegionChange={(region) => this.addMarker(region)}
        >
          {this.state.markers.map((marker) => (
            <MapView.Marker coordinate={marker.coordinate} key={marker.key} />
          ))}
        </MapView>
        <View style={styles.infoWrapper}>
          <RunInfoNumeric title="Distance" unit="km"
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
