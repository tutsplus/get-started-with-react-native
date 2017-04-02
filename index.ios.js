import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import RunInfo from './components/run-info';

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  }
});

export default class GetStarted extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1, backgroundColor: 'red'}}>MAPVIEW</Text>
        <View style={styles.infoWrapper}>
          <RunInfo title="Distance" value="0 km" />
          <RunInfo title="Speed" value="0 km/h" />
          <RunInfo title="Direction" value="NE" />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('GetStarted', () => GetStarted);
