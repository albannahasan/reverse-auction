"use client";
import { profile } from "console";
import Navbar from "../components/global/navbar";
import Homecard from "../ui/components/HomeCard";
import CardColumn from "../ui/components/HomePageCardColumn";
import AuctionCard from "../ui/components/AuctionCard";
import { useEffect, useState } from "react";
import { getAllProductsActions } from "../lib/actions/products";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  images: string[];
  condition: string;
  endTime: string;
  startTime: string;
}

const imageUrls = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://i.etsystatic.com/17187027/r/il/0973f8/3767025593/il_fullxfull.3767025593_3hph.jpg",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://dilussoappliances.com.au/cdn/shop/products/CSO28RBFS_RED_web_1024x1024.jpg?v=1559186111",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaQKSbMgDfmaRA9BHf9Y4UB_G2G_p5vUcQA&s",
  "https://www.incehesap.com/resim/blog2/2022-09/lcd-led-tv-satinalma-rehberi2017-08-25-20-27-38_480.jpg",
  "https://i.etsystatic.com/6611199/r/il/957121/1580712013/il_570xN.1580712013_kjyh.jpg",
];

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProductsActions(10);
      console.log("Fetched products:", products); // Print products to the console
      setProducts(products);

      const sortedProducts = [...products]
        .sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
        .slice(0, 4); // Get the first 4 products

      console.log("Sorted products:", sortedProducts);
      setProducts(sortedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center animate-fadeIn">
        <div className="mb-4 w-full">
          <Homecard />
        </div>
      </div>
      <section className="p-4 block font-semibold w-fit mb-14 text-2xl">
        Latest Live Listings
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
          {products.map((product) => (
            <AuctionCard
              key={product.id}
              product={{
                id: product.id,
                itemName: product.name,
                itemTime: product.createdDate,
                itemPrice: product.price,
                bid: [],
                condition: product.condition,
                description: product.description,
                endTime: product.endTime,
                startTime: product.createdDate,
                imageUrls:
                  imageUrls[Math.floor(Math.random() * imageUrls.length)],
              }}
            />
          ))}
        </div>
      </section>
      <section className="mt-2 py-7 px-10 justify-center items-center animate-fadeIn">
        <h3 className="mx-auto block font-semibold w-fit mb-14 text-2xl">
          How it Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">1</h4>
            <h5 className="font-semibold text-xl mb-2">Browse & Discover</h5>
            <p className="block text-center">
              Explore thousands of unique items across various categories to
              find something special.
            </p>
          </div>

          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">2</h4>
            <h5 className="font-semibold text-xl mb-2">Bid & Win</h5>
            <p className="block text-center">
              Place competitive bids on items you love and track your auctions
              in real-time.
            </p>
          </div>

          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">3</h4>
            <h5 className="font-semibold text-xl mb-2">Pay & Receive</h5>
            <p>
              Complete secure payment and receive your item with our buyer
              protection guarantee.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
