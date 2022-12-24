import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MultipleTags } from 'types/tag';

export interface TagState {
  tags: string[];
  isLoading: boolean;
  error: string;
}

const initialState: TagState = {
  tags: [],
  isLoading: false,
  error: '',
};

const slice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    startLoadingTags: () => initialState,
    loadTagsRequest: (state) => {
      state.isLoading = true;
    },
    loadTagsSuccess: (state, { payload }: PayloadAction<MultipleTags>) => {
      state.tags = payload.tags;
      state.isLoading = false;
    },
    loadTagsFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const {
  startLoadingTags,
  loadTagsRequest,
  loadTagsSuccess,
  loadTagsFailure,
} = slice.actions;

export default slice.reducer;
