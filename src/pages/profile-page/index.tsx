import React, { Fragment, useEffect } from 'react';

import { UserInfo } from 'features/profile/components/UserInfo';
import { useParams } from 'react-router-dom';
import { store } from 'app/store';
import {
  loadProfileRequest,
  onFollowProfileRequest,
  resetProfileState,
} from 'features/profile/profile.slice';
import { useAppSelector } from 'app/hooks';
import { ArticlesViewer } from 'features/article/components/ArticlesViewer';
import { loadArticlesRequest } from 'features/article/article.slice';
import { TabEnum } from 'types';
import { changeTab } from 'pages/home-page/home.slice';

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const {
    auth: { loginIn },
    profile: { profile, isLoading },
    article: { articles, isLoading: isLoadingArticles },
  } = useAppSelector((state) => state);
  const tabs = loginIn
    ? [TabEnum.MyArticles, TabEnum.FavoritedArticles]
    : [TabEnum.MyArticles];

  useEffect(() => {
    load(username);

    return () => {
      store.dispatch(resetProfileState());
    };
  }, [username]);

  return (
    <Fragment>
      {isLoading ? null : (
        <div>
          <UserInfo user={profile} onFollowToggle={onFollowToggle} />

          <div className="container mx-auto mt-6">
            <ArticlesViewer
              articles={articles}
              isLoading={isLoadingArticles}
              tabs={tabs}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

function load(username: string) {
  store.dispatch(changeTab(TabEnum.MyArticles));
  store.dispatch(loadProfileRequest({ username }));
  store.dispatch(loadArticlesRequest({ author: username }));
}

function onFollowToggle(username: string, follow: boolean) {
  store.dispatch(
    onFollowProfileRequest({
      username,
      follow,
    })
  );
}
