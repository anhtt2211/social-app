import { httpClient } from 'config';
import { ArticlesFilters, MultipleArticles } from 'types';
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
