import PicturePanelContainer from "@/app/ui/components/PicturePanelContainer";
import ProductItemContent from "@/app/ui/components/ProductItemContent";

export default function ProductDetails({ params }: {
    params: { productId : string};
}){
    return (
        <div className="flex flex-row items-center p-10">
            <PicturePanelContainer />
            <ProductItemContent/>
        </div>
    )
}