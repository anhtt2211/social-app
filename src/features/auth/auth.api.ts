import { httpClient } from 'config';
import { UserRO } from 'types';

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserRO> {
  return httpClient.post('users/login', { user: { email, password } });
}

export async function loadUser(): Promise<UserRO> {
  return httpClient.get(`user`);
}
