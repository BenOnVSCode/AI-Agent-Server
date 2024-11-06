import { prisma } from "../../utils/prisma";
import { t } from "../context";
import { isAdmin } from "../../auth/middleware";
import z from "zod";

export const statuses = t.procedure
  .query(async () => {
    const statuses = await prisma.status.findMany({});
    return { statuses }
  })

export const deleteStatuses = t.procedure
  .use(isAdmin)
  .input(z.object({
    id: z.array(z.number())
  }))
  .mutation(async ({ input }) => {
    try {
      const { id } = input;
      await prisma.status.deleteMany({
        where: {
          id: {
            in: id
          }
        }
      })
      return { message: "Deleted" }
    } catch (error) {
      throw new Error("Something went wrong")
    }
  })

export const updateStatusColor = t.procedure
  .use(isAdmin)
  .input(z.object({
    id: z.number(),
    color: z.string()
  }))
  .mutation(async ({ input }) => {
    try {
      const { id, color } = input;
      await prisma.status.update({
        where: { id },
        data: { color }
      })
      return { message: "Updated" }
    } catch (error) {
      throw new Error("Error while updating status")
    }
  })