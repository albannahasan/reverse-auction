
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import BidCard from "./BidCard";
import HomepageInfoCard from "./HomepageInfoCard";

type Props = {
  placeholder?: string,
}

export default function HomeCard(){

  return (
    <Card className="max-w-[1500px]">
      <CardHeader className="justify-between flex flex-col items-start">
        <div className="max-w-[50%] flex gap-5p-5">
            <div className="max-w-[50%] flex flex-row gap-1 items-start justify-center ">
                <img className="max-w-[100%]" src=""></img>
            </div>
            <div className="flex flex-col gap-1 items-star w-full h-full">
                <div className="flex flex-col gap-5 p-4 ">
                  <HomepageInfoCard/>
                </div>
                <div className="flex flex-col gap-5 p-4 ">
                  <h3 className="p-4 font-semibold leading-none text-default-900">Latest Bids</h3>
                  <div className="p-4 flex flex-row rounded-lg shadow-lg space-x-8 justify-center">
                    <BidCard/>
                    <BidCard/>
                    <BidCard/>
                  </div>
                </div>
            </div>
        </div>
      </CardHeader>
    </Card>
  )
}