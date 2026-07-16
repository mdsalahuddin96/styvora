"use client";
import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/products.json");
        const products = await res.json();
        if (products) {
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <FeaturedProducts products={products}/>
    </div>
  );
}
