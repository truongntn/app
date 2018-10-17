import React from 'react';
import {ScrollView, View, Text, Button, Image, Platform, TouchableOpacity, ImageBackground, Dimensions, StyleSheet} from 'react-native';
import {Icon} from 'expo';
import Colors from '../constants/Colors';

var {height, width} = Dimensions.get('window');

export default class DetailsScreen extends React.Component {

  render() {
    const {navigation} = this.props;
    const track = navigation.getParam('track', null);
    return (
        <ScrollView style={{flex: 1, backgroundColor: Colors.backgroundColor, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 20}}>

          <View style={{alignItems: 'center'}}>
            <ImageBackground style={{width: width, height: width}} source={{uri: track.trackImg}}>
              <View style={[{paddingHorizontal: 10, paddingTop: 20, height: width}, styles.overlay]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Icon.Ionicons
                      name={Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'}
                      size={26}
                      color={Colors.fontColor}
                  />
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', paddingTop: width - 110}}>
                  <View style={{flex: 1, paddingTop: 10}}>
                    <Text numberOfLines={1} style={{fontSize: 14, color: Colors.fontColor, textAlign: 'left'}}>{track.title}</Text>
                    <Text numberOfLines={1} style={{fontSize: 12, color: Colors.fontColor, textAlign: 'left'}}>{track.artistName}</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity style={{}} onPress={() => console.log('to be implemented')}>
                      {/*<Icon.Ionicons*/}
                          {/*name={Platform.OS === 'ios' ? `ios-heart` : 'md-heart'}*/}
                          {/*size={60}*/}
                          {/*color={Colors.fontColor}*/}
                      {/*/>*/}
                      <ImageBackground style={{width: 55, height: 49}} source={require('../assets/images/heart.png')}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: Colors.fontColor, textAlign: 'center', marginTop: 15}}>{track.directTipCount}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}}>
                    <View style={{width: 60}}></View>
                    <Text numberOfLines={1} style={{fontSize: 14, color: Colors.fontColor, textAlign: 'right'}}>{track.directPlayCount}</Text>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? `ios-cash` : 'md-cash'}
                        size={20}
                        color={Colors.fontColor}
                        style={{paddingHorizontal: 10}}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.infoContainer}>

            <Text style={{color: Colors.fontColor, fontSize: 14}}>Genres: {track.genres.join(', ')}</Text>

            <Text style={{color: Colors.fontColor, fontSize: 12, paddingTop: 10, paddingBottom: 20}}>{track.trackDescription}</Text>
          </View>

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.3)',
    height: width,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
  }
});
