import { Context } from "../context";
import { getAuthId } from "../utils/auth";

export default {
  Query: {
    reactions: async (_: any, __: any, ctx: Context) =>
      await ctx.prisma.reactions.findMany(),
  },

  Mutation: {
    manageReaction: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);
      let managedReaction;

      const reactions = await ctx.prisma.reactions.findMany({
        where: {
          AND: [
            {
              user: userId,
            },
            {
              video: args.video,
            },
          ],
        },
      });

      const reactionInput = args.liked ? "like" : "dislike";

      if (reactions.length === 0) {
        managedReaction = await ctx.prisma.reactions.create({
          data: {
            reaction: reactionInput,
            videos: {
              connect: {
                id: args.video,
              },
            },
            users: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } else {
        if (reactionInput == reactions[0].reaction) {
          managedReaction = await ctx.prisma.reactions.delete({
            where: {
              id: reactions[0].id,
            },
          });
        } else {
          managedReaction = await ctx.prisma.reactions.update({
            where: {
              id: reactions[0].id,
            },
            data: {
              reaction: reactionInput,
            },
          });
        }
      }

      return managedReaction;
    },
  },

  Reaction: {
    user: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.user,
        },
      });
    },

    video: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.videos.findOne({
        where: {
          id: parent.video,
        },
      });
    },
  },
};
