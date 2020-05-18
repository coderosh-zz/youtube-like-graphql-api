export default `
  type Query {
    reactions: [Reaction!]!
  }

  type Reaction {
    id: ID!
    reaction: String!
    videoid: String!
    userid: String!
  }
`
