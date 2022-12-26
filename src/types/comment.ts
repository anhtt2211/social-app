import { Profile } from 'types';

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}

export interface CommentsRO {
  comments: Comment[];
}

export interface CommentRO {
  comment: Comment;
}
