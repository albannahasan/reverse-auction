"use client";
import { getAllProductsActions } from "../lib/actions/products";
import ProductCard from "../ui/components/ProductCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterTable from "../ui/components/FilterCard";
import { Input } from "@nextui-org/react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  images: string[];
  condition: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProductsActions(5);
      console.log("Fetched products:", products); // Print products to the console
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const filteredproducts = useMemo(() => {
    if (
      Array.isArray(products) ||
      (typeof products === "object" &&
        products !== null &&
        typeof products[Symbol.iterator] === "function")
    ) {
      let filteredListings = [...products];
      const now = new Date(); // Current date and time

      if (hasSearchFilter) {
        filteredListings = filteredListings.filter(
          (product) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            product.description.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      return filteredListings;
    } else {
      console.error("products is not iterable");
      return [];
    }
  }, [products, filterValue, hasSearchFilter]);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <>
      <div className="m-4 p-4  flex flex-col rounded-lg shadow-lg w-full space-x-8 justify-center h-full">
        <div className="grid grid-cols-6 gap-3 p-3">
          <div className="bg-blue-400 col-span-1">
            <FilterTable />
          </div>
          <div className="space-y-10 px-4 col-span-4">
            <Input
              label="Search"
              type="search"
              className="p-4"
              placeholder="Search by name or description..."
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />

            {filteredproducts.map((product: any) => (
              <ProductCard
                id={product.id}
                key={product.id}
                itemName={product.name}
                itemPrice={product.price}
                itemTime="22:00"
                value="22"
                bid={[]}
                condition={product.condition}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
