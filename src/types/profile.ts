import { PublicUser } from './user';

export interface Profile extends PublicUser {
  following: boolean;
}

export interface ProfileRO {
  profile: Profile;
}
