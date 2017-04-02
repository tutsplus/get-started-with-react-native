import React, { Component } from 'react';
import { Text, View } from 'react-native';

import sharedStyles from '../shared-styles';

export default class RunInfo extends Component {
  render() {
    return (
      <View style={[sharedStyles.runInfoWrapper, {flex: 1, flexDirection: 'column-reverse'}]}>
        <Text style={sharedStyles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
        <Text style={sharedStyles.runInfoValue}>{this.props.value}</Text>
      </View>
    );
  }
}
