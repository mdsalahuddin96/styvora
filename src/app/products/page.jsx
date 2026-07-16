"use client";

import {
  Heart,
  Search,
  SearchX,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/products.json");
        const products = await res.json();
        if (products) {
          setProducts(products);
          setFilteredProducts(products);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    if (products.length === 0 && isLoading) return;
    let updatedProducts = [...products];

    if (filter !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === filter.toLowerCase(),
      );
    }

    if (searchInput.trim() !== "") {
      const searchTerms = searchInput.toLowerCase();
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerms) ||
          product.category.toLowerCase().includes(searchTerms),
      );
    }
    setFilteredProducts(updatedProducts);
  }, [searchInput, filter, products, isLoading]);

  return (
    <section className="bg-[#FAF9F6] py-10">
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="text-center flex flex-col justify-center items-center">
          <span className="rounded-full bg-[#C98A5D]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#C98A5D]">
            Our Collection
          </span>

          <h1 className=" text-5xl font-black text-[#111111]">
            Explore Fashion
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-gray-500">
            Browse premium clothing, accessories and timeless essentials
            carefully selected for modern women.
          </p>
          {/* Search */}
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md ">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-14 pr-5 outline-none transition focus:border-[#C98A5D] focus:ring-2 focus:ring-[#C98A5D]/20"
              />
            </div>
          </div>
        </div>

        {/* Category & Total Products*/}
        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl border border-gray-300 bg-white px-6 py-4 outline-none transition focus:border-[#C98A5D]"
          >
            <option value="all">All Categories</option>

            <option value="dress">Dress</option>

            <option value="blazer">Blazer</option>

            <option value="bags">Bags</option>

            <option value="shoes">Shoes</option>

            <option value="accessories">Accessories</option>

            <option value="cardigan">Cardigan</option>

            <option value="pants">Pants</option>
          </select>
          <div className="mt-10 flex items-center justify-between">
            <p className="text-gray-500">
              Showing
              <span className="mx-2 font-bold text-[#111111]">
                {filteredProducts.length}
              </span>
              Products
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex mt-10 items-center justify-center ">
          <div className="h-10 w-10 animate-spin rounded-full border-[6px] border-[#111111]/20 border-t-[#C98A5D]"></div>
        </div>
      ) : (
        <>
          {filteredProducts.length == 0 ? (
            <div className="mx-auto my-12 flex max-w-xl flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
              <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#C98A5D]/10 text-[#C98A5D]">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-[#C98A5D]/5 blur-md"></div>
                <SearchX size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-[#111111]">
                No Signature Products Found
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                {searchInput ? (
                  <>
                    We couldn&apos;t find any matches for &ldquo;
                    <span className="font-semibold text-[#C98A5D]">
                      {searchInput || filter}
                    </span>
                    &rdquo;. Please check the spelling or try searching for
                    something else.
                  </>
                ) : (
                  "We couldn't find any products matching your current filters. Try relaxing your search criteria."
                )}
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
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

                      <Link
                        href={`/products/${product?.id}`}
                        className="flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C98A5D]"
                      >
                        <ShoppingBag size={18} />
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductsPage;
