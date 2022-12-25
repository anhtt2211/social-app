import { all } from 'redux-saga/effects';

import { articleSaga } from 'features/article/article.saga';
import { tagSaga } from 'features/tag/tag.saga';
import { authSaga } from 'features/auth/auth.saga';
import { commentSaga } from 'features/comment/comment.saga';
import { profileSaga } from 'features/profile/profile.saga';

export default function* rootSaga() {
  yield all([
    articleSaga(),
    tagSaga(),
    authSaga(),
    commentSaga(),
    profileSaga(),
  ]);
}
