import { httpClient } from 'config';
import { CommentsRO } from 'types';

export async function getArticleComments(slug: string): Promise<CommentsRO> {
  return httpClient.get(`articles/${slug}/comments`);
}
