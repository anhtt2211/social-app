import { httpClient } from 'config';
import { CommentRO, CommentsRO } from 'types';

export async function getArticleComments(slug: string): Promise<CommentsRO> {
  return httpClient.get(`articles/${slug}/comments`);
}

export async function createComment({
  slug,
  body,
}: {
  slug: string;
  body: string;
}): Promise<CommentRO> {
  return httpClient.post(`articles/${slug}/comments`, { comment: { body } });
}

export async function deleteComment({
  slug,
  commentId,
}: {
  slug: string;
  commentId: number;
}): Promise<void> {
  return httpClient.delete(`articles/${slug}/comments/${commentId}`);
}
