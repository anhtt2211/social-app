import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  favoriteArticlePageRequest,
  favoriteArticlePageSuccess,
  loadArticleFailure,
  loadArticleRequest,
  loadArticleSuccess,
} from 'pages/article-page/article-page.slice';
import { ArticleRO, ArticlesFilters, MultipleArticles } from 'types';
import {
  favoriteArticle,
  getArticleViaSlug,
  getGlobalFeeds,
  getYourFeeds,
  unFavoriteArticle,
} from './article.api';
import {
  favoriteArticleFailure,
  favoriteArticleReq,
  favoriteArticleSuccess,
  loadArticlesFailure,
  loadArticlesRequest,
  loadArticlesSuccess,
  loadYourFeedsFailure,
  loadYourFeedsReq,
  loadYourFeedsSuccess,
} from './article.slice';

function* fetchGlobalArticles({ payload }: PayloadAction<ArticlesFilters>) {
  try {
    const articles: MultipleArticles = yield call(getGlobalFeeds, payload);

    yield put(loadArticlesSuccess(articles));
  } catch (error) {
    yield put(loadArticlesFailure(error));
  }
}

function* fetchYourFeeds({ payload }: PayloadAction<ArticlesFilters>) {
  try {
    const articles: MultipleArticles = yield call(getYourFeeds, payload);

    yield put(loadYourFeedsSuccess(articles));
  } catch (error) {
    yield put(loadYourFeedsFailure(error));
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
  type,
}: PayloadAction<{ slug: string; favorited: boolean }>) {
  try {
    const article: ArticleRO = favorited
      ? yield call(unFavoriteArticle, slug)
      : yield call(favoriteArticle, slug);

    if (type === 'article/favoriteArticleReq') {
      yield put(favoriteArticleSuccess(article));
    } else {
      yield put(favoriteArticlePageSuccess(article));
    }
  } catch (error) {
    yield put(favoriteArticleFailure());
  }
}

export function* articleSaga() {
  yield takeLatest(loadArticlesRequest.type, fetchGlobalArticles);
  yield takeLatest(loadYourFeedsReq.type, fetchYourFeeds);
  yield takeLatest(loadArticleRequest.type, fetchArticle);
  yield takeLatest(favoriteArticleReq.type, favoritedArticle);
  yield takeLatest(favoriteArticlePageRequest.type, favoritedArticle);
}
