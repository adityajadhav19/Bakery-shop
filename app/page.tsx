// app/page.tsx
import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: {
      isVisible: true,
      inStock: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return <HomeClient products={products} />;
}
