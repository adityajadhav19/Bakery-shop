import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  if (!verifyAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(users);
}
