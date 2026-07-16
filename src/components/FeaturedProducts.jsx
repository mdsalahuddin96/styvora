import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";

export default function FeaturedProducts({ products }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-[#FAF9F6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-[#C98A5D]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#C98A5D]">
            Featured Collection
          </span>

          <h2 className="mt-6 text-4xl font-black text-[#111111] md:text-5xl">
            Best Selling Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover our most loved pieces, carefully selected to bring
            elegance, confidence and timeless fashion into your wardrobe.
          </p>
        </div>

        {/* Products */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:bg-[#C98A5D] hover:text-white">
                  <Heart size={18} />
                </button>

                {!product.inStock && (
                  <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Content */}

              <div className="space-y-4 p-6 flex flex-col flex-1 ">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#C98A5D]/10 px-3 py-1 text-xs font-semibold text-[#C98A5D]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-semibold">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="line-clamp-2 text-xl font-bold text-[#111111]">
                  {product.name}
                </h3>

                <p className="line-clamp-2 text-sm text-gray-500">
                  {product.description}
                </p>

                {/* Colors */}

                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>

                {/* Footer */}

                <div className="flex items-center justify-between mt-auto pt-2 ">
                  <div>
                    <p className="text-2xl font-black text-[#111111]">
                      $ {product.price}
                    </p>
                  </div>

                  <Link href={`/products/${product.id}`} className="flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C98A5D]">
                    <ShoppingBag size={18} />
                    Add
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={"/products"}
            className="rounded-full bg-gradient-to-r from-[#111111] to-[#C98A5D] px-10 py-4 font-semibold text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
