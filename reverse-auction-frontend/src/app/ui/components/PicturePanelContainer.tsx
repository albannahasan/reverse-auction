import React from 'react';
import HomepageProductCard from './HomepageProductCard';

const PicturePanelContainer: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg shadow-lg justify-center bg-cyan-700 min-w-full w-120">
        <div className="w-20 text-white overflow-overlay h-[550px]">
            
        </div>
        <div className="h-[511px] w-[610px] mb-10 ml-10 mr-25"></div>
    </div>
  );
};

export default PicturePanelContainer;