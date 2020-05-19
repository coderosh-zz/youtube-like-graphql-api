import { hash, compare } from "bcryptjs";
import { Context } from "../context";
import { generateToken, verifyToken } from "../utils/jwt";
import { getAuthId, decodedToken } from "../utils/auth";

export default {
  Query: {
    users: async (_parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.users.findMany();
    },

    me: async (_parent: any, _args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const user = await ctx.prisma.users.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) throw new Error("Something went wrong");

      return user;
    },

    userById: async (_parent: any, args: any, ctx: Context) => {
      const user = await ctx.prisma.users.findOne({
        where: {
          id: args.id,
        },
      });
      if (!user) throw new Error("User not found");
      return user;
    },

    userByEmail: async (_parent: any, args: any, ctx: Context) => {
      const user = await ctx.prisma.users.findOne({
        where: {
          email: args.email,
        },
      });
      if (!user) throw new Error("User not found");
      return user;
    },
  },
  Mutation: {
    signUp: async (_parent: any, args: { data: any }, ctx: Context) => {
      let password = args.data.password;

      if (password.length <= 5) {
        throw new Error("Password length should be greater than 5");
      }

      const userExists = await ctx.prisma.users.findOne({
        where: {
          email: args.data.email,
        },
      });

      if (userExists) {
        throw new Error("User with provided email already exists");
      }

      password = await hash(password, 10);

      let createdUser = await ctx.prisma.users.create({
        data: {
          email: args.data.email,
          channel: args.data.channel || args.data.fullname,
          profile: args.data.profile || "./profile",
          banner: args.data.banner,
          fullname: args.data.fullname,
          password: password,
        },
      });

      return {
        user: createdUser,
        token: generateToken(createdUser.id),
        refresh: generateToken(createdUser.id, true),
      };
    },

    login: async (_parent: any, args: any, ctx: Context) => {
      const userExists = await ctx.prisma.users.findOne({
        where: {
          email: args.data.email,
        },
      });
      if (!userExists) throw new Error("Invalid Credentials");

      const passwordMatch = await compare(
        args.data.password,
        userExists.password,
      );
      if (!passwordMatch) throw new Error("Invalid Credentials");

      return {
        user: userExists,
        token: generateToken(userExists.id),
        refresh: generateToken(userExists.id, true),
      };
    },

    refreshToken: async (_parent: any, args: any, ctx: Context) => {
      const decoded = verifyToken(args.token, true) as decodedToken;

      const user = await ctx.prisma.users.findOne({
        where: {
          id: decoded.id,
        },
      });

      return {
        user,
        token: generateToken(decoded.id),
      };
    },

    updateUser: async (_parent: any, args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const user = await ctx.prisma.users.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) throw new Error("Something went wrong");
      const data = args.data;
      if (data.password) {
        if (data.password.length <= 5) {
          throw new Error("Password length should be greater than 5");
        }
        data.password = await hash(data.password, 10);
      }
      const updatedUser = await ctx.prisma.users.update({
        where: {
          id: userId,
        },
        data,
      });
      return updatedUser;
    },

    deleteUser: async (_parent: any, _args: any, ctx: Context) => {
      const userId = getAuthId(ctx.req);

      const user = await ctx.prisma.users.delete({
        where: {
          id: userId,
        },
      });

      return user;
    },
  },

  User: {
    videos: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.videos.findMany({
        where: {
          creator: parent.id,
        },
      });
    },

    comments: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.comments.findMany({
        where: {
          user: parent.id,
        },
      });
    },

    replies: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.replies.findMany({
        where: {
          user: parent.id,
        },
      });
    },

    reactions: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.reactions.findMany({
        where: {
          user: parent.id,
        },
      });
    },
  },
};
