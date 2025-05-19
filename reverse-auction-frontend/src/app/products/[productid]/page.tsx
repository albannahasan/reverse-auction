"use client";
import PicturePanelContainer from "@/app/ui/components/PicturePanelContainer";
import ProductItemContent from "@/app/ui/components/ProductItemContent";
import { useEffect, useState } from "react";
import { getProductById } from "../../lib/actions/products";
import ProductItemDescription from "@/app/ui/components/ProductItemDescription";
import LatestBids from "@/app/ui/components/latest-bid-product";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  images: string[];
  condition: string;
  endTime: string;
  startTime: string;
}

export default function ProductDetails({
  params,
}: {
  params: { productid: Number };
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {

    if (params.productid) {
      const fetchProducts = async () => {
        const fetchedProduct = await getProductById(params.productid);
        console.log(fetchedProduct);

        setProduct(fetchedProduct);
      };

      fetchProducts();
    }
  }, [params, params.productid]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-8 items-start px-8 py-4">
      <PicturePanelContainer />
      <ProductItemContent
        id={product.id}
        description={product.description}
        itemName={product.name}
        itemTime={product.createdDate}
        itemPrice={product.price}
        condition={product.condition}
        startTime={product.startTime}
        endTime={product.endTime}
        bid={[]}
      />
      <ProductItemDescription description={product.description}/>
      <LatestBids productId={product.id} />
    </div>
  );
}
