import { prisma } from "../../utils/prisma";
import { t } from "../context";
import { isAuthenticated } from "../../auth/middleware";

export const statuses = t.procedure
  .use(isAuthenticated)
  .query(async () => {
    const statuses = await prisma.status.findMany({});
    return { statuses }
  })