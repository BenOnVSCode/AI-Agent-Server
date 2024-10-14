import { t } from "../context";
import { z } from "zod";
import { prisma } from "../../utils/prisma"; // Adjust the import path as necessary
import { formatDuration } from "../../utils/helper";

export const getAllCalls = t.procedure
  .query(async ({ ctx }) => {
    const query = ctx.req.query as { page: string }
    const page = parseInt(query.page) || 1; // Default to page 1 if not provided
    const limit = 10;
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    const calls = await prisma.call.findMany({
      skip, // Skip the calculated number of items
      take: limit, // Limit the number of items returned
      include: {
        user: {
          select: {
            name: true, // To get the `createdBy` field
          },
        },
        callType: {
          select: {
            type: true, // To get the `type` field
          },
        },
      },
    });

    const totalCount = await prisma.call.count();

    // Map the calls to include the proper structure
    const formattedCalls = calls.map((call) => ({
      id: call.id,
      clientName: call.clientName,
      statusId: call.statusId,
      type: call.callType.type,
      duration: formatDuration(call.duration), // Helper function to format duration
      createdAt: call.createdAt.toISOString(),
      createdBy: call.user.name,
      notes: call.notes,
      summary: call.summary,
      clientAddress: call.clientAddress,
      postCode: call.postCode,
      hasPOA: call.hasPOA,
      success: call.success,
      lastEdited: call.lastEdited.toISOString(),
    }));

    return {
      calls: formattedCalls,
      totalCount,
      totalPages: Math.ceil(totalCount / limit), 
      currentPage: page, 
    };
  });



export const deleteCall = t.procedure
  .input(z.object({ id: z.string() })) 
  .mutation(async ({ input }) => {
    const { id } = input;

    const deletedCall = await prisma.call.delete({
      where: { id },
    });

    return deletedCall; 
  });
