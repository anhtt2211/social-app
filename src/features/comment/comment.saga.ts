import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  loadArticleCommentFailure,
  loadArticleCommentRequest,
  loadArticleCommentSuccess,
} from 'pages/article-page/article-page.slice';
import { CommentRO, CommentsRO } from 'types';
import {
  createComment,
  deleteComment,
  getArticleComments,
} from './comment.api';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchComments({ payload }: PayloadAction<string>) {
  try {
    const comments: CommentsRO = yield call(getArticleComments, payload);

    yield put(loadArticleCommentSuccess(comments));
  } catch (error) {
    yield put(loadArticleCommentFailure(error));
  }
}

function* onCreateComment({
  payload,
}: PayloadAction<{ slug: string; body: string }>) {
  try {
    const { slug, body } = payload;
    const comment: CommentRO = yield call(createComment, { slug, body });

    yield put(createCommentSuccess(comment));
  } catch (error) {
    yield put(createCommentFailure());
  }
}

function* onDeleteComment({
  payload,
}: PayloadAction<{ slug: string; commentId: number }>) {
  try {
    const { slug, commentId } = payload;

    yield call(deleteComment, { slug, commentId });
    yield put(deleteCommentSuccess(commentId));
  } catch (error) {
    yield put(deleteCommentFailure());
  }
}

export function* commentSaga() {
  yield takeLatest(loadArticleCommentRequest.type, fetchComments);
  yield takeLatest(createCommentRequest.type, onCreateComment);
  yield takeLatest(deleteCommentRequest.type, onDeleteComment);
}
