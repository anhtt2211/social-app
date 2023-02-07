import { httpClient } from 'config';
import { ArticleRO, ArticlesFilters, MultipleArticles } from 'types';
import { objectToQueryString } from 'utils';

export async function getGlobalFeeds(
  query?: ArticlesFilters
): Promise<MultipleArticles> {
  const filter: ArticlesFilters = {
    ...query,
    limit: query?.limit || 10,
    offset: query?.offset || 0,
  };
  return httpClient.get(`articles?${objectToQueryString(filter)}`);
}

export async function getYourFeeds(
  query?: ArticlesFilters
): Promise<MultipleArticles> {
  const filter: ArticlesFilters = {
    ...query,
    limit: query?.limit || 10,
    offset: query?.offset || 0,
  };
  return httpClient.get(`articles/feed?${objectToQueryString(filter)}`);
}

export async function getArticleViaSlug(slug: string): Promise<ArticleRO> {
  return httpClient.get(`articles/${slug}`);
}

export async function favoriteArticle(slug: string): Promise<ArticleRO> {
  return httpClient.post(`articles/${slug}/favorite`);
}

export async function unFavoriteArticle(slug: string): Promise<ArticleRO> {
  return httpClient.delete(`articles/${slug}/favorite`);
}

export async function deleteArticle(slug: string): Promise<void> {
  return httpClient.delete(`articles/${slug}`);
}
