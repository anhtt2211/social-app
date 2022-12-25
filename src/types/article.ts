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

export enum ETab {
  YourFeed = 'Your feed',
  GlobalFeed = 'Global feed',
}
