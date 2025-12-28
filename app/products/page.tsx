import Image from "next/image";
import { prisma } from "@/lib/prisma";
import OrderNowButton from "@/components/OrderNowButton";

export const dynamic = "force-dynamic"; // always fetch fresh data

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[rgb(237,219,193)] px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-[rgb(139,69,19)]">
        Our Products
      </h1>

      {/* Empty State */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products available right now.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[rgb(139,69,19)]">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-[rgb(139,69,19)]">
                    {product.price}
                  </span>

                  {product.inStock ? (
                    <span className="text-green-600 text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* WhatsApp Order Button */}
                <OrderNowButton
                  productId={product.id}
                  name={product.name}
                  price={product.price}
                  inStock={product.inStock}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
