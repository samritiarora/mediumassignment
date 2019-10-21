import { User } from './User';

export interface FeedItem {
  title: string;
  slug: string,
  body: string,
  createdAt: Date,
  tagList: string[];
  author: User;
  favorited: boolean;
  favoritesCount: number;
  description: string;
}