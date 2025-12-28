import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return new Response("Invalid product id", { status: 400 });
  }

  // ✅ SAFE BODY PARSING (KEY FIX)
  let data = {};
  try {
    const text = await req.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (Object.keys(data).length === 0) {
    return new Response("No data provided", { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data,
  });

  return Response.json(updated);
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return new Response("Invalid product id", { status: 400 });
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  return Response.json({ success: true });
}
