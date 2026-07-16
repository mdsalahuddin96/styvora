"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  Heart,
} from "lucide-react";
import { useParams } from "next/navigation";
import { cartContext } from "@/providers/CartProvider";
import toast from "react-hot-toast";

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cartItem, setCartItem } = useContext(cartContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const res = await fetch("/products.json");
        const products = await res.json();
        if (products) {
          const data = products.find((product) => product.id == id);
          setProduct(data);
        }
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleAddToCart = () => {
    const totalPrice = parseInt(quantity) * parseInt(product?.price);
    if (!selectedColor || !selectedSize) {
      toast.error("Select size and color");
      return;
    }
    const item = {
      productId: product?.id,
      name:product?.name,
      price: product?.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      totalPrice,
      image:product?.image
    };
    setCartItem([...cartItem, item]);
    toast.success("Item added to cart!");
  };
  if (isLoading || !product) {
    return (
      <div className="flex mt-10 items-center justify-center ">
        <div className="h-10 w-10 animate-spin rounded-full border-[6px] border-[#111111]/20 border-t-[#C98A5D]"></div>
      </div>
    );
  }
  return (
    <section className="bg-[#FAF9F6] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 text-sm text-gray-500">
          Home / Products /{" "}
          <span className="font-semibold text-[#111111]">{product?.name}</span>
        </p>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="relative h-[650px] overflow-hidden rounded-3xl bg-white shadow-lg">
              <Image
                src={product?.image}
                alt={product?.name}
                fill
                className="object-cover transition duration-700 hover:scale-110"
              />

              <button className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-[#C98A5D] hover:text-white">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col">
            <span className="w-fit rounded-full bg-[#C98A5D]/10 px-4 py-2 text-sm font-semibold text-[#C98A5D]">
              {product?.category}
            </span>

            <h1 className="mt-5 text-5xl font-black text-[#111111]">
              {product?.name}
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />

              <span className="font-semibold">{product?.rating}</span>

              <span className="text-gray-500">(120 Reviews)</span>
            </div>

            <h2 className="mt-8 text-5xl font-black text-[#111111]">
              ${product?.price}
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              {product?.description}
            </p>

            {/* Stock */}

            <div className="mt-6">
              {product?.inStock ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  ✓ In Stock
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Colors */}

            <div className="mt-10">
              <h3 className="font-semibold text-[#111111]">Available Colors</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {product?.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-5 py-2 transition

                    ${
                      selectedColor === color
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}

            <div className="mt-8">
              <h3 className="font-semibold text-[#111111]">Select Size</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {product?.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-14 rounded-xl border transition

                    ${
                      selectedSize === size
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}

            <div className="mt-10">
              <h3 className="font-semibold">Quantity</h3>
              <div className="mt-4 w-fit flex items-center rounded-xl border border-gray-300 bg-white shadow-sm">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-3 text-gray-500 transition hover:bg-gray-50 hover:text-[#111111]"
                >
                  <Minus size={14} />
                </button>
                <span className="w-16 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-500 transition hover:bg-gray-50 hover:text-[#111111]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add Cart */}

            <button
              onClick={handleAddToCart}
              className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#111111] to-[#C98A5D] py-5 text-lg font-semibold text-white transition hover:scale-[1.02]"
            >
              <ShoppingBag size={22} />
              Add To Cart
            </button>

            {/* Services */}

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 text-center shadow">
                <Truck className="mx-auto text-[#C98A5D]" />

                <p className="mt-3 text-sm font-semibold">Free Shipping</p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-center shadow">
                <RotateCcw className="mx-auto text-[#C98A5D]" />

                <p className="mt-3 text-sm font-semibold">7 Days Return</p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-center shadow">
                <ShieldCheck className="mx-auto text-[#C98A5D]" />

                <p className="mt-3 text-sm font-semibold">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="mt-20 rounded-3xl bg-white p-10 shadow">
          <h2 className="text-3xl font-bold text-[#111111]">
            Product Description
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            {product?.description} Crafted with premium quality materials, this
            product combines timeless elegance with exceptional comfort. Whether
            you&apos;re dressing for work, travel, or a special occasion, it
            effortlessly enhances your wardrobe while maintaining durability for
            everyday wear.
          </p>
        </div>
      </div>
    </section>
  );
}
