import { call, put, takeLatest } from 'redux-saga/effects';
import { MultipleArticles } from 'types';
import { getGlobalFeeds } from './articleAPI';
import {
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

export function* articleSaga() {
  yield takeLatest(loadGlobalArticlesRequest.type, fetchGlobalArticles);
}
