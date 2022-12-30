import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Article,
  ArticleRO,
  Comment,
  CommentRO,
  CommentsRO,
  ProfileRO,
} from 'types';

// wip => comments to commentSection: {comments, commentBody}
export interface ArticlePageState {
  article: Article;
  commentSection: {
    comments: Comment[];
    commentBody: string;
    submittingAction: boolean;
  };
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
    blocks: [],
  },
  commentSection: {
    comments: [],
    commentBody: '',
    submittingAction: false,
  },
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

    favoriteArticlePageRequest: (state, action) => {},
    favoriteArticlePageSuccess: (
      state,
      { payload }: PayloadAction<ArticleRO>
    ) => {
      state.article = payload.article;
    },
    favoriteArticlePageFailure: (state, action) => {},

    loadArticleCommentRequest: (
      state,
      { payload }: PayloadAction<string>
    ) => {},
    loadArticleCommentSuccess: (
      state,
      { payload }: PayloadAction<CommentsRO>
    ) => {
      state.commentSection.comments = payload.comments;
    },
    loadArticleCommentFailure: (state, action) => {},

    createCommentRequest: (
      state,
      { payload }: PayloadAction<{ slug: string; body: string }>
    ) => {
      state.commentSection.submittingAction = true;
    },
    createCommentSuccess: (state, { payload }: PayloadAction<CommentRO>) => {
      state.commentSection.comments.unshift(payload.comment);
      state.commentSection.commentBody = '';
      state.commentSection.submittingAction = false;
    },
    createCommentFailure: (state) => {
      state.commentSection.submittingAction = false;
    },

    deleteCommentRequest: (
      state,
      action: PayloadAction<{ slug: string; commentId: number }>
    ) => {},
    deleteCommentSuccess: (state, { payload }: PayloadAction<number>) => {
      state.commentSection.comments = state.commentSection.comments.filter(
        (comment) => comment.id !== payload
      );
    },
    deleteCommentFailure: (state) => {},

    updateCommentBody: (state, { payload }: PayloadAction<string>) => {
      state.commentSection.commentBody = payload;
    },

    followAuthorRequest: (
      state,
      { payload }: PayloadAction<{ username: string; follow: boolean }>
    ) => {},
    followAuthorSuccess: (state, { payload }: PayloadAction<ProfileRO>) => {
      state.article.author = payload.profile;
    },
    followAuthorFailure: (state) => {},

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
        blocks: [],
      };
      state.commentSection.comments = [];
      state.commentSection.commentBody = '';
    },
  },
});

export const {
  loadArticleRequest,
  loadArticleSuccess,
  loadArticleFailure,
  favoriteArticlePageRequest,
  favoriteArticlePageSuccess,
  favoriteArticlePageFailure,
  loadArticleCommentRequest,
  loadArticleCommentSuccess,
  loadArticleCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentBody,
  followAuthorRequest,
  followAuthorSuccess,
  followAuthorFailure,
  resetArticle,
} = slice.actions;

export default slice.reducer;
