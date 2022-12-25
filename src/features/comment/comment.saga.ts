import { call, put, takeLatest } from 'redux-saga/effects';

import {
  loadArticleCommentFailure,
  loadArticleCommentRequest,
  loadArticleCommentSuccess,
} from 'pages/article-page/article-page.slice';
import { CommentsRO } from 'types';
import { getArticleComments } from './comment.api';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchComments({ payload }: PayloadAction<string>) {
  try {
    const comments: CommentsRO = yield call(getArticleComments, payload);

    yield put(loadArticleCommentSuccess(comments));
  } catch (error) {
    yield put(loadArticleCommentFailure(error));
  }
}

export function* commentSaga() {
  yield takeLatest(loadArticleCommentRequest.type, fetchComments);
}
