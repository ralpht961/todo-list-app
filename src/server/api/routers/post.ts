import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { hashPassword } from "~/utils";

export const postRouter = createTRPCRouter({
  userSignup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        username: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const emailExists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      const usernameExist = await ctx.db.user.findFirst({
        where: {
          username: input.username,
        },
      });
      if (usernameExist != null) {
        return {
          success: false,
          message: "username is used before",
        };
      }
      if (emailExists != null) {
        return {
          success: false,
          message: "Email already registered",
        };
      }

      const hashedPassword = await hashPassword({
        plaintextPassword: input.password,
      });
      await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          username: input.username,
        },
      });

      return {
        success: true,
        message: "User signup success",
      };
    }),
  addPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
        image: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        await ctx.db.userPost.create({
          data: {
            description: input.description,
            price: input.price,
            title: input.title,
            image: input.image,
            createdById: ctx.session.user.id,
          },
        });
        return {
          success: true,
          message: "post added",
        };
      } catch (e) {
        return {
          success: false,
          message: "post add failed",
        };
      }
    }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.userPost.findMany({
      include: {
        createdBy: true,
      },
    });
    return res;
  }),
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        UserPost: true,
      },
    });
    return res;
  }),
  changeProfileImage: protectedProcedure
    .input(
      z.object({
        image: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.user.update({
        data: {
          image: input.image,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
      return {
        success: true,
      };
    }),
  getPostDataById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.userPost.findFirstOrThrow({
        where: {
          id: parseInt(input.id),
        },
        include: {
          createdBy: true,
        },
      });
      return res;
    }),
  getAllUsers: publicProcedure.query(async ({ ctx, input }) => {
    const res = await ctx.db.user.findMany();
    return res;
  }),
  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deletePost: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.userPost.delete({
        where: {
          id: input.id,
        },
      });
    }),
  makeAdmin: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: "ADMIN",
        },
      });
    }),
  removeAdmin: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: "USER",
        },
      });
    }),
});
