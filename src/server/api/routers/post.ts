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
      })
    )
    .query(async ({ input, ctx }) => {
      const emailExists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      console.log(1);

      if (emailExists != null) {
        return {
          success: false,
          message: "Email already registered",
        };
      }

      console.log(2);
      const hashedPassword = await hashPassword({
        plaintextPassword: input.password,
      });
      await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });
      console.log(3);

      return {
        success: true,
        message: "User signup success",
      };
    }),
  addTodo: publicProcedure
    .input(
      z.object({
        todo: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.todoList.create({
        data: {
          content: input.todo,
        },
      });
      return res;
    }),
  getAllTodos: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.todoList.findMany();
    return res;
  }),
  deleteTodoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.todoList.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
