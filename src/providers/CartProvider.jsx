"use client";

import { createContext, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const data={
    cartItem,
    setCartItem
  }
  return <cartContext.Provider value={data}>{
    children
    }</cartContext.Provider>;
};
export default CartContextProvider;