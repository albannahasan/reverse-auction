import React from "react";
import HomepageProductCard from "./HomepageProductCard";

const PicturePanelContainer: React.FC = () => {
  return (
    <div className="p-4  rounded-lg shadow-lg justify-center w-full">
      <div className="w-full h-[500px] overflow-hidden rounded-lg mr-auto">
        <img
          src="https://i.etsystatic.com/6611199/r/il/957121/1580712013/il_794xN.1580712013_kjyh.jpg"
          alt="Sample product"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />

      </div>
    </div>
  );
};

export default PicturePanelContainer;
