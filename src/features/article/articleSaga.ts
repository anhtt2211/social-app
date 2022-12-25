import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { store } from 'app/store';
import { ArticleRO, MultipleArticles } from 'types';
import {
  favoriteArticle,
  getArticleViaSlug,
  getGlobalFeeds,
  unFavoriteArticle,
} from './articleAPI';
import {
  favoriteArticleFailure,
  favoriteArticleReq,
  favoriteArticleSuccess,
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

function* favoritedArticle({
  payload: { slug, favorited },
}: PayloadAction<{ slug: string; favorited: boolean }>) {
  try {
    const isLogin = store.getState().auth.loginIn;
    if (!isLogin) {
      window.location.hash = '#/sign-in';
      return;
    }

    const article: ArticleRO = favorited
      ? yield call(unFavoriteArticle, slug)
      : yield call(favoriteArticle, slug);

    yield put(favoriteArticleSuccess(article));
  } catch (error) {
    yield put(favoriteArticleFailure());
  }
}

export function* articleSaga() {
  yield takeLatest(loadGlobalArticlesRequest.type, fetchGlobalArticles);
  yield takeLatest(loadArticleRequest.type, fetchArticle);
  yield takeLatest(favoriteArticleReq.type, favoritedArticle);
}
