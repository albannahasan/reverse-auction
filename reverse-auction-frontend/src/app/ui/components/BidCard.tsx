
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

type Props = {
  placeholder?: string,
}

export default function BidCard(){

  return (
    <Card className="max-w-[1500px]">
      <CardHeader className="justify-between flex flex-row items-start">
        <div className="flex w-full">
            <div className="flex">
                <h3>User</h3>
                <h3>@Username</h3>
            </div>
            <div>
                <h3>Bid</h3>
                <h3>$12.29</h3>
            </div>
        </div>
      </CardHeader>
    </Card>
  )
}