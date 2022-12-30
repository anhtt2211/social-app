import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  blocks?: Block[];
}

export interface Info {
  width?: number;
  height?: number;
}

export interface File {
  info?: Info;
  url?: string;
}

export interface Data {
  alignment?: string;
  text?: string;
  caption?: string;
  file?: File;
}
export interface Block {
  data: Data;
  type: BlockTypeEnum;
}

export interface ArticlesFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface MultipleArticles {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleRO {
  article: Article;
}

export enum TabEnum {
  YourFeed = 'Your feed',
  GlobalFeed = 'Global feed',

  MyArticles = 'My Articles',
  FavoritedArticles = 'Favorited Articles',
}

export enum BlockTypeEnum {
  BIGGER_HEADER = 'biggerHeader',
  SMALL_HEADER = 'smallerHeader',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',
  QUOTE = 'quote',
  PULL_QUOTE = 'pullquote',
  LINK_TOOL = 'linkTool',
  DELIMITER = 'delimiter',
}
