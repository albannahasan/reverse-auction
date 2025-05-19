import { div, h1, h2 } from "framer-motion/client";
import Image from "next/image";
import { list } from "postcss";

interface CartProps {
  toggleCart: () => void;
  listing: any[];
}

export const Cart: React.FC<CartProps> = ({ toggleCart, listing }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50 pointer-events-auto min-h-screen ">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full animate-slideLeft min-h-screen">
        <div className="flex align-center mb-3">
          <Image
            src="/cart.svg"
            alt="Cart"
            width={24}
            height={24}
            className="inline-block mr-0.5 my-auto"
          />
          <h2 className="text-xl font-bold mr-3">Your Cart</h2>

          <span className="bg-blue-600 rounded-xl text-white py-0.5 px-2 text-xs font-semibold flex items-center">
            {listing.length} items
          </span>

          <button
            className="ml-auto text-gray-500 hover:text-gray-700"
            onClick={() => toggleCart()}
          >
            X
          </button>
        </div>

        <p className="text-gray-500 mb-4">Last updated: 18 May 2025, 12:44</p>

        <hr className="mb-2" />
        {listing.length === 0 ? (
          <EmptyCart toggleCart={toggleCart} />
        ) : (
          <div>
            <div className="flex flex-col gap-y-2 overflow-auto max-h-[66vh] scrollbar-hide">
              <CartCard />
              <CartCard />
              <CartCard />
              <CartCard />

            </div>

            <div className="flex flex-col gap-y-4 mt-4 p-2 ">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">SubTotal</p>
                <p className="font-mono text-black">$39.99</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Taxes (Estimated)</p>
                <p>$0.02</p>
              </div>
              <hr />
              <div className="flex items-center justify-between mb-3">
                <p>SubTotal</p>
                <p className="font-semibold">$41.02</p>
              </div>
            </div>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold"
              onClick={() => toggleCart()}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CartCard = () => {
  return (
    <div className="flex justify-between  px-2 py-3 w-full ">
      <div className="flex ">
        <Image
          src="/path/to/image.jpg"
          alt="Product Image"
          width={50}
          height={50}
          className="rounded"
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold">Product Name</h3>
          <p className="text-xs text-gray-500">Added 18/02/2025</p>
        </div>
      </div>
      <p className="text-sm font-semibold ml-auto">$99.99</p>
      <hr />
    </div>
  );
};

interface EmptyCartProps {
  toggleCart: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ toggleCart }) => {
  return (
    <div className="flex items-center justify-center h-[77vh] gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
        <h4 className="text-gray-600 mb-4">
          Looks like you haven't won any bids yet
        </h4>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={toggleCart}
        >
          Continue bidding
        </button>
      </div>
    </div>
  );
};
