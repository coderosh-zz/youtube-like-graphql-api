export default `
  type Query {
    reactions: [Reaction!]!
  }

  type Mutation {
    manageReaction(video: ID!, liked: Boolean!): Reaction!
  }

  type Reaction {
    id: ID!
    reaction: String!
    video: Video!
    user: User!
  }
`;
