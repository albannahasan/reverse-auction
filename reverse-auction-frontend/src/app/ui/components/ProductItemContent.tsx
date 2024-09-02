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

  console.log("CHECK2", props.id)

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
    <div className="p-10 w-[350px] h-[700px] sm:w-[292px] sm:h-[595px] md:w-[600px] md:h-[700px] lg:w-[500px] lg:h-[900px] bg-slate-50 overflow-y-auto">
      <h2 className="line-clamp-2 max-w-full font-semibold font-raleway text-[36px] leading-[1.2] text-[#1D1F22] mb-4">
        {props.itemName}
      </h2>

      <hr className="w-full border-t border-gray-900 mt-4 mb-4" />
      <div className="grid grid-cols-2 justify-items-center items-center ">
        <div className="font-normal font-raleway rounded-lg shadow-md text-[#1D1F22] flex items-center justify-center min-h-[4rem] min-w-40 max-w-50 ">
          ${props.itemPrice.toFixed(2)}
        </div>
        <div className="font-normal font-raleway rounded-lg shadow-md text-[1.5vw] text-[#1D1F22] flex items-center min-h-[4rem] min-w-40 max-w-40 max-w-50 justify-center">
          Bids:
          <span className="ml-2">{props.bid?.length}</span>
        </div>
        <div className="font-normal font-raleway rounded-lg shadow-md  text-[20px] leading-[77%] text-[#1D1F22] mb-6 p-4 max-w-50 ">
          <div>Conditions:</div>
          <div className="mt-2">
            {props.condition ? props.condition : "No conditions specified"}
          </div>
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
          <form onSubmit={handleSubmit} className="p-4 w-full ">
            <div className="mb-4">
              <input
                type="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter number"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Place Bid
            </button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
      <hr className="w-full border-t border-gray-900 my-3" />

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
