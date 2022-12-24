import { call, put, takeLatest } from 'redux-saga/effects';
import { MultipleTags } from 'types/tag';
import { getTags } from './tagAPI';
import { loadTagsRequest, loadTagsFailure, loadTagsSuccess } from './tagSlice';

function* fetchTags() {
  try {
    const tags: MultipleTags = yield call(getTags);

    yield put(loadTagsSuccess(tags));
  } catch (error) {
    yield put(loadTagsFailure(error));
  }
}

export function* tagSaga() {
  yield takeLatest(loadTagsRequest.type, fetchTags);
}
