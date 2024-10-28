import { t } from "../context";
import { z } from "zod";
import { prisma } from "../../utils/prisma"; 
import { isAdmin } from "../../auth/middleware";

export const getAllCalls = t.procedure
  .query(async ({ ctx }) => {
    const query = ctx.req.query as { page: string }
    const page = parseInt(query.page) || 1; 
    const limit = 10;
    const skip = (page - 1) * limit; 

    const calls = await prisma.call.findMany({
      skip, 
      take: limit, 
      include: {
        user: {
          select: {
            name: true, 
          },
        },
        status: {
          select: {
            name: true,
            color: true
          }
        },
        callType: {
          select: {
            type: true, 
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const totalCount = await prisma.call.count();

    // Map the calls to include the proper structure
    const formattedCalls = calls.map((call) => ({
      id: call.id,
      type: call.callType.type,
      date: call.createdAt,
      transcript: call.transcript,
      statusColor: call.status.color,
      number: call.number,
      status: call.status.name,
      recordingUrl: call.recordingUrl,
      clientName: call.clientName,
      postCode: call.postCode,
      poa: call.hasPOA,
      initiatedBy: call.user.name,
      duration: call.duration,
      summary: call.summary,
      address: call.clientAddress,
      isDD: call.dd,
      split: call.split,
      price: call.price
    }));

    return {
      calls: formattedCalls,
      totalCount,
      totalPages: Math.ceil(totalCount / limit), 
      currentPage: page, 
    };
  });



export const deleteCall = t.procedure
  .use(isAdmin)
  .input(z.object({ id: z.string() })) 
  .mutation(async ({ input }) => {
    const { id } = input;
    const deletedCall = await prisma.call.delete({
      where: { id },
    });

    return deletedCall; 
  });

