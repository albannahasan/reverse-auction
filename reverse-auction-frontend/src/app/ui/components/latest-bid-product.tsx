"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Adjust the import based on your routing setup
import ProductItemBidCard from "./ProductItemBidCard"; // Ensure the path to the component is correct
import { timeAgo } from "@/app/utils/utils";
import { Bid } from "@/app/interface/interface";
import { getBidsByProductId } from "@/app/lib/actions/bid";

type BidCardProps = {
  user: string;
  amount: number | string;
  time: string;
};

const BidCard = ({ user, amount, time }: BidCardProps) => {
  const formattedTime = time ? timeAgo(time) : "NaN";

  return (
    <div className="bg-white px-4 flex justify-between items-center mb-2">
      <div>
        <h4 className="text-lg text-black font-semibold mb-1">{user}</h4>
        <p className="text-gray-600 text-xs">{formattedTime}</p>
      </div>
      <p className="text-gray-600 font-semibold">
        $
        {typeof amount === "number"
          ? amount.toFixed(2)
          : parseFloat(amount).toFixed(2)}
      </p>
    </div>
  );
};

type LatestBidsProps = {
  productId: number;
};

const LatestBids = ({ productId }: LatestBidsProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "amount",
    direction: "ascending",
  });

  useEffect(() => {
    // console.log(bidId)
    if (productId) {
      const fetchBids = async () => {
        const fetchedBid = await getBidsByProductId(productId);
        console.log("fetchedBids", fetchedBid);

        setBids(fetchedBid.bids);
        setIsLoading(false);
      };

      fetchBids();
    }
  }, [productId]);

  const link = `/bids/${productId}`;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] sm:w-[292px] sm:h-96 md:w-[1024px] md:h-[28rem] lg:w-[500px] lg:mx-h-[300px]">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Bid History ({bids.length || 0})</h3>
      <div className="space-y-4 h-[28vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : bids.length == 0 ? (
          <div>No bids To display</div>
        ) : (
          bids.map((bid) => (
            <div key={bid.id}>
              <BidCard
                amount={bid.price}
                user={"User1"}
                time={bid.createdAt}
              />
              <hr />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Link href={link}>
          <button className="bg-black hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            See All Bids
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestBids;
