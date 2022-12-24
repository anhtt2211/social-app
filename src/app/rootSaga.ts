import { all } from 'redux-saga/effects';

import { articleSaga } from 'features/article/articleSaga';
import { tagSaga } from 'features/tag/tagSaga';

export default function* rootSaga() {
  yield all([articleSaga(), tagSaga()]);
}
