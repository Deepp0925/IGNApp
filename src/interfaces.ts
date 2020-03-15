export interface IImg {
  url: string;
  size: 'compact' | 'medium' | 'large';
  height: number;
  width: number;
}

export interface IBaseMetadata {
  slug: string;
  publishDate: string;
  networks: string[];
  state: string;
  description: string;
}

export interface IBaseStructure {
  contentId: string;
  contentType: 'video' | 'article';
  thumbnails: IImg[];
  tags: string[];
  metadata: IBaseMetadata;
}

// articles page type defintion based on given api
export interface IArticleMetadata extends IBaseMetadata {
  headline: string;
  objectName: string;
}

export interface IAuthor {
  name: string;
  thumbnail: string;
}

export interface IArticle extends IBaseStructure {
  metadata: IArticleMetadata;
  authors: IAuthor[];
}

// this is for every get request
export interface IResponseStructure {
  startIndex: number;
  count: number;
}

// specific to aricles
export interface IArticlesResponse extends IResponseStructure {
  data: IArticle[];
}

// videos page type defintion based on given api
export interface IVideoMetadata extends IBaseMetadata {
  title: string;
  duration: number;
  videoSeries: string;
}

export interface IAsset {
  url: string;
  height: number;
  width: number;
}

export interface IVideo extends IBaseStructure {
  metadata: IVideoMetadata;
  assets: IAsset[];
}

// specific to videos
export interface IVideosResponse extends IResponseStructure {
  data: IVideo[];
}

export interface IBaseContextState {
  nextDataStartIndex: number;
  isLoading: boolean;
  error: boolean;
}

export interface IArticleProviderState extends IBaseContextState {
  data: IArticle[];
}

export interface IArticleContext extends IArticleProviderState {
  fetchNextSetOfData: () => void;
}

export interface IVideoProviderState extends IBaseContextState {
  data: IVideo[];
}

export interface IVideoContext extends IVideoProviderState {
  fetchNextSetOfData: () => void;
}
