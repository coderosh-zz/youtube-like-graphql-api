export default `
  type Query {
    replies: [Reply!]!
  }

  type Mutation {
    createReply(comment: ID!, text: String!): Reply!
    updateReply(id: ID!, text: String!): Reply!
    deleteReply(id: ID!): Reply!
  }

  type Reply {
    id: String!
    text: String!
    user: User!
    comment: Comment!
    createdat: String!
  }
`;
