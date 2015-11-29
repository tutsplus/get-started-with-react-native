'use strict';

var React = require('react-native');
var { StyleSheet } = React;

export default StyleSheet.create({
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
  spinner: {
    width: 30
  },
  rowSeparator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHighlighted: {
    opacity: 0.0
  },
  emptyList: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  emptyListText: {
    marginTop: 80,
    color: '#999'
  }
});
