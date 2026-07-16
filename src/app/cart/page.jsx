"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { cartContext } from "@/providers/CartProvider";


export default function CartPage() {
const{cartItem,setCartItem}=useContext(cartContext)
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItem((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (productId) => {
    setCartItem((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };


  const subtotal = cartItem.reduce((acc, item) => acc + item.totalPrice, 0);
//   const shipping = subtotal > 150 ? 0 : 15;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discount + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "SIGNATURE20") {
      setDiscount(Math.round(subtotal * 0.2)); 
    } else {
      alert("Invalid Promo Code!");
    }
  };

  if (cartItem.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF9F6] px-6 text-center">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#C98A5D]/10 text-[#C98A5D]">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-3xl font-black text-[#111111]">Your Cart is Empty</h1>
        <p className="mt-3 text-gray-500 max-w-md">
          Looks like you haven&apos;t added any signature styles to your cart yet. Explore our latest collection.
        </p>
        <Link
          href="/products"
          className="mt-8 flex items-center gap-2 rounded-full bg-[#111111] px-8 py-4 font-semibold text-white transition hover:bg-[#C98A5D]"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF9F6] py-16 text-[#111111]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header Title */}
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A5D]">
              Shopping Bag
            </span>
            <h1 className="mt-1 text-4xl font-black md:text-5xl">Your Collection</h1>
          </div>
          <p className="text-gray-500 font-medium">
            You have <span className="font-bold text-[#111111]">{cartItem.length} items</span> in your cart
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* LEFT: CART ITEMS LIST (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-6">
            {cartItem.map((item) => (
              <div
                key={item.productId}
                className="group relative flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
              >
                {/* Product Image */}
                <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-[#FAF9F6] md:h-36 md:w-28 flex-shrink-0">
                  <Image
                    src={item?.image}
                    alt={item?.name||"product"}
                    fill
                    sizes="(max-w-md) 100vw, 150px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#111111] transition hover:text-[#C98A5D]">
                        {item?.name}
                      </h3>
                      {/* Meta Tags */}
                      <div className="mt-2 flex flex-wrap gap-3 text-xs font-medium text-gray-500">
                        <span className="rounded-full bg-gray-100 px-3 py-1">
                          Color: <strong className="text-[#111111]">{item.color}</strong>
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1">
                          Size: <strong className="text-[#111111]">{item.size}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Desktop Delete Button */}
                    <button
                      onClick={() => removeItem(item?.productId)}
                      className="hidden text-gray-400 transition hover:text-red-500 md:block"
                      title="Remove Item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-3 text-gray-500 transition hover:bg-gray-50 hover:text-[#111111]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-3 text-gray-500 transition hover:bg-gray-50 hover:text-[#111111]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price Tag */}
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total Price</p>
                      <p className="text-2xl font-black text-[#111111]">
                        ${item.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Delete Button */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute right-4 top-4 text-gray-400 transition hover:text-red-500 md:hidden"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C98A5D] transition hover:text-[#111111]"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT: ORDER SUMMARY (1 Column on Large Screens) */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-[#111111] p-8 text-white shadow-lg">
              <h2 className="text-2xl font-black">Order Summary</h2>
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="mt-6 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-1 focus:ring-[#C98A5D]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#C98A5D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#A86C43]"
                >
                  Apply
                </button>
              </form>
              
              {/* Promo tip */}
              <p className="mt-2 text-xs text-gray-400">
                Tip: Use code <strong className="text-white">SIGNATURE20</strong> for 20% off!
              </p>

              {/* Price Calculation details */}
              <div className="mt-8 space-y-4 border-b border-white/10 pb-6 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (20%)</span>
                    <span>-${discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-white">${tax}</span>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Price</p>
                  <p className="text-xs text-[#C98A5D] mt-0.5">VAT & Taxes included</p>
                </div>
                <p className="text-4xl font-black text-white">${total}</p>
              </div>
              <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#C98A5D] to-[#A86C43] py-5 text-center text-lg font-bold text-white transition hover:scale-[1.02] shadow-lg shadow-[#C98A5D]/20">
                Proceed to Checkout
              </button>
            </div>

            {/* Mini Trust Badge Card */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C98A5D]/10 text-[#C98A5D]">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="font-bold">Free Express Delivery</p>
                  <p className="text-xs text-gray-500">For all signature orders above $150</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C98A5D]/10 text-[#C98A5D]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold">Secured & Encrypted Payments</p>
                  <p className="text-xs text-gray-500">SSL certified premium checkout gate</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}