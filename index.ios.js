import React, { Component } from 'react';
import { AppRegistry, Image, ListView, ScrollView, StyleSheet, Text, View } from 'react-native';

import RunInfo from './components/run-info';
import RunInfoNumeric from './components/run-info-numeric';

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  textInput: {
    height: 55,
    padding: 10,
    paddingTop: 25,
    fontSize: 20
  }
});

export default class GetStarted extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });
    this.state = { dataSource: ds.cloneWithRows([
      'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
      'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
      'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    ])};

    // setInterval(() => {
    //   this.distanceInfo.setState({ value: Math.random() * 100 });
    //   this.speedInfo.setState({ value: Math.random() * 15 });
    //   this.directionInfo.setState({
    //     value: this.directionInfo.state === 'N' ? 'NW' : 'N'
    //   });
    // }, 1000);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSeparator={() => <View style={{backgroundColor: '#CCC', height: 1}} />}
        renderRow={(row) => (
          <View style={{flexDirection: 'row'}}>
            <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 50, height: 50, margin: 10}} />
            <Text style={{fontSize: 25, padding: 10}}>{row}</Text>
          </View>
        )}
      />
      // <ScrollView horizontal={true} pagingEnabled={true}>
      //   <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'}} style={{width: 320, height: 213, margin: 25}} />
      // </ScrollView>
      // <View style={{flex: 1}}>
      //   <Text style={{flex: 1, fontSize: 18}}>
      //     NOT A MAP VIEW
      //   </Text>
      //   <View style={styles.infoWrapper}>
      //     <RunInfoNumeric title="Distance" unit="km"
      //       ref={(info) => this.distanceInfo = info}
      //     />
      //     <RunInfoNumeric title="Speed" unit="km/h"
      //       ref={(info) => this.speedInfo = info}
      //     />
      //     <RunInfo title="Direction"
      //       value="NE"
      //       ref={(info) => this.directionInfo = info}
      //     />
      //   </View>
      // </View>
    );
  }
}

AppRegistry.registerComponent('GetStarted', () => GetStarted);
