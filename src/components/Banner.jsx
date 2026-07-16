import React from "react";
import Image from "next/image";
const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#2B211A] to-[#C98A5D] w-full">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#C98A5D]/20 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row lg:px-10">
        {/* Left Side */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="rounded-full border border-[#C98A5D]/40 bg-[#C98A5D]/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-[#F3D4BC]">
            New Season Collection
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            Wear Your
            <span className="block text-[#C98A5D]">Signature Style</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Discover premium fashion curated for modern lifestyles. Explore
            timeless essentials, trending outfits, and statement pieces crafted
            to elevate your everyday look.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-[#C98A5D] px-8 py-4 font-semibold text-white transition hover:bg-[#A86C43] hover:scale-105">
              Browse Projects
            </button>

            <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#111111]">
              Explore Collection
            </button>
          </div>

          <div className="mt-14 flex justify-center gap-10 lg:justify-start">
            <div>
              <h2 className="text-3xl font-bold text-white">500+</h2>
              <p className="text-sm text-gray-400">Premium Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">20K+</h2>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">4.9★</h2>
              <p className="text-sm text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute -left-6 top-8 h-80 w-80 rounded-full bg-[#C98A5D]/20 blur-3xl"></div>

          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
            alt="Fashion Model"
            width={400}
            height={400}
            className="relative w-full max-w-md rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
