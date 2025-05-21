"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import BidCard from "./BidCard";
import HomepageInfoCard from "./HomepageInfoCard";
import Image from "next/image";
import { calculateAuctionTimeLeft } from "@/app/utils/utils";
import { image } from "@nextui-org/theme";
import { useRouter } from "next/navigation";

type Props = {
  placeholder?: string;
};

interface Bid {
  amount: number;
  bidder: string;
  timestamp: string;
}

interface Product {
  id: number;
  itemName: string;
  itemTime: string;
  itemPrice: number;
  bid: Bid[];
  condition: string;
  description: string;
  endTime: string;
  startTime: string;
  imageUrls: string;
}


export default function AuctionCard({ product }: { product: Product }) {

  const router = useRouter();
  const goToProductDetail = (id: Number, e: { preventDefault: () => void }) => {

    e.preventDefault();
    router.push(`/products/${id}`);
  };
  return (
    <Card className="w-full group hover:bg-gray-100 transition duration-300 ease-in-out animate-fadeIn">
      <img
        className="w-full h-72 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        src={product.imageUrls}
        alt=""
      />
      <CardHeader className="justify-between flex flex-col items-start bg-bluishGray rounded-none pb-8 transition duration-300 ">
        <div className="py-2  w-full">
          <h4 className="font-semibold mb-2">{product.itemName}</h4>
          <div className="flex flex-row justify-between w-full py-2">
            <h5 className="text-sm font-semibold">
              ${product.itemPrice.toFixed(2)}
            </h5>
            <div className="flex flex-row items-end">
              <p className="text-sm text-gray-500 mr-2">
                {product.bid.length} bids
              </p>
              <Image
                src="/clock.svg"
                alt="Clock"
                width={12}
                height={12}
                className="inline-block mr-0.5 my-auto"
              />

              <p className="text-sm text-gray-600">
                {calculateAuctionTimeLeft(product.startTime, product.endTime)}
              </p>
            </div>
          </div>
        </div>

        <button className="bg-black w-full justify-center font-medium text-white text-xl px-4 py-2 rounded" onClick={(e) => goToProductDetail(product.id, e)}>
          Bid Now
        </button>
      </CardHeader>
    </Card>
  );
}
