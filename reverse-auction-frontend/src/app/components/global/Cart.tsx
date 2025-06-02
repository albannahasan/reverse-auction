"use client";
import { CartItem, Product } from "@/app/interface/interface";
import { getCartByUserId } from "@/app/lib/actions/cart";
import { getProductByBatch } from "@/app/lib/actions/products";
import { format, formatDate, set } from "date-fns";
import { div, h1, h2 } from "framer-motion/client";
import { get } from "http";
import Image from "next/image";
import { list } from "postcss";
import { use, useEffect, useState } from "react";

interface CartProps {
  toggleCart: () => void;
  listing: any[];
}

export const Cart: React.FC<CartProps> = ({ toggleCart, listing }) => {
  const [cartList, setCartList] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getCartByUserId(0);
        console.log("Cart items:", cartResponse);
        const items = cartResponse?.items || [];

        setCartList(cartResponse?.items || []); // Assuming the response has an 'items' property
        setCartTotal(cartResponse?.totalPrice || 0); // Assuming the response has a 'total' property
        const productIds: number[] =
          cartResponse?.items?.map((item: CartItem) => item.productId) || [];
        console.log("Product IDs from cart items 2:", productIds);

        if (productIds.length > 0) {
          const productResponse = await getProductByBatch(productIds);
          setProductList(productResponse || []);
          console.log("Products fetched for cart items:", productResponse);
          const mergedCart: MergedCartItem[] = items.map(
            (cartItem: CartItem) => {
              const product: Product | undefined = productResponse.find(
                (p: Product) => p.id === cartItem.productId
              );
              return {
                ...cartItem,
                product: product || null,
              };
            }
          );

          setCartList(mergedCart);
          console.log("Merged cart items:", mergedCart);
        } else {
          console.log("No products found for the cart items.");
        }

        interface MergedCartItem extends CartItem {
          product: Product | null;
        }

      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      const cartElement = document.querySelector(".cart-container");
      if (cartElement && !cartElement.contains(event.target as Node)) {
        toggleCart();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleCart();
      }
    };
    fetchCart();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
  }, [toggleCart]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50 pointer-events-auto min-h-screen ">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full animate-slideLeft min-h-screen">
        <div className="flex align-center mb-3">
          <Image
            src="/cart.svg"
            alt="Cart"
            width={24}
            height={24}
            className="inline-block mr-0.5 my-auto"
          />
          <h2 className="text-xl font-bold mr-3">Your Cart</h2>

          <span className="bg-blue-600 rounded-xl text-white py-0.5 px-2 text-xs font-semibold flex items-center">
            {productList.length} items
          </span>

          <button
            className="ml-auto text-gray-500 hover:text-gray-700"
            onClick={() => toggleCart()}
          >
            X
          </button>
        </div>

        <p className="text-gray-500 mb-4">Last updated: 18 May 2025, 12:44</p>

        <hr className="mb-2" />
        {cartList.length === 0 ? (
          <EmptyCart toggleCart={toggleCart} />
        ) : (
          <div>
            <div className="flex flex-col gap-y-2 overflow-auto max-h-[66vh] scrollbar-hide">
              {cartList.map((item, index) => (
                 <CartCard
                    key={index}
                    addedAt={item.addedAt}
                    productName={item.product?.name || "Unknown Product"}
                    itemPrice={item?.price || 0}
                    imageUrl={item.product?.images?.[0] || "/placeholder-image.png"}
                  />
              ))}
            </div>

            <div className="flex flex-col gap-y-4 mt-4 p-2 ">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">SubTotal</p>
                <p className="font-mono text-black">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Taxes (Estimated)</p>
                <p>$0.02</p>
              </div>
              <hr />
              <div className="flex items-center justify-between mb-3">
                <p>SubTotal</p>
                <p className="font-semibold">$41.02</p>
              </div>
            </div>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold"
              onClick={() => toggleCart()}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface CartCardProps {
  productName: string;
  itemPrice: number;
  addedAt?: string; // Optional prop for added date
  imageUrl?: string; // Optional prop for image URL
}

const CartCard: React.FC<CartCardProps> = ({ productName, itemPrice, addedAt, imageUrl }) => {
  const formattedDate = new Date(addedAt ?? "").toLocaleDateString();
  console.log("Product Name:", productName);
  console.log("Item Price:", itemPrice);
  return (
    <div className="flex justify-between  px-2 py-3 w-full ">
      <div className="flex ">
        <Image
          src={imageUrl || "/placeholder-image.png"} // Fallback image if imageUrl is not provided
          alt="Product Image"
          width={50}
          height={50}
          className="rounded"
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold">{productName}</h3>
          <p className="text-xs text-gray-500">Added at: {formattedDate}</p>
        </div>
      </div>
      <p className="text-sm font-semibold ml-auto">${itemPrice.toFixed(2)}</p>
      <hr />
    </div>
  );
};

interface EmptyCartProps {
  toggleCart: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ toggleCart }) => {
  return (
    <div className="flex items-center justify-center h-[77vh] gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
        <h4 className="text-gray-600 mb-4">
          Looks like you haven't won any bids yet
        </h4>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={toggleCart}
        >
          Continue bidding
        </button>
      </div>
    </div>
  );
};
