import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import articleReducer from 'features/article/articleSlice';
import tagReducer from 'features/tag/tagSlice';
import authReducer from 'features/auth/authSlice';
import homeReducer from 'pages/home-page/homeSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: articleReducer,
    tag: tagReducer,
    auth: authReducer,
    home: homeReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
