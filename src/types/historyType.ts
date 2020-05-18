export default `
  type Query {
    searchhistories: [SearchHistory!]!
    watchhistories: [WatchHistory!]!
  }

  type SearchHistory {
    id: ID!
    text: String!
    userid: String
  }

  type WatchHistory {
    id: ID!
    userid: String!
    videoid: String!
  }
`
