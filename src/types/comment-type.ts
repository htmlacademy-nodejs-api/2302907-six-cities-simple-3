import {UserType} from './user.type.js';

export type CommentType = {
  text: string;
  publicDate: Date;
  rating: number;
  author: UserType;
}
