import { Card, CardHeader } from '@nextui-org/card'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  value: string
  itemName: string
  itemTime: string
  itemPrice: number
//   setValue: Dispatch<SetStateAction<string>>
//   setItemName: Dispatch<SetStateAction<string>>
//   setItemTime: Dispatch<SetStateAction<string>>
//   setItemPrice: Dispatch<SetStateAction<number>>
}

const HomepageProductCard = (props: Props) => {
  return (
    <Card className="w-[700px] bg-white shadow-md rounded-lg p-6 text-center">
      <CardHeader className="flex items-center justify-between">
        <div className="max-w-1/2 mx-auto">
          <img className="max-h-6" src="" alt="" />
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 max-w-1/2 mx-auto bg-red-100 p-4">
        <div>
          <h2 className="font-semibold">Name:</h2>
          <span>{props.itemName}</span>
        </div>
        <div>
          <h2 className="font-semibold">Time Left:</h2>
          <span>{props.itemTime}</span>
        </div>
        <div>
          <h2 className="font-semibold">Price:</h2>
          <span>{props.itemPrice}</span>
        </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default HomepageProductCard
