import React, {Component, PureComponent, RefObject} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import Loader from '../../components/Loader';
import Article from './Article';
import {IArticle, IArticleContext} from '../../interfaces';
import {ArticleContext} from '../../context/articles';
import WebView from '../webview';

export default class ArticlesScreen extends PureComponent {
  static contextType = ArticleContext;

  context!: IArticleContext;
  private WebViewRef: RefObject<WebView> = React.createRef();

  renderItem = (info: ListRenderItemInfo<IArticle>) => (
    <Article {...info.item} OpenWebPage={this.OpenWebPage.bind(this)} />
  );

  OpenWebPage(slug: string) {
    this.WebViewRef.current?.OpenWith(`https://www.ign.com/articles/${slug}`);
  }

  render() {
    return (
      <>
        <FlatList
          data={this.context.data}
          contentContainerStyle={styles.Content}
          onEndReached={this.context.fetchNextSetOfData}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.contentId}
          renderItem={this.renderItem}
        />
        <WebView ref={this.WebViewRef} />
      </>
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
