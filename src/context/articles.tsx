import React, {PureComponent} from 'react';
import {
  IArticleContext,
  IArticleProviderState,
  IArticlesResponse,
} from '../interfaces';
import update from 'immutability-helper';

export const ArticleContext = React.createContext<IArticleContext>(null as any);

export default class ArticleProvider extends PureComponent<
  any,
  IArticleProviderState
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

  componentDidMount() {
    this.FetchNextSetOfData();
  }

  private _ArticleContext: IArticleContext = {
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
        `https://ign-apis.herokuapp.com/articles?startIndex=${this.state.nextDataStartIndex}`,
      );

      const responseJson: IArticlesResponse = await response.json();

      // set index for next time use
      this.setState({
        isLoading: false,
        // add one to prevent fetch of redudant items
        // i.e. start index is 0 and count is 10 then start from 11 (0 + 10 + 1)
        nextDataStartIndex:
          this.state.nextDataStartIndex + responseJson.count + 1,
        // update articles context and push new data
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

  private UpdateProps() {
    const NextArticleContext = {
      ...this.state,
      fetchNextSetOfData: this.FetchNextSetOfData.bind(this),
    };

    if (this._ArticleContext !== NextArticleContext) {
      this._ArticleContext = NextArticleContext;
    }
  }

  render() {
    this.UpdateProps();
    return (
      <ArticleContext.Provider value={this._ArticleContext}>
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}
