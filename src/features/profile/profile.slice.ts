import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileRO } from 'types';

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
}

const initialState: ProfileState = {
  profile: {
    username: '',
    bio: '',
    image: '',
    following: false,
  },
  isLoading: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadProfileRequest: (
      state,
      action: PayloadAction<{ username: string }>
    ) => {
      state.isLoading = true;
    },
    loadProfileSuccess: (state, { payload }: PayloadAction<ProfileRO>) => {
      state.profile = payload.profile;
      state.isLoading = false;
    },
    loadProfileFailure: (state) => {
      state.isLoading = false;
    },

    resetProfileState: (state) => {
      state.profile = {
        username: '',
        bio: '',
        image: '',
        following: false,
      };
    },
  },
});

export const {
  loadProfileRequest,
  loadProfileSuccess,
  loadProfileFailure,
  resetProfileState,
} = slice.actions;

export default slice.reducer;
