"use client";
import PicturePanelContainer from "@/app/ui/components/PicturePanelContainer";
import ProductItemContent from "@/app/ui/components/ProductItemContent";
import { useEffect, useState } from "react";
import { getProductById } from "../../lib/actions/products";
import ProductItemDescription from "@/app/ui/components/ProductItemDescription";
import LatestBids from "@/app/ui/components/latest-bid-product";
import { Bid } from "@/app/interface/interface";
import { createBid, getBidsByProductId } from "@/app/lib/actions/bid";
import { create } from "domain";

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
  const [latestBid, setLatestBid] = useState<Bid[]>([]);
  const [totalBids, setTotalBids] = useState(0);

  const postBid = async (bidData: { price: number; productId: number }) => {
    const result = await createBid(params.productid, bidData);
    return result;
  };

  useEffect(() => {
    if (params.productid) {
      const fetchProducts = async () => {
        const fetchedProduct = await getProductById(params.productid);
        setProduct(fetchedProduct);
      };

      const fetchLatestBids = async () => {
        const fetchedBid = await getBidsByProductId(params.productid, true);
        setLatestBid(fetchedBid.bids);
        setTotalBids(fetchedBid.totalBids);
      };

      fetchProducts();
      fetchLatestBids();
    }
  }, [params, params.productid]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-8 items-start px-8 py-4">
      <PicturePanelContainer images={product.images} />
      <ProductItemContent
        id={product.id}
        description={product.description}
        itemName={product.name}
        itemTime={product.createdDate}
        itemPrice={product.price}
        condition={product.condition}
        startTime={product.startTime}
        endTime={product.endTime}
        images={product.images}
        latestBid={latestBid[0]}
        postBid={postBid}
        totalBids={totalBids}
      />
      <ProductItemDescription description={product.description} />
      <LatestBids productId={product.id} />
    </div>
  );
}
