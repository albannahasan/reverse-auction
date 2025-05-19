import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import BidCard from "./BidCard";
import HomepageInfoCard from "./HomepageInfoCard";

type Props = {
  placeholder?: string;
};

export default function HomeCard() {
  return (
    <Card className="min-h-96 bg-bluishGray">
      <CardHeader className="justify-between flex flex-col items-start bg-bluishGray">
        <section className="max-w-3xl py-20 ">
          <h1 className="font-bold text-4xl mb-6 animate-float">
            Find Unique Items, Bid with Confidence
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover a world of unique items and bid with confidence. Our
            platform connects buyers and sellers, ensuring a seamless auction
            experience.
            </p>

        </section>


      </CardHeader>
    </Card>
  );
}
