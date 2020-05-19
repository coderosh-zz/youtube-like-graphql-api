import { Context } from "../context";
import { getAuthId } from "../utils/auth";

export default {
  Query: {
    comments: async (_parent: any, _args: any, ctx: Context) => {
      const comments = await ctx.prisma.comments.findMany();
      return comments;
    },
  },

  Mutation: {
    createComment: async (
      _parent: any,
      { data }: any,
      { prisma, req }: Context,
    ) => {
      const userId = getAuthId(req);

      const createdComment = await prisma.comments.create({
        data: {
          text: data.text,
          users: {
            connect: {
              id: userId,
            },
          },
          videos: {
            connect: {
              id: data.video,
            },
          },
        },
      });

      return createdComment;
    },

    updateComment: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);
      const comment = await ctx.prisma.comments.findOne({
        where: {
          id: args.id,
        },
      });

      if (!comment || comment.user !== userId) {
        throw new Error("Comment not found");
      }

      const updatedComment = await ctx.prisma.comments.update({
        where: {
          id: args.id,
        },
        data: args.data,
      });

      return updatedComment;
    },

    deleteComment: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const comment = await ctx.prisma.comments.findOne({
        where: {
          id: args.id,
        },
      });

      if (!comment || comment.user != userId) {
        throw new Error("Comment not found");
      }

      const deletedComment = await ctx.prisma.comments.delete({
        where: {
          id: args.id,
        },
      });

      return deletedComment;
    },
  },

  Comment: {
    user: async (parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.user,
        },
      });
    },

    video: async (parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.videos.findOne({
        where: {
          id: parent.video,
        },
      });
    },

    replies: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.replies.findMany({
        where: {
          comment: parent.id,
        },
      });
    },
  },
};
