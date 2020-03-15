import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
interface TabProps {
  isActive: boolean;
  tabName: string;
  navigate: Function;
}

const Tab = (props: TabProps) => {
  const color = props.isActive ? '#222' : '#ccc';

  const ChangeTab = useCallback(() => {
    props.navigate(props.tabName.toLowerCase());
  }, []);

  return (
    <TouchableOpacity style={styles.TabWrapper} onPress={ChangeTab}>
      <View style={styles.TabInfoWrapper}>
        {props.tabName.toLowerCase() === 'articles' ? (
          <Ionicons
            name="md-paper"
            style={styles.TabIcon}
            size={25}
            color={color}
          />
        ) : (
          <SimpleLineIcon
            name="control-play"
            size={20}
            color={color}
            style={styles.TabIcon}
          />
        )}
        <Text
          style={[
            styles.TabText,
            {
              color,
            },
          ]}>
          {props.tabName.toUpperCase()}
        </Text>
      </View>
      <View
        style={[
          styles.TabIndicator,
          {backgroundColor: props.isActive ? '#222' : 'transparent'},
        ]}
      />
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  TabWrapper: {
    width: 120,
    margin: 5,
    height: '100%',
    alignItems: 'center',
  },
  TabInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TabIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TabText: {
    fontSize: 17,
    fontWeight: '700',
  },
  TabIndicator: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
});
