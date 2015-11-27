'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  AlertIOS
} = React;

var MediaListView = require('./media-list-view');

var styles = require('./styles');


StatusBarIOS.setStyle('light-content');

var iTunesBrowser = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.global.mainContainer}
        barTintColor='#2A3744'
        tintColor='#EFEFEF'
        titleTextColor='#EFEFEF'
        initialRoute={{
          component: MediaListView,
          title: 'iTunesBrowser',
          rightButtonTitle: 'Search',
          onRightButtonPress: () => AlertIOS.alert(
            'Search', 'You pressed the search button.'
          )
        }}
      />
    );
  }
});

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
