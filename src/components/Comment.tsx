import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface CommentProps {
  contentId: string;
}

interface CommentState {
  count: number;
}

export default class Comment extends Component<CommentProps, CommentState> {
  state = {
    count: 0,
  };

  shouldComponentUpdate(nextProps: CommentProps, nextState: CommentState) {
    return this.state.count !== nextState.count;
  }

  componentDidMount() {
    fetch(`https://ign-apis.herokuapp.com/comments?ids=${this.props.contentId}`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          count: resJson.content[0].count,
        });
      })
      .catch(err => console.log('error occurred fetching comment count'));
  }

  private onCommentPress() {
    Alert.alert('Comment Pressed');
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.CommentWrapper}
        onPress={this.onCommentPress.bind(this)}>
        <View style={styles.CommentIconWrapper}>
          <EvilIcons name="comment" size={30} />
        </View>
        <View style={styles.CommentCountWrapper}>
          <Text style={styles.CommentCount}>{this.state.count}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  CommentWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  CommentIconWrapper: {
    // width: 40,
  },
  CommentCountWrapper: {
    padding: 5,
  },
  CommentCount: {
    fontSize: 15,
    fontWeight: '400',
  },
});
