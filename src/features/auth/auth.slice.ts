import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserForRegistration, UserRO, UserSettings } from 'types';

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

    signUpRequest: (state, action: PayloadAction<UserForRegistration>) => {},
    signUpSuccess: (state, { payload }: PayloadAction<UserRO>) => {
      state.user = payload.user;
      state.loginIn = true;
    },
    signUpFailure: (state) => {},

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

    updateSettingsRequest: (state, action: PayloadAction<UserSettings>) => {},
    updateSettingsSuccess: (state, { payload }: PayloadAction<UserRO>) => {
      state.user = payload.user;
    },
    updateSettingsFailure: (state) => {},

    endLoad: (state) => {
      state.loading = false;
    },

    signOut: (state) => {
      state.user = initialState.user;
      state.loginIn = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  updateSettingsRequest,
  updateSettingsSuccess,
  updateSettingsFailure,
  endLoad,
  signOut,
} = slice.actions;

export default slice.reducer;
