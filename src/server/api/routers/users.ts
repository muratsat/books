import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getUserProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.id),
        columns: {
          name: true,
          image: true,
        },
        with: {
          files: {
            limit: 5,
            columns: {
              name: true,
              url: true,
            },
          },
        },
      });

      return user;
    }),
});
