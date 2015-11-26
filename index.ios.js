'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  StatusBarIOS,
} = React;

StatusBarIOS.setStyle('light-content');

var iTunesBrowser = React.createClass({
  render: function() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navbar}>
          <View style={styles.navbarButton}></View>
          <Text style={styles.navbarTitle}>iTunesBrowser</Text>
          <Text style={styles.navbarButton}>Search</Text>
        </View>
        <View style={styles.content}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  navbar: {
    backgroundColor: '#2A3744',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#FEFEFE',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  navbarButton: {
    width: 50,
    color: '#FEFEFE',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
