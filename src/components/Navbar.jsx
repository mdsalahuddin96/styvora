"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Cart",
      href: "/cart",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#FAF9F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#111111] via-[#3F2B1D] to-[#C98A5D] shadow-lg">
            <ShoppingBag className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-[0.2em] text-[#111111]">
              STYVORA
            </h1>

            <p className="-mt-1 text-[11px] uppercase tracking-[0.35em] text-gray-500">
              Fashion Store
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition duration-300 ${
                  active
                    ? "text-[#C98A5D]"
                    : "text-[#111111] hover:text-[#C98A5D]"
                }`}
              >
                {item.name}

                {active && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#C98A5D]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Cart */}
        <div className="hidden md:flex">
          <Link href="/cart" className="relative">
            <ShoppingBag
              size={24}
              className="text-[#111111] transition hover:text-[#C98A5D]"
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C98A5D] text-[10px] font-bold text-white">
              3
            </span>
          </Link>
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? (
            <X className="text-[#111111]" size={30} />
          ) : (
            <Menu className="text-[#111111]" size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="space-y-2 bg-[#FAF9F6] p-5">
          {navLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 font-medium transition ${
                  active
                    ? "bg-[#C98A5D] text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/cart"
            className="mt-4 flex items-center justify-between rounded-xl bg-[#111111] px-4 py-3 text-white"
          >
            <span>Shopping Cart</span>

            <span className="rounded-full bg-[#C98A5D] px-3 py-1 text-sm">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}