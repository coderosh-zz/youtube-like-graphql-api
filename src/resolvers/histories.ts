import { Context } from "../context";
import { getAuthId } from "../utils/auth";

export default {
  Query: {
    searchhistories: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const histories = await ctx.prisma.searchhistories.findMany({
        where: {
          user: userId,
        },
      });

      return histories;
    },
    watchhistories: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const histories = await ctx.prisma.watchhistories.findMany({
        where: {
          user: userId,
        },
      });

      return histories;
    },
  },

  WatchHistory: {
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

  SearchHistory: {
    user: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.user,
        },
      });
    },
  },
};
