import { Card, CardHeader } from '@nextui-org/card'
import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation';

interface Bid {
    amount: number;
    bidder: string;
    timestamp: string;
  }
  
interface Props {
  id: Number
  value: string
  itemName: string
  itemTime: string
  itemPrice: number
  bid: Bid[]
  condition: string
  description: string

}

const ProductCard = (props: Props) => {
  const router = useRouter()

  
  const goToProductDetail = (id: Number, e: { preventDefault: () => void; }) => {
    console.log('CLicked!');
    
    e.preventDefault()
    router.push(`/products/${id}`);
  }
  return (
    <Card  className=" bg-white shadow-md rounded-lg hover:bg-red">
      <CardHeader className="flex" onClick={(e) => goToProductDetail(props.id,e)}>
        <div className="p-10 w-50 mx-auto">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://m.media-amazon.com/images/I/714J6o2Ug7L._AC_UF1000,1000_QL80_.jpg" alt="" />
          </div>
          <div className="mb-auto w-full mt-2 px-8 relative">
          <div>
            <h2 className="font-semibold text-lg">{props.itemName}</h2>
            <h3>{props.condition}</h3>
          </div>
          <hr className='my-2'/>
          <div className="grid grid-cols-2 max-h-80">
              <div className="">
                  <h2 className="font-semibold">$ {props.itemPrice.toFixed(2)}</h2>
                  <p>{props.bid.length} Bids</p>
              </div>
              <div className="">
                <div>
                  Time Left
                  <h2 className="font-semibold">4h 29m left</h2>
                </div>
              </div>
          </div>

        </div>
      </CardHeader>
    </Card>
  )
}

export default ProductCard
