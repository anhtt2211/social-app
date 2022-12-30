import React from 'react';

import { useAppSelector } from 'app/hooks';
import { Profile } from 'types';

interface Props {
  user: Profile;
  onFollowToggle: (username: string, follow: boolean) => void;
}
export const UserInfo = ({
  user: { image, username, bio, following },
  onFollowToggle,
}: Props) => {
  const { username: sessionUsername } = useAppSelector(
    (state) => state.auth.user
  );

  return (
    <div
      className={`bg-[#f3f3f3] py-6 ${sessionUsername !== username && 'pb-16'}`}
    >
      <div className="text-center relative items-center space-y-2 w-1/2 mx-auto">
        <div className="flex justify-center">
          <img
            src={image || undefined}
            alt=""
            className="rounded-full w-24 h-24 text-center"
          />
        </div>
        <h4 className="font-bold text-2xl">{username}</h4>
        <p className="font-light text-base text-[#aaa] mt-0">{bio}</p>

        {sessionUsername !== username && (
          <ToggleFollowButton
            following={following}
            username={username}
            disabled={false}
            onClick={() => onFollowToggle(username, following)}
          />
        )}
      </div>
    </div>
  );
};

function ToggleFollowButton({
  following,
  username,
  disabled,
  onClick,
}: {
  following: boolean;
  username: string;
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="inline-block p-2 text-[#999] text-xs cursor:pointer border-1 border-[#999] rounded text-right float-right hover:bg-[#ccc]"
      onClick={onClick}
      disabled={disabled}
    >
      <i className="ion-plus-round"></i>
      &nbsp;
      {following ? ' Unfollow' : ' Follow'} {username}
    </button>
  );
}
