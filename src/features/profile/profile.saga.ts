import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  followAuthorFailure,
  followAuthorRequest,
  followAuthorSuccess,
} from 'pages/article-page/article-page.slice';
import { ProfileRO } from 'types';
import { followUser, getProfile, unFollowUser } from './profile.api';
import {
  loadProfileFailure,
  loadProfileRequest,
  loadProfileSuccess,
} from './profile.slice';

function* onFollowUser({
  payload,
}: PayloadAction<{ username: string; follow: boolean }>) {
  try {
    const profile: ProfileRO = payload.follow
      ? yield call(unFollowUser, payload.username)
      : yield call(followUser, payload.username);

    yield put(followAuthorSuccess(profile));
  } catch (error) {
    yield put(followAuthorFailure());
  }
}

function* fetchProfile({
  payload: { username },
}: PayloadAction<{ username: string }>) {
  try {
    const profile: ProfileRO = yield call(getProfile, username);

    yield put(loadProfileSuccess(profile));
  } catch (error) {
    yield put(loadProfileFailure());
  }
}

export function* profileSaga() {
  yield takeLatest(followAuthorRequest.type, onFollowUser);
  yield takeLatest(loadProfileRequest.type, fetchProfile);
}
