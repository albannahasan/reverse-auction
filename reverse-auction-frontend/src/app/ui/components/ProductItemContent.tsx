const ProductItemContent: React.FC = () => {
    return (
      <div className="p-10 w-[292px] h-[595px] sm:w-[292px] sm:h-[595px] md:w-[400px] md:h-[700px] lg:w-[500px] lg:h-[800px] bg-red-600">
        <h2 className="font-semibold font-raleway text-[36px] leading-[77%] text-[#1D1F22] mb-4">
           Product Title Test
        </h2>
        <h2 className="font-normal font-raleway text-[30px] leading-[110%] text-[#1D1F22] mb-6 w-[292px] h-auto sm:w-[400px] sm:h-auto md:w-[500px] md:h-auto lg:w-[600px] lg:h-auto">
                    Subtitle Text
        </h2>
        <div className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
            $99.99
        </div>
        <h4 className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
            10 bids
        </h4>
        <div className="font-normal font-raleway text-[30px] leading-[77%] text-[#1D1F22] mb-6">
            Conditions: Open-box
        </div>
        <div>
        <div className="font-normal font-raleway text-[20px] leading-[77%] text-[#1D1F22] semi-bold mb-6">
                    Time Left: 3 <span className="font-bold">Days</span> 4 <span className="font-bold">Hours</span> 5 <span className="font-bold">Minutes</span> 
        </div>
        <hr className="w-full border-t border-gray-900 mt-4 mb-4" />
        <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-4">
                Place Bid
            </button>
        </div>
        </div>

      </div>
    );
  };
  
  export default ProductItemContent;