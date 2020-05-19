import { Context } from "../context";
import { getAuthId, optionalAuth } from "../utils/auth";
import { processUpload } from "../utils/upload";
import { unlink } from "fs";
import { promisify } from "util";

export default {
  Query: {
    videos: async (_parent: any, args: any, ctx: Context) => {
      let searchQuery = {};

      if (args.query) {
        const userId = optionalAuth(ctx.req);

        if (typeof userId === "string") {
          await ctx.prisma.searchhistories.create({
            data: {
              text: args.query,
              users: {
                connect: {
                  id: userId,
                },
              },
            },
          });
        }

        searchQuery = {
          where: {
            title: {
              contains: args.query,
            },
          },
        };
      }

      const videos = await ctx.prisma.videos.findMany(searchQuery);

      return videos;
    },
    video: async (_parent: any, args: any, ctx: Context) => {
      const video = await ctx.prisma.videos.findOne({
        where: {
          id: args.id,
        },
      });

      if (!video) throw new Error("Video not found");

      const userId = optionalAuth(ctx.req);

      if (typeof userId === "string") {
        await ctx.prisma.watchhistories.create({
          data: {
            users: {
              connect: {
                id: userId,
              },
            },
            videos: {
              connect: {
                id: video.id,
              },
            },
          },
        });
      }

      return video;
    },
  },

  Mutation: {
    createVideo: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);
      // const userId = '7734e503-a268-4afc-938b-178b5b59a23c'

      const url = await processUpload(args.data.file);

      const createdVideo = await ctx.prisma.videos.create({
        data: {
          title: args.data.title,
          description: args.data.description,
          url,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return createdVideo;
    },

    updateVideo: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const video = await ctx.prisma.videos.findOne({
        where: {
          id: args.id,
        },
      });

      if (!video || video.creator !== userId) {
        throw new Error("Video not found");
      }

      const updatedVideo = await ctx.prisma.videos.update({
        where: {
          id: args.id,
        },
        data: args.data,
      });

      return updatedVideo;
    },

    deleteVideo: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const video = await ctx.prisma.videos.findOne({
        where: {
          id: args.id,
        },
      });

      if (!video || video.creator !== userId) {
        throw new Error("Video not found");
      }

      const fsunlink = promisify(unlink);

      const deletedVideo = await ctx.prisma.videos.delete({
        where: {
          id: args.id,
        },
      });

      await fsunlink(`videos/${deletedVideo.url}`);

      return deletedVideo;
    },
  },

  Video: {
    creator: async (parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.users.findOne({
        where: {
          id: parent.creator,
        },
      });
    },

    comments: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.comments.findMany({
        where: {
          video: parent.id,
        },
      });
    },

    reactions: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.reactions.findMany({
        where: {
          video: parent.id,
        },
      });
    },
  },
};
