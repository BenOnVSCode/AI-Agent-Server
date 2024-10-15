import { isAdmin } from "../../auth/middleware";
import { t } from "../context";
import { prisma } from "../../utils/prisma";

export const logs = t.procedure
  .use(isAdmin)
  .query(async ({ ctx }) => {
    const query = ctx.req.query as { page: string }
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * 20;
    const activityLogs = await prisma.activity.findMany({
      skip,
      take: 20,
      orderBy: { createdAt: 'desc' }
    });
    return activityLogs;
  })


