import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ArticleRO, MultipleArticles } from 'types';
import { getArticleViaSlug, getGlobalFeeds } from './articleAPI';
import {
  loadArticleFailure,
  loadArticleRequest,
  loadArticleSuccess,
  loadGlobalArticlesFailure,
  loadGlobalArticlesRequest,
  loadGlobalArticlesSuccess,
} from './articleSlice';

function* fetchGlobalArticles() {
  try {
    const articles: MultipleArticles = yield call(getGlobalFeeds);

    yield put(loadGlobalArticlesSuccess(articles));
  } catch (error) {
    yield put(loadGlobalArticlesFailure(error));
  }
}

function* fetchArticle({ payload }: PayloadAction<string>) {
  try {
    const article: ArticleRO = yield call(getArticleViaSlug, payload);

    yield put(loadArticleSuccess(article));
  } catch (error) {
    yield put(loadArticleFailure(error));
  }
}

export function* articleSaga() {
  yield takeLatest(loadGlobalArticlesRequest.type, fetchGlobalArticles);
  yield takeLatest(loadArticleRequest.type, fetchArticle);
}
