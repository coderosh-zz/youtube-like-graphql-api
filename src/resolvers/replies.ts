import { Context } from "../context";
import { getAuthId } from "../utils/auth";

export default {
  Query: {
    replies: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.replies.findMany();
    },
  },

  Mutation: {
    createReply: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const comment = await ctx.prisma.comments.findOne({
        where: {
          id: args.comment,
        },
      });

      if (!comment) throw new Error("Comment doesn't exist");

      const reply = await ctx.prisma.replies.create({
        data: {
          text: args.text,
          comments: {
            connect: {
              id: args.comment,
            },
          },
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return reply;
    },

    updateReply: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const reply = await ctx.prisma.replies.findOne({
        where: {
          id: args.id,
        },
      });

      if (!reply || reply.user !== userId) throw new Error("Reply not found");

      const updatedReply = await ctx.prisma.replies.update({
        where: {
          id: args.id,
        },
        data: {
          text: args.text,
        },
      });

      return updatedReply;
    },

    deleteReply: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);
      const reply = await ctx.prisma.replies.findOne({
        where: {
          id: args.id,
        },
      });

      if (!reply || reply.user !== userId) throw new Error("Reply not found");

      const deletedReply = await ctx.prisma.replies.delete({
        where: {
          id: args.id,
        },
      });

      return deletedReply;
    },
  },

  Reply: {
    user: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.user,
        },
      });
    },

    comment: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.comments.findOne({
        where: {
          id: parent.comment,
        },
      });
    },
  },
};
