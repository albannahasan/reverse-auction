import Link from "next/link";
import BidCard from "./BidCard";
import ProductItemBidCard from "./ProductItemBidCard";
import { useEffect, useState } from "react";
import { getAllProductsActions } from "@/app/lib/actions/products";

interface Bid {
  amount: number;
  bidder: string;
  timestamp: string;
}

interface Props {
itemName: string
itemTime: string
itemPrice: number
bid: Bid[]
condition: string
}

const ProductItemContent = (props: Props) =>  {

  return (
    <div className="p-10 w-[292px] h-[595px] sm:w-[292px] sm:h-[595px] md:w-[400px] md:h-[700px] lg:w-[500px] lg:h-[800px] bg-red-600">
      <h2 className=" truncate max-w-full font-semibold font-raleway text-[36px] leading-[77%] text-[#1D1F22] mb-4">
        {props.itemName}
      </h2>
      <h2 className="font-normal font-raleway text-[30px] leading-[110%] text-[#1D1F22] mb-6 w-[292px] h-auto sm:w-[400px] sm:h-auto md:w-[500px] md:h-auto lg:w-[600px] lg:h-auto">
        Subtitle Text
      </h2>
      <div className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
      {props.itemPrice}
      </div>
      <h4 className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
        {props.bid?.length}
      </h4>
      <div className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
        Conditions: {props.condition}
      </div>
      <div className="mb-6">
        <div className="font-normal font-raleway text-[20px] leading-[77%] text-[#1D1F22] semi-bold mb-6">
          Time Left: 3 <span className="font-bold">Days</span> 4{" "}
          <span className="font-bold">Hours</span> 5{" "}
          <span className="font-bold">Minutes</span>
        </div>
        <hr className="w-full border-t border-gray-900 mt-4 mb-4" />
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-4">
            Place Bid
          </button>
        </div>
      </div>
      <div className="bg-yellow-500 p-5 m-5 w-full ">
        <h3 className="semi-bold mb-4">Latest Bids</h3>
        <ProductItemBidCard />
        <ProductItemBidCard />
        <ProductItemBidCard />
        <div className="flex justify-center mt-4">
          <Link
            href={`/bids/1
            `}
          >
            <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
              See All Bids
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItemContent;
