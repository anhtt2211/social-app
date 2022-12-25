import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment, CommentsRO } from 'types';

export interface ArticlePageState {
  comments: Comment[];
}

const initialState: ArticlePageState = {
  comments: [],
};

const slice = createSlice({
  name: 'article-page',
  initialState,
  reducers: {
    loadArticleCommentRequest: (
      state,
      { payload }: PayloadAction<string>
    ) => {},
    loadArticleCommentSuccess: (
      state,
      { payload }: PayloadAction<CommentsRO>
    ) => {
      state.comments = payload.comments;
    },
    loadArticleCommentFailure: (state, action) => {},
  },
});

export const {
  loadArticleCommentRequest,
  loadArticleCommentSuccess,
  loadArticleCommentFailure,
} = slice.actions;

export default slice.reducer;
