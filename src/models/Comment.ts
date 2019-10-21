import { User } from './User';

export interface Comment {
    id: number;
    createdAt: string,
    body: string,
    author: User
}