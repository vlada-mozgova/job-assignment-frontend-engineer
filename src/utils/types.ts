export type Article = {
  author: ProfileAuthor;
  createdAt: string;
  favoritesCount: number;
  favorited: boolean;
  slug: string;
  title: string;
  description: string;
  body: string;
};

export type ProfileAuthor = {
  username: string;
  image: string;
  bio: string;
  following: boolean;
};

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};
