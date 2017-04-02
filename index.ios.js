import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import RunInfo from './components/run-info';

export default class GetStarted extends Component {
  render() {
    return (
      <View>
        <Text>MAPVIEW</Text>
        <View>
          <RunInfo title="Distance" value="0 km" />
          <RunInfo title="Speed" value="0 km/h" />
          <RunInfo title="Direction" value="NE" />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('GetStarted', () => GetStarted);
