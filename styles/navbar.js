'use strict';

var React = require('react-native');
var { StyleSheet } = React;

export default StyleSheet.create({
  appearance: {
    backgroundColor: '#2A3744',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  title: {
    color: '#FEFEFE',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  button: {
    width: 50,
    color: '#FEFEFE',
    textAlign: 'center'
  }
});
