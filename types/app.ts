export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  displayName: string;
  description: string;
  age: number;
  createdAt: string;
  events: Event[];
  location: string;
  level: Level;
  friends: any[];
  credentials: Credentials;
}

export interface Event {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  ageLimit: number;
  author: string;
  invites: any[];
  comments: any[];
  reactions: any[];
  Posts: string[];
}

export interface Level {
  exp: number;
  level: number;
  badges: number;
}

export interface Credentials {
  password: string;
  hash: any;
  refreshToken: string;
  lastRefreshed: string;
}

export interface Post {
    _id: string
    description: string
    event: string
    title: string
    author: string
    image: string
    reactions: any[]
    comments: any[]
    createdAt: string
}