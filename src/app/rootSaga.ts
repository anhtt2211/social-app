import { all } from 'redux-saga/effects';

import { articleSaga } from 'features/article/articleSaga';
import { tagSaga } from 'features/tag/tagSaga';
import { authSaga } from 'features/auth/authSaga';

export default function* rootSaga() {
  yield all([articleSaga(), tagSaga(), authSaga()]);
}
