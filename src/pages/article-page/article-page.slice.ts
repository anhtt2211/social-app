import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article, ArticleRO, Comment, CommentsRO } from 'types';

export interface ArticlePageState {
  article: Article;
  comments: Comment[];
  isLoading: boolean;
  error: string;
}

const initialState: ArticlePageState = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      following: false,
      username: '',
      bio: '',
      image: '',
    },
  },
  comments: [],
  isLoading: false,
  error: '',
};

const slice = createSlice({
  name: 'article-page',
  initialState,
  reducers: {
    loadArticleRequest: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = true;
    },
    loadArticleSuccess: (state, { payload }: PayloadAction<ArticleRO>) => {
      state.isLoading = false;
      state.article = payload.article;
    },
    loadArticleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

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

    resetArticle: (state) => {
      state.article = {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: [],
        createdAt: '',
        updatedAt: '',
        favorited: false,
        favoritesCount: 0,
        author: {
          following: false,
          username: '',
          bio: '',
          image: '',
        },
      };
      state.comments = [];
    },
  },
});

export const {
  loadArticleRequest,
  loadArticleSuccess,
  loadArticleFailure,
  loadArticleCommentRequest,
  loadArticleCommentSuccess,
  loadArticleCommentFailure,
  resetArticle,
} = slice.actions;

export default slice.reducer;
