import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

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
  }
});

export default class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    setInterval(() => {
      this.distanceInfo.setState({ value: Math.random() * 100 });
      this.speedInfo.setState({ value: Math.random() * 15 });
      this.directionInfo.setState({
        value: this.directionInfo.state === 'N' ? 'NW' : 'N'
      });
    }, 1000);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1, backgroundColor: 'red'}}>MAPVIEW</Text>
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
