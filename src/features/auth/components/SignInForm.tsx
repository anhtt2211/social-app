import { FormGroup } from 'components/FormGroup';
import React from 'react';

interface IProps {
  formData: Record<string, string>;
  signIn: (ev: React.FormEvent) => void;
  onChangeForm: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
}

export const SignInForm = ({ signIn, formData, onChangeForm }: IProps) => {
  return (
    <form onSubmit={signIn} className="block">
      <fieldset>
        <FormGroup
          type="text"
          key={'email'}
          placeholder={'Email...'}
          value={formData.email}
          lg={false}
          disabled={false}
          onChange={(event) => onChangeForm(event, 'email')}
        />
        <FormGroup
          type="password"
          key="password"
          placeholder={'Password...'}
          value={formData.password}
          lg={false}
          disabled={false}
          onChange={(event) => onChangeForm(event, 'password')}
        />
        <button className="bg-green text-white text-xl font-semibold px-12 py-4 rounded-xl">
          Sign in
        </button>
      </fieldset>
    </form>
  );
};
