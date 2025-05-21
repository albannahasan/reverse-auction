import Link from "next/link";
import BidCard from "./BidCard";
import ProductItemBidCard from "./ProductItemBidCard";
import { useEffect, useState } from "react";
import { getAllProductsActions } from "@/app/lib/actions/products";
import AuctionOngoing from "./auction-ongoing";
import AuctionUpcoming from "./auction-upcoming";
import AuctionClose from "./auction-close";
import LatestBids from "./latest-bid-product";
import { Bid } from "@/app/interface/interface";

interface Props {
  id: number;
  itemName: string;
  itemTime: string;
  itemPrice: number;
  latestBid: Bid;
  condition: string;
  description: string;
  endTime: string;
  startTime: string;
  images: string[];
  totalBids: number;
  postBid: (bidData: { price: number; productId: number }) => Promise<Bid | null>;
}
export const parseDateString = (dateString: string): Date => {
  // Create a Date object from the provided dateString
  return new Date(dateString);
};

const ProductItemContent = (props: Props) => {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<string>("");
  const [isValid, setIsValid] = useState(true);

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

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

 try {
    const createdBid = await props.postBid({
      price: Number(number),
      productId: props.id,
    });

    if (createdBid) {
      alert(`Bid created successfully!`);
    } else {
      alert("Failed to create bid.");
    }
  } catch (error: any) {
    alert(`Error submitting bid: ${error.message || error}`);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNumber(val);

    // Validate if value is >= displayPrice (your minimum)
    if (val === "" || Number(val) >= displayPrice) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };


const displayPrice = props.latestBid ? props.latestBid.price : props.itemPrice;

  return (
    <div className="p-7 w-[350px] h-[700px] sm:w-[292px] sm:h-[595px] md:w-[1024px] md:h-[500px] lg:w-[500px] lg:h-[600px] mr-4 bg-slate-50 rounded-lg shadow-md">
      <h2 className="line-clamp-2 max-w-full font-bold text-2xl text-[36px] leading-[1.2] text-[#1D1F22] mb-2">
        {props.itemName}
      </h2>

      <div className="flex justify-between items-center ">
        <div className="block text-[#1D1F22] ">
          <p className="font-black text-sm">Current Bid</p>
          <div className="font-bold font-raleway text-2xl ">
            ${displayPrice.toFixed(2)}
          </div>
        </div>

        <div className="font-normal font-raleway  ">
          <p className="text-gray-500 text-[0.875rem]">Bids</p>
          <span className="text-lg font-semibold text-[#1D1F22]">{props.totalBids || 0}</span>
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
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <input
              type="number"
              id="number"
              value={number}
              onChange={handleChange}
              className={`pl-4 py-2 px-2 rounded-md h-10 w-full border focus:outline-none focus:ring-2 text-black ${
                isValid
                  ? "border-gray-300 focus:ring-blue-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              placeholder={`Bid Amount (Min: $${displayPrice.toFixed(2)})`}
              required
            />
            <button
              type="submit"
              className="text-white font-medium py-2 px-4 rounded-md h-10 bg-black min-w-[150px] "
            >
              Place Bid
            </button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
      <div className="font-normal font-raleway rounded-lg text-[15px] leading-[77%] text-[#1D1F22] mb-6 p-4 max-w-50 ">
        <div className=" text-gray-500 mb-4">
          Conditions:{" "}
          {props.condition
            ? formatCondition(props.condition)
            : "No conditions specified"}
        </div>
        <div className=" text-gray-500 mb-4">
          Shipping: No Information provided
        </div>
      </div>
    </div>
  );
};

function formatCondition(text: string): string {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default ProductItemContent;
