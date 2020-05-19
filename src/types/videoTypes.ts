export default `
  scalar Upload

  type Query {
    videos: [Video!]!
    video(id: ID!): Video!
  }

  type Mutation {
    createVideo(data: CreateVideoInput!): Video!
    updateVideo(id: ID!, data: UpdateVideoInput!): Video!
    deleteVideo(id: ID!): Video!
  }

  input CreateVideoInput {
    title: String!
    description: String
    file: Upload!
  }

  input UpdateVideoInput{
    title: String
    description: String
    views: String
  }

  type Video {
    id: ID!
    title: String!
    description: String
    url: String!
    views: Int!
    creator: User!
    createdat: String!
  }
`
