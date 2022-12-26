import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRO } from 'types';
import { MultipleTags } from 'types/tag';

export interface AuthState {
  user: User;
  loginIn: boolean;
  error: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: {
    username: '',
    bio: '',
    image: '',
    email: '',
  },
  loginIn: false,
  error: '',
  loading: true,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest: (state, action) => {},
    signInSuccess: (state, { payload }: PayloadAction<UserRO>) => {
      state.user = payload.user;
      state.loginIn = true;
    },
    signInFailure: (state, { payload }) => {
      state.loginIn = false;
      state.error = payload.message;
    },

    loadUserRequest: (state) => {},
    loadUserSuccess: (state, { payload }: PayloadAction<UserRO>) => {
      state.user = payload.user;
      state.loginIn = true;
      state.loading = false;
    },
    loadUserFailure: (state, action) => {
      state.error = action.payload;
      state.loginIn = false;
      state.loading = false;
    },

    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  endLoad,
} = slice.actions;

export default slice.reducer;
