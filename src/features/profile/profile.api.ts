import { httpClient } from 'config';
import { ProfileRO } from 'types';

export async function followUser(username: string): Promise<ProfileRO> {
  return httpClient.post(`profiles/${username}/follow`);
}

export async function unFollowUser(username: string): Promise<ProfileRO> {
  return httpClient.delete(`profiles/${username}/follow`);
}

export async function getProfile(username: string): Promise<ProfileRO> {
  return httpClient.get(`profiles/${username}`);
}
