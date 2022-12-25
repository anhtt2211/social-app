import { all } from 'redux-saga/effects';

import { articleSaga } from 'features/article/article.saga';
import { tagSaga } from 'features/tag/tag.saga';
import { authSaga } from 'features/auth/auth.saga';

export default function* rootSaga() {
  yield all([articleSaga(), tagSaga(), authSaga()]);
}
