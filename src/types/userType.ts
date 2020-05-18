export default `
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    channel: String
    profile: String!
    banner: String
    fullname: String!
    createdat: String!
  }
`
