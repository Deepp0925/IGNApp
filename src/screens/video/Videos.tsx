import React, {Component, PureComponent, RefObject} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import Video from './Video';
import {VideoContext} from '../../context/videos';
import {IVideoContext, IVideo} from '../../interfaces';
import WebView from '../webview';

export default class VideosScreen extends PureComponent {
  static contextType = VideoContext;
  private WebViewRef: RefObject<WebView> = React.createRef();

  context!: IVideoContext;

  renderItem = (info: ListRenderItemInfo<IVideo>) => (
    <Video {...info.item} OpenWebPage={this.OpenWebPage.bind(this)} />
  );

  OpenWebPage(slug: string) {
    this.WebViewRef.current?.OpenWith(`https://www.ign.com/videos/${slug}`);
  }

  render() {
    return (
      <React.Fragment>
        <FlatList
          data={this.context.data}
          onEndReached={this.context.fetchNextSetOfData}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.Content}
          keyExtractor={item => item.contentId}
          renderItem={this.renderItem}
        />
        <WebView ref={this.WebViewRef} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  Content: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
