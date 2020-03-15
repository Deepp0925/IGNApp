import React, {PureComponent} from 'react';
import {
  IVideoContext,
  IVideosResponse,
  IVideoProviderState,
} from '../interfaces';

export const VideoContext = React.createContext<IVideoContext>(null as any);

export default class VideoProvider extends PureComponent<
  any,
  IVideoProviderState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      nextDataStartIndex: 0,
      isLoading: false,
      error: false,
      data: [],
    };
  }

  private _VideosContext: IVideoContext = {
    ...this.state,
    fetchNextSetOfData: this.FetchNextSetOfData.bind(this),
  };

  // fetch next set of data when done
  private async FetchNextSetOfData() {
    try {
      // setting state to loading
      this.setState({
        isLoading: true,
        error: false,
      });

      const response = await fetch(
        `https://ign-apis.herokuapp.com/videos?startIndex=${this.state.nextDataStartIndex}`,
      );

      const responseJson: IVideosResponse = await response.json();

      // set index for next time use
      this.setState({
        isLoading: false,
        // add one to prevent fetch of redudant items
        // i.e. start index is 0 and count is 10 then start from 11 (0 + 10 + 1)
        nextDataStartIndex:
          this.state.nextDataStartIndex + responseJson.count + 1,
        // update videos context and push new data
        data: [...this.state.data, ...responseJson.data],
      });
    } catch (error) {
      // error fetching request
      console.log(error);
      // set state to error mode
      this.setState({
        isLoading: false,
        error: true,
      });
    }
  }

  componentDidMount() {
    this.FetchNextSetOfData();
  }

  private UpdateProps() {
    const NextVideoContext = {
      ...this.state,
      fetchNextSetOfData: this.FetchNextSetOfData.bind(this),
    };

    if (this._VideosContext !== NextVideoContext) {
      this._VideosContext = NextVideoContext;
    }
  }

  render() {
    this.UpdateProps();
    return (
      <VideoContext.Provider value={this._VideosContext}>
        {this.props.children}
      </VideoContext.Provider>
    );
  }
}
