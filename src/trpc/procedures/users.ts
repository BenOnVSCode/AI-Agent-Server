import { isAdmin } from "../../auth/middleware";
import { t } from "../context";
import z from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";

export const createUser = t.procedure
	.use(isAdmin)
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(6),
			name: z.string(),
			role: z.enum(["USER", "ADMIN", "SUPERVISOR"]),
		})
	)
	.mutation(async ({ input, ctx }) => {
		const { email, password, role, name } = input;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role,
			},
		});

		return { user };
	});

export const getAllUsers = t.procedure
	.use(isAdmin)
	.query(async ({ ctx }) => {
		try {
			const users = await prisma.user.findMany();
			return { users };
		} catch (error) {
			console.log(error);
		throw new Error("Something went wrong");
	}
});

export const deleteUser = t.procedure
	.use(isAdmin)
	.input(z.object({ id: z.number() }))
	.mutation(async ({ input }) => {
		try {
			await prisma.user.delete({ where: { id: input.id } });
			return { message: "User deleted successfully" };
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});

export const updateUser = t.procedure
	.use(isAdmin)
	.input(z.object({ 
    id: z.number(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(["USER", "ADMIN", "SUPERVISOR"]).optional(),
    password: z.string().optional()
  }))
	.mutation(async ({ input }) => {
		try {
      const { id, ...data } = input;
		  await prisma.user.update({ where: { id }, data });
      return { message: "User updated successfully" };
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
	});
