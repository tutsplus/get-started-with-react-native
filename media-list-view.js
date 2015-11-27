'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Text,
  TextInput,
  View
} = React;

var styles = require('./styles');

var SearchBar = React.createClass({
  render: function () {
    return (
      <View style={styles.listView.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for media on iTunes..."
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          style={styles.listView.searchBarInput}
          onEndEditing={this.props.onSearch}
        />
      </View>
    );
  }
});

var MediaListView = React.createClass({
  render: function() {
    return (
      <View style={styles.global.content}>
        <SearchBar
          onSearch={(event) => {
            var searchString = event.nativeEvent.text;

            AlertIOS.alert('Searching for...', searchString);
          }}
        />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    );
  }
});

module.exports = MediaListView;
