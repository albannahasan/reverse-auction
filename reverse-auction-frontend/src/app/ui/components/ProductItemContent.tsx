import Link from "next/link";
import BidCard from "./BidCard";
import ProductItemBidCard from "./ProductItemBidCard";
import { useEffect, useState } from "react";
import { getAllProductsActions } from "@/app/lib/actions/products";
import AuctionOngoing from "./auction-ongoing";
import AuctionUpcoming from "./auction-upcoming";
import AuctionClose from "./auction-close";
import LatestBids from "./latest-bid-product";

interface Bid {
  amount: number;
  bidder: string;
  timestamp: string;
}

interface Props {
  id: number;
  itemName: string;
  itemTime: string;
  itemPrice: number;
  bid: Bid[];
  condition: string;
  description: string;
  endTime: string;
  startTime: string;
}
export const parseDateString = (dateString: string): Date => {
  // Create a Date object from the provided dateString
  return new Date(dateString);
};

const ProductItemContent = (props: Props) => {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<string>("");

  console.log("CHECK2", props.id);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const interval = setInterval(async () => {
        const now = new Date();
        const start = parseDateString(props.startTime);
        const end = parseDateString(props.endTime);
        if (now < start) {
          setStatus("Upcoming");
        } else if (now > end) {
          // Auction has ended
          setStatus("Closed");
        } else {
          setStatus("Ongoing");
        }
      }, 1000);

      return () => clearInterval(interval);
    };

    calculateTimeDifference();

    // Optional: Set an interval to keep updating the time difference
    const intervalId = setInterval(calculateTimeDifference, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Number submitted: ${number}`);
  };

  return (
    <div className="p-7 w-[350px] h-[700px] sm:w-[292px] sm:h-[595px] md:w-[1024px] md:h-[700px] lg:w-[500px] lg:h-[900px] bg-slate-50 overflow-y-auto rounded-lg shadow-md">
      <h2 className="line-clamp-2 max-w-full font-bold text-2xl text-[36px] leading-[1.2] text-[#1D1F22] mb-2">
        {props.itemName}
      </h2>

      <div className="flex justify-between items-center ">
        <div className="block text-[#1D1F22] ">
          <p className="font-black text-sm font-normal">Current Bid</p>
          <div className="font-bold font-raleway text-2xl ">
            ${props.itemPrice.toFixed(2)}
          </div>
        </div>

        <div className="font-normal font-raleway  ">
          <p className="text-gray-500 text-[0.875rem]">Bids</p>
          <span className="ml-2 text-lg font-semibold text-[#1D1F22]">
            {props.bid?.length}
          </span>
        </div>
      </div>

      <hr className="w-full border-t border-gray-900 mt-4 mb-4" />

      <div className="mb-6">
        <div className="font-normal font-raleway text-[20px] leading-[77%] text-[#1D1F22] semi-bold mb-6">
          {status === "Ongoing" ? (
            <AuctionOngoing time={props.endTime} />
          ) : status === "Upcoming" ? (
            <AuctionUpcoming time={props.endTime} />
          ) : (
            <AuctionClose /> // Default case or an alternative UI
          )}
        </div>
        <hr className="w-full border-t border-gray-900 mt-4 mb-4" />
        {status == "Ongoing" ? (
          <form
            onSubmit={handleSubmit}
            className="w-full flex gap-2"
          >
            <div className="mb-4">
              <input
                type="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="pl-6 py-2 px-3 rounded-md h-10 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number"
                required
              />
            </div>
            <button
              type="submit"
              className="text-gray-700 text-white font-medium py-2 px-4 rounded-md h-10 bg-black "
            >
              Place Bid
            </button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
      <div className="font-normal font-raleway rounded-lg shadow-md  text-[20px] leading-[77%] text-[#1D1F22] mb-6 p-4 max-w-50 ">
        <div>Conditions:</div>
        <div className="mt-2">
          {props.condition ? props.condition : "No conditions specified"}
        </div>
      </div>
      <div className=" text-gray-700 mx-4 text-justify">
        <h4 className="font-semibold mb-2">Item Description:</h4>
        <p>
          {props.description} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolore dolorem quos minima, vitae exercitationem excepturi
          doloremque ad veniam sed, facere consequuntur fugiat. Atque nisi enim
          modi, dicta laudantium animi maiores!
        </p>
      </div>
      <LatestBids productId={props.id} />
    </div>
  );
};

export default ProductItemContent;
