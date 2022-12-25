import { call, put, takeLatest } from 'redux-saga/effects';
import { MultipleTags } from 'types/tag';
import { getTags } from './tag.api';
import { loadTagsRequest, loadTagsFailure, loadTagsSuccess } from './tag.slice';

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
