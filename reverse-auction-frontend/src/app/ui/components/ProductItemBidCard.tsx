
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

type Props = {
  placeholder?: string,
}

export default function ProductItemBidCard(){

  return (
    <Card className="max-w-[1500px] bg-black mb-4">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="text-white text-md">$2.00</div>
        <div className="text-white text-md">4 Jul 2024 at 10:03:43am</div>
      </CardHeader>
    </Card>
  )
}