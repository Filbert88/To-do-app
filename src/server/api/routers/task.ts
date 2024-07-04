import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

interface TaskWhereClause extends Prisma.TaskWhereInput {
  OR?: [
    { title: Prisma.StringFilter },
    { description: Prisma.StringFilter }
  ];
}

export const taskRouter = createTRPCRouter({
  // Fetch task with filter
  getTasks: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
        search: z.string().default(""),
        filter: z.enum(["all", "completed", "incomplete"]).default("all"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, offset, search, filter } = input;

      const where: TaskWhereClause = {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };

      if (filter === "completed") {
        where.isDone = true;
      } else if (filter === "incomplete") {
        where.isDone = false;
      }

      const tasks = await ctx.db.task.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: {
          duedate: "asc",
        },
      });

      return tasks;
    }),

  // Add task
  addTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        duedate: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, duedate } = input;
      const newTask = await ctx.db.task.create({
        data: {
          title,
          description,
          duedate: duedate ? new Date(duedate) : null,
        },
      });
      return newTask;
    }),

  // Mark task as completed
  markTaskCompleted: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedTask = await ctx.db.task.update({
        where: { id: input.id },
        data: { isDone: true },
      });
      return updatedTask;
    }),

  // undone completed task
  markTaskUncompleted: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedTask = await ctx.db.task.update({
        where: { id: input.id },
        data: { isDone: false },
      });
      return updatedTask;
    }),

  // Delete task
  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedTask = await ctx.db.task.delete({
        where: { id: input.id },
      });
      return deletedTask;
    }),
});
