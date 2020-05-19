export default `
  type Query {
    searchhistories: [SearchHistory!]!
    watchhistories: [WatchHistory!]!
  }

  type SearchHistory {
    id: ID!
    text: String!
    user: User!
  }

  type WatchHistory {
    id: ID!
    user: User!
    video: Video!
  }
`;
