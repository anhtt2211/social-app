import React from 'react';

import { Profile } from 'types';

interface Props {
  user: Profile;
}
export const UserInfo = ({ user: { image, username, bio } }: Props) => {
  return (
    <div className="bg-[#f3f3f3] py-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={image || undefined}
          alt=""
          className="rounded-full w-24 h-24"
        />
        <h4 className="font-bold text-2xl">{username}</h4>
        <p>{bio}</p>
      </div>
    </div>
  );
};
