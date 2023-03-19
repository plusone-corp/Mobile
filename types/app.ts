/*

backend: 
    - node.js, express, socket.io, modular
      - database group, user group, auth group
    - mongodb, redis
frontend:
    - react native, expo
    - css
testing: // github/workflow
    frontend: cypress
    backend: jest

*/


// Thirty party login
// Email 2fa code

export interface User {
    username: string;
    email: string;
    avatar: string;
    displayName: string;
    description?: string;
    age?: number;
    location?: string; // country
    events: [Event];
    createdAt: Date;
    level: Level;
    post: [Post];
}

interface Level {
    exp: number;
    level: number;
    /*
        0 - level 1, badge iron
        1 - level 5, badge silver
    */
    badges: number; 
}

interface Event {
    id: string; // ObjectID
    createdAt: string;
    title: string;
    description: string;
    ageLimit: number; // n % 2 + 7
    author: string; // ObjectID user
    invites: [Invite]; // ObjectID user
    comments: [Comment];
    reactions: [Reaction];
}

interface Comment {
    author: string; // user
    content: string;
    reactions: [Reaction];
    createdAt: Date;
}

interface Reaction {
    author: string;
    reaction: number; // Reaction ID
}

interface Invite {
    user: string; // ObjectID
    status: 0 | 1 | 2 // 0 - accepted, 1 - declined, 2 - waiting
}

interface Post {
    event: string; // Object ID
    author: string; // ObjectID
    image: string; // Image url
    reactions: [Reaction];
    comments: [Comment];
}