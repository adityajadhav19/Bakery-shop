// app/api/admin/products/route.ts
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  if (!verifyAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(products);
}

export async function POST(req: Request) {
  if (!verifyAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {
    name,
    description,
    price,
    image,
    category,
    featured = false,
  } = await req.json();

  // ✅ Basic validation
  if (!name || !price || !image) {
    return Response.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      category,
      isVisible: true,
      inStock: true,
    },
  });

  return Response.json(product);
}
