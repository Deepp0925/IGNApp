import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const HeaderTitle = () => {
  return (
    <React.Fragment>
      <Image
        source={require('../../assets/img/ign.text.png')}
        style={styles.image}
      />
    </React.Fragment>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  image: {
    flex: 0,
    height: 20,
    width: 70,
    marginBottom: 10,
  },
});
