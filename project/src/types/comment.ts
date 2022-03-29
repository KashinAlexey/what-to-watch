import { ShortUser } from './user';

export type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: ShortUser
}

export type ShortComment = Omit<Comment, 'date' | 'user'>;

export type Comments = Comment[];
