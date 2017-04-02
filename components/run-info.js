import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { connect } from 'react-redux';

import sharedStyles from '../shared-styles';

export class RunInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  formatValue() {
    return this.props.value;
  }

  render() {
    let value = this.props.value ? this.formatValue() : '–';

    return (
      <View style={[sharedStyles.runInfoWrapper, {flex: 1, flexDirection: 'column-reverse'}]}>
        <Text style={sharedStyles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
        <Text style={sharedStyles.runInfoValue}>{value}</Text>
      </View>
    );
  }
}

export default connect((state, own) => {
  return { value: state[own.type] };
})(RunInfo);
