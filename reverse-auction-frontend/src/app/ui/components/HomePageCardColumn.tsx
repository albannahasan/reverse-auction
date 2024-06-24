// components/CardColumn.tsx
import React from 'react';
import HomepageProductCard from './HomepageProductCard';

const CardColumn: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg shadow-lg justify-center">
        <HomepageProductCard itemName='Test' itemPrice={3} itemTime='22:00' value='22'/>
        <HomepageProductCard itemName='Test' itemPrice={3} itemTime='22:00' value='22'/>
        <HomepageProductCard itemName='Test' itemPrice={3} itemTime='22:00' value='22'/>
        <HomepageProductCard itemName='Test' itemPrice={3} itemTime='22:00' value='22'/>
    </div>
  );
};

export default CardColumn;