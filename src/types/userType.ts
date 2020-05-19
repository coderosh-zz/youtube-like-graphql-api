export default `
  type Query {
    users: [User!]!
    me: User!
    userById(id: String!): User!
    userByEmail(email: String!): User!
  }

  type Mutation {
    signUp(data: SignupUserInput!): AuthPayload!
    login(data: LoginUserInput!): AuthPayload!
    refreshToken(token: String!): AuthPayloadWithoutRefresh!
    updateUser(data: UpdateUserInput!): User!
    deleteUser: User!
  }

  type AuthPayload {
    user: User!
    token: String!
    refresh: String!
  }

  type AuthPayloadWithoutRefresh {
    user: User!
    token: String!
  }

  input SignupUserInput {
    email: String!
    channel: String
    profile: String
    banner: String
    fullname: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    email: String,
    channel: String,
    profile: String,
    fullName: String,
    password: String,
    banner: String
  }

  type User {
    id: ID!
    email: String!
    channel: String
    profile: String!
    banner: String
    fullname: String!
    createdat: String!
    videos: [Video!]!
    comments: [Comment!]!
    replies: [Reply!]!
    reactions: [Reaction!]!
  }
`;
