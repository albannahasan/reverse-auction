"use client";

import Link from "next/link";
import { useState } from "react";
import { Cart } from "./Cart";
import Image from "next/image";

interface NavLink {
  title: string;
  href: string;
}

const data: NavLink[] = [
  {
    title: "products",
    href: "/products",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Cart",
    href: "/products",
  },
];

export default function Navbar() {
  const [isCartOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState(["bruh"]);

  const toggleCart = () => {
    setCartIsOpen(!isCartOpen);
  };

  return (
    <header className="text-sm py-4 mx-auto md:px-16 px-6 border-b-0.5 dark:border-zinc-800z-30 bg-white md:mb-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between ">
        <div>
          <Image
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
            className="inline-block mr-0.5 my-auto"
          />

          <Link href="/homepage" className="font-semibold text-2xl">BidSphere</Link>
        </div>

        {isCartOpen && <Cart listing={cart} toggleCart={toggleCart} />}

        <nav className="md:block hidden">
          <ul className="flex items-center gap-x-8">
            {data.map((link, id) => (
              <li key={id}>
                {link.title === "Cart" ? (
                  <button
                    onClick={toggleCart} // Your handler
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    <Image
                      src="/cart.svg"
                      alt="Cart"
                      width={24}
                      height={24}
                      className="inline-block mr-0.5 my-auto"
                    />

                    {link.title}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
