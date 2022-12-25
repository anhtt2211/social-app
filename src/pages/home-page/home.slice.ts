import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETab } from 'types';

export interface HomeState {
  tab: string;
}

const initialState: HomeState = {
  tab: ETab.GlobalFeed,
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeTab: (state, { payload }: PayloadAction<string>) => {
      state.tab = payload;
    },
  },
});

export const { changeTab } = slice.actions;

export default slice.reducer;
