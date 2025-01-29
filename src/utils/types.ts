export type Article = {
  author: Profile;
  createdAt: string;
  favoritesCount: number;
  favorited: boolean;
  slug: string;
  title: string;
  description: string;
  body: string;
};

export type Profile = {
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
