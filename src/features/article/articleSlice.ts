import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, MultipleArticles } from 'types';

export interface ArticleState {
  articles: readonly Article[];
  articlesCount: number;
  isLoading: boolean;
  error: string;
}

const initialState: ArticleState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  error: '',
};

const slice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    startLoadingArticles: () => initialState,
    loadGlobalArticlesRequest: (state) => {
      state.isLoading = true;
    },
    loadGlobalArticlesSuccess: (
      state,
      { payload }: PayloadAction<MultipleArticles>
    ) => {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoading = false;
    },
    loadGlobalArticlesFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const {
  startLoadingArticles,
  loadGlobalArticlesRequest,
  loadGlobalArticlesSuccess,
  loadGlobalArticlesFailure,
} = slice.actions;

export default slice.reducer;
