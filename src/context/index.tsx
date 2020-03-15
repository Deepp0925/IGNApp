import React, {Component} from 'react';
import VideoProvider from './videos';
import ArticleProvider from './articles';

export default class Providers extends Component {
  render() {
    return (
      <ArticleProvider>
        <VideoProvider>{this.props.children}</VideoProvider>
      </ArticleProvider>
    );
  }
}
