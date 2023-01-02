import React, { Fragment, useState } from 'react';

import { SettingsForm } from 'features/profile/components/SettingsForm';
import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { signOut, updateSettingsRequest } from 'features/auth/auth.slice';
import { UserSettings } from 'types';

export const SettingPage = () => {
  const { username, bio, email, image } = useAppSelector(
    (state) => state.auth.user
  );
  const [formObj, setFormObj] = useState<UserSettings>({
    username,
    bio,
    email,
    image,
  });

  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormObj((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const onUpdateSettings = (ev: React.FormEvent) => {
    ev.preventDefault();
    store.dispatch(updateSettingsRequest(formObj));
  };

  return (
    <Fragment>
      <div className="container mx-auto text-center">
        <div className="w-1/2 mx-auto mt-10 py-10 space-y-6">
          <h1 className="text-3xl font-semibold">Your Settings</h1>

          <div>
            <SettingsForm
              formObj={formObj}
              onChangeForm={onChangeForm}
              onUpdateSettings={onUpdateSettings}
            />
          </div>

          <div className="block border-t py-6">
            <button
              className="border-1 border-red rounded text-red p-1 px-2 hover:opacity-75"
              onClick={onLogout}
            >
              Or click here to sign out
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const onLogout = () => {
  localStorage.removeItem('token');
  store.dispatch(signOut());
};
