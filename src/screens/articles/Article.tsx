import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';

import {IArticle} from '../../interfaces';
import Comment from '../../components/Comment';
import {getTimeElapsed} from '../../helpers/Time';

interface ArticleProps extends IArticle {
  OpenWebPage: (uri: string) => void;
}

export default class Article extends Component<ArticleProps> {
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
          activeOpacity={0.8}
          style={styles.Card}
          onPress={this.props.OpenWebPage.bind(this, this.props.metadata.slug)}>
          <View style={styles.TitleWrapper}>
            <Text style={styles.Title}>{this.props.metadata.headline}</Text>
          </View>
          <View style={styles.ImgWrapper}>
            <Image
              source={{
                uri: (
                  this.props.thumbnails.find(img => img.size === 'large') ||
                  this.props.thumbnails[0]
                )?.url,
              }}
              style={styles.Img}
            />
          </View>
          <View style={styles.DescWrapper}>
            <Text style={styles.Desc}>{this.props.metadata.description}</Text>
          </View>
          <View style={styles.AuthorWrapper}>
            <View style={styles.AuthorImgWrapper}>
              <Image
                source={{
                  uri:
                    this.props.authors[0]?.thumbnail ||
                    'https://static-cdn.jtvnw.net/jtv_user_pictures/ign-profile_image-ad36d361e4a59109-300x300.jpeg',
                }}
                style={styles.AuthorImg}
              />
            </View>
            <View style={styles.AuthorNameWrapper}>
              <Text style={styles.ByLine}>
                By{' '}
                {this.props.authors[0]?.name ? (
                  <Text style={styles.AuthorName}>
                    {this.props.authors[0]?.name}
                  </Text>
                ) : (
                  'IGN'
                )}
              </Text>
            </View>
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
    fontSize: 22,
    fontWeight: '900',
  },
  ImgWrapper: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  Img: {
    width: ImageDim().width,
    height: ImageDim().height,
    borderRadius: 5,
  },
  DescWrapper: {
    marginBottom: 10,
  },
  Desc: {},
  AuthorWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  AuthorImgWrapper: {
    width: 50,
  },
  AuthorImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  AuthorNameWrapper: {},
  ByLine: {},
  AuthorName: {
    textDecorationLine: 'underline',
  },
});
