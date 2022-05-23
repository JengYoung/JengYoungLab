export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
