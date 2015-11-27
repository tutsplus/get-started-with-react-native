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
      <View style={styles.global.mainContainer}>
        <View style={styles.navbar.appearance}>
          <View style={styles.navbar.button}></View>
          <Text style={[styles.navbar.title,componentStyles.titleItalic,{
            fontWeight: 'bold'
          }]}>iTunesBrowser</Text>
          <Text style={styles.navbar.button}>Search</Text>
        </View>
        <View style={styles.global.content}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </View>
    );
  }
});

var styles = require('./styles');

var componentStyles = StyleSheet.create({
  titleItalic: {
    fontStyle: 'italic',
    fontWeight: 'normal'
  }
});

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
