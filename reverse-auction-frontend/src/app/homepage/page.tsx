import { profile } from "console";
import Navbar from "../components/global/navbar";
import Homecard from "../ui/components/HomeCard";
import CardColumn from "../ui/components/HomePageCardColumn";
import AuctionCard from "../ui/components/AuctionCard";
export default function Homepage() {
  const product = {
    name: "Amazing Product",
    description: "This is an amazing product you will love.",
    startingPrice: 100,
    highestBid: 150,
    image: "/path-to-image.jpg",
  };

  return (
    <main>
      <div className="flex flex-col items-center ">
        <div className="mb-4 w-full">
          <Homecard />
        </div>
      </div>
      <section>
        Latest Live Listings
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
          <AuctionCard />
          <AuctionCard />
          <AuctionCard />
           <AuctionCard />
        </div>
      </section>
      <section className="mt-2 py-7 px-10 justify-center items-center">
        <h3 className="mx-auto block font-semibold w-fit mb-14 text-2xl">
          How it Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">1</h4>
            <h5 className="font-semibold text-xl mb-2">Browse & Discover</h5>
            <p className="block text-center">
              Explore thousands of unique items across various categories to
              find something special.
            </p>
          </div>

          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">2</h4>
            <h5 className="font-semibold text-xl mb-2">Bid & Win</h5>
            <p className="block text-center">
              Place competitive bids on items you love and track your auctions
              in real-time.
            </p>
          </div>

          <div className="flex flex-col items-center p-10">
            <h4 className="text-2xl justify-center mb-3">3</h4>
            <h5 className="font-semibold text-xl mb-2">Pay & Receive</h5>
            <p>
              Complete secure payment and receive your item with our buyer
              protection guarantee.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
