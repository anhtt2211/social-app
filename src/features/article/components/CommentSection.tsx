import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import {
  createCommentRequest,
  deleteCommentRequest,
  updateCommentBody,
} from 'pages/article-page/article-page.slice';
import React, { Fragment, useState } from 'react';
import { Article, Comment, User } from 'types';
import { ArticleComment } from './ArticleComment';
import { CommentForm } from './CommentForm';

export function CommentSection({ article }: { article: Article }) {
  const { user } = useAppSelector((state) => state.auth);
  const { comments, commentBody } = useAppSelector(
    (state) => state.articlePage.commentSection
  );

  return (
    <div className="flex flex-wrap">
      <div className="flex-[0_0_100%]">
        <CommentForm
          user={user}
          slug={article.slug}
          onPostComment={onPostComment}
          commentBody={commentBody}
          onCommentChange={onCommentChange}
        />

        {comments.length > 0 ? (
          <Fragment>
            {comments.map((comment: Comment, index: number) => (
              <ArticleComment
                key={comment.id}
                comment={comment}
                slug={article.slug}
                user={user}
                index={index}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </Fragment>
        ) : (
          <div className="mt-6">Loading comments...</div>
        )}
      </div>
    </div>
  );
}

function onPostComment(slug: string, body: string, ev: React.FormEvent) {
  ev.preventDefault();

  store.dispatch(createCommentRequest({ slug, body }));
}

function onCommentChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
  store.dispatch(updateCommentBody(ev.target.value));
}

function onDeleteComment(slug: string, commentId: number) {
  store.dispatch(deleteCommentRequest({ slug, commentId }));
}
