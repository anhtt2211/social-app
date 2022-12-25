import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  followAuthorFailure,
  followAuthorRequest,
  followAuthorSuccess,
} from 'pages/article-page/article-page.slice';
import { ProfileRO } from 'types';
import { followUser, unFollowUser } from './profile.api';

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

export function* profileSaga() {
  yield takeLatest(followAuthorRequest.type, onFollowUser);
}
