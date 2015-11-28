'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  AlertIOS,
  Text,
  TextInput,
  View
} = React;
var TimerMixin = require('react-timer-mixin');

var styles = require('./styles');

var API_URL = 'https://itunes.apple.com/search';

var LOADING = {};

var resultsCache = {
  dataForQuery: {}
};

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
          onChange={this.props.onSearch}
        />
        <ActivityIndicatorIOS
          animating={this.props.isLoading}
          style={styles.listView.spinner}
        />
      </View>
    );
  }
});

var MediaListView = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function () {
    return {
      isLoading: false,
      query: '',
      resultsData: []
    };
  },

  _urlForQuery: function (query: string): string {
    if (query.length > 2) {
      return API_URL + '?media=movie&term=' + encodeURIComponent(query);
    }
  },

  searchMedia: function (query: string) {
    this.timeoutID = null;

    this.setState({ query: query });

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          isLoading: false,
          resulsData: cachedResultsForQuery,
        });
      } else {
        this.setState({
          isLoading: true
        });
      }
    } else {
      var queryURL = this._urlForQuery(query);

      if (!queryURL) return;

      this.setState({
        isLoading: true
      });

      LOADING[query] = true;
      resultsCache.dataForQuery[query] = null;

      fetch(queryURL)
        .then((response) => response.json())
        .catch((error) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = undefined;

          this.setState({
            isLoading: false
          });
        })
        .then((responseData) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = responseData.results;

          this.setState({
            isLoading: false,
            resultsData: resultsCache.dataForQuery[query]
          })
        });
    }
  },

  render: function() {
    return (
      <View style={styles.global.content}>
        <SearchBar
          isLoading={this.state.isLoading}
          onSearch={(event) => {
            var searchString = event.nativeEvent.text;

            this.clearTimeout(this.timeoutID);
            this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 250);
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
