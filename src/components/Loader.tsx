import React, {PureComponent} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Animated, {Clock} from 'react-native-reanimated';
import {RunInfinite} from '../helpers/Animated';

interface LoaderProps {}

export default class Loader extends PureComponent {
  private Rotation: Animated.Node<number> = RunInfinite(
    new Clock(),
    0,
    90,
    600,
  );

  render() {
    return (
      <Animated.Image
        source={require('../../assets/img/ign.logo.png')}
        style={[
          styles.Image,
          {transform: [{rotate: Animated.concat(this.Rotation, 'deg')}]},
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    overflow: 'hidden',
  },
  Image: {
    width: 60,
    height: 60,
  },
});
