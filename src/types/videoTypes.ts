export default `
  type Query {
    videos: [Video!]!
  }

  type Video {
    id: ID!
    title: String!
    description: String
    views: Int!
    creator: String!
    createdat: String!
  }
`
