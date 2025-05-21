"use client";
import { Card, CardHeader } from "@nextui-org/card";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bid {
  amount: number;
  bidder: string;
  timestamp: string;
}

interface Props {
  id: Number;
  value: string;
  itemName: string;
  itemTime: string;
  itemPrice: number;
  bid: Bid[];
  condition: string;
  description: string;
  endTime: string;
  startTime: string;
}

const ProductCard = (props: Props) => {
  const router = useRouter();

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isExpired, setIsExpired] = useState(false);


  useEffect(() => {
    const calculateTimeDifference = () => {
      const targetTime = new Date(props.endTime);
      const currentTime = new Date();

      // Calculate the difference in milliseconds
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        // Time has expired
        setDay(0);
        setHour(0);
        setMinute(0);
        setIsExpired(true);
        return;
      }

      // Calculate the difference in days, hours, and minutes
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      setDay(days);
      setHour(hours);
      setMinute(minutes);
    };

    calculateTimeDifference();

    // Optional: Set an interval to keep updating the time difference
    const intervalId = setInterval(calculateTimeDifference, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const goToProductDetail = (id: Number, e: { preventDefault: () => void }) => {
    console.log("CLicked!");

    e.preventDefault();
    router.push(`/products/${id}`);
  };
  return (
    <Card className=" bg-white shadow-md rounded-lg cursor-pointer hover:bg-slate-50 transition-colors duration-300">
      <CardHeader
        className="flex"
        onClick={(e) => goToProductDetail(props.id, e)}
      >
        <div className="p-10 w-50 mx-auto">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="https://m.media-amazon.com/images/I/714J6o2Ug7L._AC_UF1000,1000_QL80_.jpg"
            alt=""
          />
        </div>
        <div className="mb-auto w-full mt-2 px-8 relative">
          <div>
            <h2 className="font-semibold text-lg">{props.itemName}</h2>
            <h3 className="text-gray-500">{props.condition}</h3>
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-2 max-h-80">
            <div className="">
              <h2 className="font-semibold">$ {props.itemPrice.toFixed(2)}</h2>
              <p>{props.bid.length} Bids</p>
            </div>
            <div className="">
              {isExpired ? (
                <p>Time has expired!</p>
              ) : (
                <div>
                  Time Left
                  
                  <h2 className="font-semibold">
                    {day} Day {hour} Hour {minute} Minute left
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
