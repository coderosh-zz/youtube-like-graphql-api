export default `
  type Query {
    comments: [Comment!]!
  }

  type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateCommentInput {
    text: String!
    video: String!
  }

  input UpdateCommentInput {
    text: String!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    video: Video!
    createdat: String!
  }
`
