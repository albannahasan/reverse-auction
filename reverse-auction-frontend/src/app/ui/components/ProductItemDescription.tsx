import { div } from "framer-motion/client";

interface Props {
  description: string;
}

const ProductItemContent = (props: Props) => {
    return (
        <div className="block box-border shadow-soft bg-white rounded-lg p-6 min-h-30 text-justify">
            <h2 className="font-semibold text-xl text-black mb-4">Item Description</h2>
             <p className="text-gray-500">{props.description}</p>
        </div>
    )

}

export default ProductItemContent;