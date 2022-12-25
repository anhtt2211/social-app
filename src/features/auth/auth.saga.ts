import { call, put, takeLatest } from 'redux-saga/effects';

import { UserRO } from '../../types/user';
import {
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  signInFailure,
  signInRequest,
  signInSuccess,
} from './auth.slice';
import { loadUser, signIn as login } from './auth.api';
import { PayloadAction } from '@reduxjs/toolkit';

function* signIn({
  payload,
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const userInfo: UserRO = yield call(login, payload);

    localStorage.setItem('token', userInfo.user.token!);
    window.location.href = '/';

    yield put(signInSuccess(userInfo));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* fetchUser() {
  try {
    const userInfo: UserRO = yield call(loadUser);

    yield put(loadUserSuccess(userInfo));
  } catch (error) {
    yield put(loadUserFailure(error));
  }
}

export function* authSaga() {
  yield takeLatest(signInRequest.type, signIn);
  yield takeLatest(loadUserRequest.type, fetchUser);
}
