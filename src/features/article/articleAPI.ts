import { httpClient } from 'config';
import { ArticleRO, ArticlesFilters, MultipleArticles } from 'types';
import { objectToQueryString } from 'utils';

export async function getGlobalFeeds(
  query?: ArticlesFilters
): Promise<MultipleArticles> {
  const filter: ArticlesFilters = {
    ...query,
    limit: 10,
    offset: 0,
  };
  return httpClient.get(`articles?${objectToQueryString(filter)}`);
}

export async function getArticleViaSlug(slug: string): Promise<ArticleRO> {
  return httpClient.get(`articles/${slug}`);
}
