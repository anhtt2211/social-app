import { httpClient } from 'config';
import { UserForRegistration, UserRO, UserSettings } from 'types';

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserRO> {
  return httpClient.post('users/login', { user: { email, password } });
}

export async function signUp(user: UserForRegistration): Promise<UserRO> {
  return httpClient.post('users', { user });
}

export async function loadUser(): Promise<UserRO> {
  return httpClient.get(`user`);
}

export async function updateSetting(user: UserSettings): Promise<UserRO> {
  return httpClient.put('user', { user });
}
