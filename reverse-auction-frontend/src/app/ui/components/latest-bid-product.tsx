import React from "react";
import Link from "next/link"; // Adjust the import based on your routing setup
import ProductItemBidCard from "./ProductItemBidCard"; // Ensure the path to the component is correct
import { timeAgo } from "@/app/utils/utils";

type BidCardProps = {
  user: string;
  amount: number | string;
  time: string;
};

const BidCard = ({ user, amount, time }: BidCardProps) => {
  const formattedTime = time ? timeAgo(time) : "NaN";

  return (
    <div className="bg-white px-4 flex justify-between  items-center">
      <div>
        <h4 className="text-lg text-black font-semibold">{user}</h4>
        <p className="text-gray-600 text-xs">{formattedTime}</p>
      </div>
      <p className="text-gray-600 font-semibold">${typeof amount === "number" ? amount.toFixed(2) : parseFloat(amount).toFixed(2)}</p>
    </div>
  );
};
const LatestBids = ({ productId }) => {
  const link = `/bids/${productId}`;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] sm:w-[292px] sm:h-96 md:w-[1024px] md:h-96 lg:w-[500px] lg:mx-h-[500px] overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Bid History</h3>
      <div className="space-y-4">
        <BidCard amount={200} user={"User1"} time={"2025-05-13T12:30:00"} />
        <hr />
        <BidCard amount={200} user={"User1"} time={"2025-05-13T12:30:00"} />
        <hr />
        <BidCard amount={200} user={"User1"} time={"2025-02-13T12:30:00"} />
        <hr />
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
