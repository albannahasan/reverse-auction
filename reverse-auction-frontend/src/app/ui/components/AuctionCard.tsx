import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import BidCard from "./BidCard";
import HomepageInfoCard from "./HomepageInfoCard";

type Props = {
  placeholder?: string;
};

export default function AuctionCard() {
  return (
    <Card className="w-full">
      <CardHeader className="justify-between flex flex-col items-start bg-bluishGray pb-8">
        <img
          className="object-cover rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg"
          src="https://m.media-amazon.com/images/I/714J6o2Ug7L._AC_UF1000,1000_QL80_.jpg"
          alt=""
        />
        <div className="p-4">
          <h4>title</h4>
          <div className="flex flex-row items-start">
            <div>
              <h5 className="text-lg font-semibold">Starting Price</h5>
              <p className="text-sm text-gray-500">$100</p>
            </div>

            <div>
              <h5 className="text-lg font-semibold">Highest Bid</h5>
              <p className="text-sm text-gray-500">$150</p>
            </div>
          </div>
        </div>

        <button>Bid Now</button>
      </CardHeader>
    </Card>
  );
}
