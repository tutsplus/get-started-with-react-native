import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import haversine from 'haversine';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

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

import reducer from './reducer';
import { incrementDistance, setSpeed, setBearing } from './actions';
const store = createStore(reducer);

export default class GetStarted extends Component {
  constructor(props) {
    super(props);

    let watchID = navigator.geolocation.watchPosition((position) => {
      if (this.state.previousCoordinate) {
        let distance = haversine(this.state.previousCoordinate,
                                 position.coords, { unit: 'mile' });
        store.dispatch(incrementDistance(distance));
      }

      store.dispatch(setSpeed(position.coords.speed));
      store.dispatch(setBearing(position.coords.heading));

      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords
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
      <Provider store={store}>
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
            <RunInfoNumeric title="Distance" unit="mi" type="distance"
              ref={(info) => this.distanceInfo = info}
            />
            <RunInfoNumeric title="Speed" unit="km/h" type="speed"
              ref={(info) => this.speedInfo = info}
            />
            <RunInfo title="Direction" type="bearing"
              value="NE"
              ref={(info) => this.directionInfo = info}
            />
          </View>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GetStarted', () => GetStarted);
