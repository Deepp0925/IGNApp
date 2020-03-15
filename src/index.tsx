import React, {Component} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from '@react-navigation/material-top-tabs';
import ArticlesScreen from './screens/articles/Articles';
import VideosScreen from './screens/video/Videos';
import HeaderTitle from './global/HeaderTitle';
import TabBar from './global/tabbar/Tabbar';
import {StyleSheet} from 'react-native';

const TopNavigator = createMaterialTopTabNavigator();
const SceneStyle = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: '#fff',
  },
});
function AppScreens() {
  return (
    <TopNavigator.Navigator
      tabBar={TabBar}
      sceneContainerStyle={SceneStyle.sceneContainerStyle}>
      <TopNavigator.Screen component={ArticlesScreen} name="articles" />
      <TopNavigator.Screen component={VideosScreen} name="videos" />
    </TopNavigator.Navigator>
  );
}

const AppStack = createStackNavigator();
const HeaderOptions: StackNavigationOptions = {
  headerTitle: HeaderTitle,
  headerStyle: {
    backgroundColor: '#c0392b',
  },
};
export default () => (
  <AppStack.Navigator screenOptions={HeaderOptions}>
    <AppStack.Screen name="App" component={AppScreens} />
  </AppStack.Navigator>
);
