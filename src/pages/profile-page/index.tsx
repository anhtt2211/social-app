import React, { useEffect } from 'react';

import { UserInfo } from 'features/profile/components/UserInfo';
import { useParams } from 'react-router-dom';
import { store } from 'app/store';
import {
  loadProfileRequest,
  resetProfileState,
} from 'features/profile/profile.slice';
import { useAppSelector } from 'app/hooks';
import { ArticlesViewer } from 'features/article/components/ArticlesViewer';

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    load(username);

    return () => {
      store.dispatch(resetProfileState());
    };
  }, [username]);

  return (
    <div>
      <UserInfo user={profile} />

      <div className="container mx-auto mt-6">{/* <ArticlesViewer /> */}</div>
    </div>
  );
};

function load(username: string) {
  store.dispatch(loadProfileRequest({ username }));
}
