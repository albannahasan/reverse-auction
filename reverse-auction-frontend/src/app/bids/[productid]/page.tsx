import BidTable from "@/app/ui/components/BidTable";

export default function bidDetails({ params }: {
    params: { productId : string};
}){
    return (
        <div className="items-center p-10">
            <h2>Bid History</h2>
            <BidTable/>
        </div>
    )
}