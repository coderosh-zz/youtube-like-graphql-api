import { Context } from "../context";
import { getAuthId } from "../utils/auth";

export default {
  Mutation: {
    createSubs: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const sub = await ctx.prisma.subscriptions.create({
        data: {
          users_subscriptions_subscriberTousers: {
            connect: {
              id: userId,
            },
          },
          users_subscriptions_channelTousers: {
            connect: {
              id: args.channel,
            },
          },
        },
      });

      return sub;
    },

    deleteSubs: async (parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const sub = await ctx.prisma.subscriptions.findMany({
        where: {
          AND: [
            {
              subscriber: userId,
            },
            {
              channel: args.channel,
            },
          ],
        },
      });

      if (sub.length < 1) throw new Error("Channel not found");

      const deletedSub = await ctx.prisma.subscriptions.delete({
        where: {
          id: sub[0].id,
        },
      });

      return deletedSub;
    },
  },

  Subs: {
    subscriber: async (parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.subscriber,
        },
      });
    },

    channel: async (parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.channel,
        },
      });
    },
  },
};
