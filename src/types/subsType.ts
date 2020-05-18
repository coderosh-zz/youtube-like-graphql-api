export default `
  type Query {
    subs: [Subs!]!
  }

  type Subs{
    id: ID!
    subscriber: String!
    channel: String!
    createdat: String!
  }
`
