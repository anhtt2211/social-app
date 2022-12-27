import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { store } from 'app/store';
import { signInRequest } from 'features/auth/auth.slice';
import { SignInForm } from 'features/auth/components/SignInForm';

export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const signIn = (ev: React.FormEvent) => {
    ev.preventDefault();
    store.dispatch(signInRequest(formData));
  };

  return (
    <div className="container text-center py-10 mx-auto space-y-10">
      <div>
        <h1 className="text-2xl mb-4">Sign in</h1>
        <Link to="/sign-up">
          <p className="text-green">Need an account?</p>
        </Link>
      </div>

      <SignInForm
        formData={formData}
        signIn={signIn}
        onChangeForm={onChangeForm}
      />
    </div>
  );
};
