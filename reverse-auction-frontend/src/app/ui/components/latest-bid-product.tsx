import React from 'react';
import Link from 'next/link';  // Adjust the import based on your routing setup
import ProductItemBidCard from './ProductItemBidCard';  // Ensure the path to the component is correct

const LatestBids = () => {
  return (
    <div className="bg-yellow-500 p-6 m-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Live Bids
      </h3>
      <div className="space-y-4">
        <ProductItemBidCard />
        <ProductItemBidCard />
        <ProductItemBidCard />
      </div>
      <div className="flex justify-center mt-6">
        <Link href="/bids/1">
            <button className="bg-black hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              See All Bids
            </button>

        </Link>
      </div>
    </div>
  );
};

export default LatestBids;