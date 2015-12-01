'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Text,
  TextInput,
  View
} = React;
var TimerMixin = require('react-timer-mixin');

var MediaCell = require('./media-cell');
var MediaDetailView = require('./media-detail-view');

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
      resultsData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
    };
  },

  componentDidMount: function () {
    this.searchMedia('mission impossible');
  },

  _urlForQuery: function (query: string): string {
    if (query.length > 2) {
      return API_URL + '?media=movie&term=' + encodeURIComponent(query);
    }
  },

  getDataSource: function (mediaItems: Array<any>): ListView.DataSource {
    return this.state.resultsData.cloneWithRows(mediaItems);
  },

  searchMedia: function (query: string) {
    this.timeoutID = null;

    this.setState({ query: query });

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          isLoading: false,
          resultsData: this.getDataSource(cachedResultsForQuery),
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
            isLoading: false,
            resultsData: this.getDataSource([])
          });
        })
        .then((responseData) => {
          return responseData.results.filter((e) => e.wrapperType !== 'collection');
        })
        .then((responseData) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = responseData;

          this.setState({
            isLoading: false,
            resultsData: this.getDataSource(resultsCache.dataForQuery[query])
          })
        });
    }
  },

  render: function() {
    var content = null;

    if (this.state.resultsData.getRowCount() === 0) {
      var text = '';

      if (!this.state.isLoading && this.state.query) {
        text = "No movies found for '" + this.state.query + "'.";
      } else if (!this.state.isLoading) {
        text = "No movies found.";
      }

      content = <View style={styles.listView.emptyList}>
        <Text style={styles.listView.emptyListText}>{text}</Text>
      </View>;
    } else {
      content = <ListView
        dataSource={this.state.resultsData}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode='on-drag'
      />;
    }

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
        <View style={[styles.listView.rowSeparator, { marginLeft: 0 }]} />
        {content}
      </View>
    );
  },

  renderSeparator: function (
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    return (
      <View
        key={"SEP_" + sectionID + "_" + rowID}
        style={[styles.listView.rowSeparator, adjacentRowHighlighted && styles.listView.rowSeparatorHighlighted]}
      />
    );
  },

  renderRow: function (
    media: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunction: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <MediaCell
        media={media}
        onSelect={() => this.selectMediaItem(media)}
        onHighlight={() => highlightRowFunction(sectionID,rowID)}
        onDeHighlight={() => highlightRowFunction(null,null)}
      />
    );
  },

  selectMediaItem: function (mediaItem) {
    this.props.navigator.push({
      title: 'Media Details',
      component: MediaDetailView,
      passProps: {
        mediaItem
      }
    });
  }
});

module.exports = MediaListView;
