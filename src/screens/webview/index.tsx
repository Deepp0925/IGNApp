import React, {Component, RefObject} from 'react';
import {Text, View, Dimensions, NativeScrollEvent, Alert} from 'react-native';
import RNWebView from 'react-native-webview';
// due to issues with react native built in modal issues this library is being used as a fix/ workaround
import RNBSheet from 'react-native-raw-bottom-sheet';

interface WebViewState {
  uri: string;
}

const PhoneDims = Dimensions.get('window');
export default class WebView extends Component<any, WebViewState> {
  private RNBSheetRef: RefObject<RNBSheet> = React.createRef();

  state = {
    uri: 'https://ign.com/',
  };

  OpenWith(uri: string) {
    if (this.state.uri !== uri) {
      this.setState({
        uri,
      });
    }
    this.RNBSheetRef.current?.open();
  }

  render() {
    return (
      <RNBSheet
        ref={this.RNBSheetRef}
        duration={200}
        closeOnPressBack
        closeOnPressMask
        height={PhoneDims.height - 60}>
        <RNWebView
          source={{uri: this.state.uri}}
          mediaPlaybackRequiresUserAction
        />
      </RNBSheet>
    );
  }
}
