import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Comment from '../../components/Comment';
import {IVideo} from '../../interfaces';
import {getTimeElapsed} from '../../helpers/Time';

interface VideoProps extends IVideo {
  OpenWebPage: (uri: string) => void;
}

export default class Video extends Component<VideoProps> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={styles.CardWrapper}>
        <View style={styles.PostTimeWrapper}>
          <Text style={styles.PostTime}>
            {getTimeElapsed(this.props.metadata.publishDate)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.Card}
          activeOpacity={0.8}
          onPress={this.props.OpenWebPage.bind(this, this.props.metadata.slug)}>
          <View style={styles.ImgWrapper}>
            <Image
              source={{
                uri: (
                  this.props.thumbnails.find(img => img.size === 'large') ||
                  this.props.thumbnails[0]
                ).url,
              }}
              style={styles.Img}
            />
            <View style={styles.PlayBtn}>
              <SimpleLineIcon
                name="control-play"
                size={25}
                color="#fff"
                style={styles.PlayIcon}
              />
            </View>
          </View>

          <View style={styles.TitleWrapper}>
            <Text style={styles.Title}>{this.props.metadata.title}</Text>
          </View>
          <Comment contentId={this.props.contentId} />
        </TouchableOpacity>
      </View>
    );
  }
}

function ImageDim() {
  // these dimension are always going to be the same
  const width = 306,
    height = 172,
    PhoneDim = Dimensions.get('window');
  const ImgWidth = PhoneDim.width - 20 - 20 - width;
  return {
    width: ImgWidth + width,
    height: ImgWidth + height,
  };
}

const styles = StyleSheet.create({
  CardWrapper: {
    overflow: 'hidden',
    marginBottom: 15,
  },
  PostTimeWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  PostTime: {
    fontSize: 13,
    marginHorizontal: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#c0392b',
  },
  Card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  TitleWrapper: {
    paddingBottom: 10,
  },
  Title: {
    fontSize: 18,
    fontWeight: '400',
  },
  ImgWrapper: {
    marginBottom: 30,
  },
  PlayBtn: {
    position: 'absolute',
    backgroundColor: '#c0392b',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    bottom: -10,
    left: 20,
  },
  PlayIcon: {
    right: -2,
  },
  Img: {
    width: ImageDim().width,
    height: ImageDim().height,
    borderRadius: 5,
  },
});
