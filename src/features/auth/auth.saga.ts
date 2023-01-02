import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { UserForRegistration, UserRO, UserSettings } from '../../types/user';
import {
  loadUser,
  signIn as login,
  signUp as register,
  updateSetting,
} from './auth.api';
import {
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  updateSettingsFailure,
  updateSettingsRequest,
  updateSettingsSuccess,
} from './auth.slice';

function* signIn({
  payload,
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const userInfo: UserRO = yield call(login, payload);

    yield put(signInSuccess(userInfo));

    localStorage.setItem('token', userInfo.user.token!);
    window.location.href = '#/';
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signUp({ payload }: PayloadAction<UserForRegistration>) {
  try {
    const userInfo: UserRO = yield call(register, payload);

    yield put(signUpSuccess(userInfo));

    localStorage.setItem('token', userInfo.user.token!);
  } catch (error) {
    yield put(signUpFailure());
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

function* onUpdateSettings({ payload }: PayloadAction<UserSettings>) {
  try {
    const userInfo: UserRO = yield call(updateSetting, payload);

    yield put(updateSettingsSuccess(userInfo));
    localStorage.setItem('token', userInfo.user.token!);
  } catch (error) {
    yield put(updateSettingsFailure());
  }
}

export function* authSaga() {
  yield takeLatest(signInRequest.type, signIn);
  yield takeLatest(signUpRequest.type, signUp);
  yield takeLatest(loadUserRequest.type, fetchUser);
  yield takeLatest(updateSettingsRequest.type, onUpdateSettings);
}
