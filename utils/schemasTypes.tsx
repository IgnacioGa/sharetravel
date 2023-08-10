export interface UserType {
  _id: string;
  email: string;
  username: string;
  image: string;
  firstName: string;
  lastName: string;
  slug: string;
}

export interface PostType {
  _id: string;
  user: UserType;
  text: string;
  city: string;
  title: string;
  principalImage: string;
  slug: string;
}
