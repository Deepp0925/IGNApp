import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Tab from './Tab';

const TabBar = (props: MaterialTopTabBarProps) => {
  return (
    <View style={styles.tabbar}>
      <View style={styles.tabbarContainer}>
        {props.state.routeNames.map((tabName, i) => (
          <Tab
            key={i}
            isActive={props.state.index === i}
            tabName={tabName}
            navigate={props.navigation.navigate}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    width: '100%',
    height: 60,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  tabbarContainer: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
