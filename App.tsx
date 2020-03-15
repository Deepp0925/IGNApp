import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src';
import Providers from './src/context';
import {YellowBox} from 'react-native';

export default class App extends PureComponent {
  constructor(props: any) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Providers>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </Providers>
    );
  }
}
