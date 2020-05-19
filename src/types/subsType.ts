export default `
  type Mutation {
    createSubs(channel: ID!): Subs!
    deleteSubs(channel: ID!): Subs!
  }

  type Subs{
    id: ID!
    subscriber: User!
    channel: User!
    createdat: String!
  }
`;
