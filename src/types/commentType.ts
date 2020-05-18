export default `
  type Query {
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    userid: String!
    videoid: String!
    createdat: String!
  }
`
