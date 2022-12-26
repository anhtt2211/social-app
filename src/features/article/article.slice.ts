import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleRO, ArticlesFilters, MultipleArticles } from 'types';

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
    loadArticlesRequest: (state, action: PayloadAction<ArticlesFilters>) => {
      state.isLoading = true;
    },
    loadArticlesSuccess: (
      state,
      { payload }: PayloadAction<MultipleArticles>
    ) => {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoading = false;
    },
    loadArticlesFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    loadYourFeedsReq: (state, action: PayloadAction<ArticlesFilters>) => {
      state.isLoading = true;
    },
    loadYourFeedsSuccess: (
      state,
      { payload }: PayloadAction<MultipleArticles>
    ) => {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoading = false;
    },
    loadYourFeedsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    favoriteArticleReq: (
      state,
      {
        payload: { slug, favorited },
      }: PayloadAction<{ slug: string; favorited: boolean }>
    ) => {},
    favoriteArticleSuccess: (state, { payload }: PayloadAction<ArticleRO>) => {
      state.articles = state.articles.map((article) =>
        article.slug === payload.article.slug ? payload.article : article
      );
    },
    favoriteArticleFailure: (state) => {},
  },
});

export const {
  startLoadingArticles,
  loadArticlesRequest,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadYourFeedsReq,
  loadYourFeedsSuccess,
  loadYourFeedsFailure,
  favoriteArticleReq,
  favoriteArticleSuccess,
  favoriteArticleFailure,
} = slice.actions;

export default slice.reducer;
