import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { store } from 'app/store';
import { signInRequest, signUpRequest } from 'features/auth/auth.slice';
import { SignInForm } from 'features/auth/components/SignInForm';
import { SignUpForm } from 'features/auth/components/SignUpForm';

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
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

  const signUp = (ev: React.FormEvent) => {
    ev.preventDefault();

    store.dispatch(signUpRequest(formData));
  };

  return (
    <Fragment>
      <div className="container text-center py-10 mx-auto space-y-10">
        <div>
          <h1 className="text-2xl mb-4">Sign up</h1>
          <Link to="/sign-in">
            <p className="text-green">Have an account?</p>
          </Link>
        </div>

        <SignUpForm
          formData={formData}
          signUp={signUp}
          onChangeForm={onChangeForm}
        />
      </div>
    </Fragment>
  );
};
