import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import GenreScreen from '../screens/GenreScreen';
import ArtistScreen from '../screens/ArtistScreen';

import Colors from '../constants/Colors';
import {Platform} from 'react-native';

const HomeStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      ReleaseDetail: {
        screen: DetailsScreen,
      },
      ArtistScreen: {
        screen: ArtistScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-home`
                : 'md-home'
          }
      />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    activeBackgroundColor: Colors.tabBar,
    inactiveTintColor: Colors.tabIconDefault,
    inactiveBackgroundColor: Colors.tabBar,
  },
  headerTitle: <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.backgroundColor, margin: 0, padding: 0}}>
    <Image resizeMode={'center'} style={{width: 150, height: 35.625, margin: 0, padding: 0}} source={require('../assets/images/logo.png')}/>
  </View>,
  headerStyle:
      {
        backgroundColor: Colors.backgroundColor,
        borderBottomWidth: 0,
      },
};

const DiscoverStack = createStackNavigator(
    {
      Home: {
        screen: SearchScreen,
      },
      ReleaseDetail: {
        screen: DetailsScreen,
      },
      GenreScreen: {
        screen: GenreScreen,
      },
      ArtistScreen: {
        screen: ArtistScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    },
);

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Discover',
  tabBarIcon: ({focused}) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-search`
                : 'md-search'
          }
      />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    activeBackgroundColor: Colors.tabBar,
    inactiveTintColor: Colors.tabIconDefault,
    inactiveBackgroundColor: Colors.tabBar,
  },
  headerStyle:
      {
        backgroundColor: Colors.backgroundColor,
      },
};

const LibraryStack = createStackNavigator(
    {
      Library: {
        screen: LibraryScreen,
      },
      ReleaseDetail: {
        screen: DetailsScreen,
      },
      ArtistScreen: {
        screen: ArtistScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    },
);

LibraryStack.navigationOptions = {
  tabBarLabel: 'Queue',
  tabBarIcon: ({focused}) => (
      focused ? <Image
          source={require('../assets/icons/library-white.png')}
          fadeDuration={0}
          style={[{width: 28.06, height: 20}]}
      /> : <Image
          source={require('../assets/icons/library-grey.png')}
          fadeDuration={0}
          style={[{width: 28.06, height: 20}]}
      />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    activeBackgroundColor: Colors.tabBar,
    inactiveTintColor: Colors.tabIconDefault,
    inactiveBackgroundColor: Colors.tabBar,
  },
  headerStyle:
      {
        backgroundColor: Colors.backgroundColor,
      },
};

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

export default createBottomTabNavigator({HomeStack, DiscoverStack, LibraryStack}, {
  tabBarComponent: props =>
      <TabBarComponent
          {...props}
          style={{borderTopColor: Colors.backgroundColor, backgroundColor: Colors.tabBar}}
      />,
});
