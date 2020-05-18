export default `
  type Query {
    replies: [Reply!]!
  }

  type Reply {
    id: String!
    text: String!
    userid: String!
    commentid: String!
    createdat: String!
  }
`
