"use client";
import { getAllProductsActions } from "../lib/actions/products";
import ProductCard from "../ui/components/ProductCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterTable from "../ui/components/FilterCard";
import { Input } from "@nextui-org/react";
import { log } from "console";

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

type SortColumn = "name" | "dateCreated" | "startingPrice";

interface SortDescriptor {
  column: SortColumn;
  direction: "ascending" | "descending";
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const [selectedCondition, setSelectedCondition] = useState<String[]>([]);
  const hasSearchFilter = Boolean(filterValue);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

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
            product.description
              .toLowerCase()
              .includes(filterValue.toLowerCase())
        );
      }

      if (filteredListings == null) {
        return [];
      }
      if (selectedCondition.length > 0) {
        filteredListings = filteredListings.filter((product) =>
          selectedCondition.includes(product.condition)
        );
      }

      filteredListings = filteredListings.filter((product) => {
        const productPrice = product.price; // Assuming product.price is a string

        // Check if minPrice is valid and filter by minPrice
        const isAboveMinPrice =
          minPrice != null ? productPrice >= minPrice : true;

        // Check if maxPrice is valid and filter by maxPrice
        const isBelowMaxPrice =
          maxPrice != null ? productPrice <= maxPrice : true;

        // Return true if both conditions are met
        return isAboveMinPrice && isBelowMaxPrice;
      });

      return filteredListings;
    } else {
      console.error("products is not iterable");
      return [];
    }
  }, [
    products,
    filterValue,
    hasSearchFilter,
    selectedCondition,
    maxPrice,
    minPrice,
  ]);

  const sortedItems = useMemo(() => {
    if (filteredproducts == null) {
      return [];
    }
    if (sortDescriptor.column) {
      return [...filteredproducts].sort((a: Product, b: Product) => {
        let firstValue: string | number | Date;
        let secondValue: string | number | Date;
        switch (sortDescriptor.column) {
          case "date_created":
            firstValue = new Date(a[sortDescriptor.column] as string);
            secondValue = new Date(b[sortDescriptor.column] as string);
            break;
          case "price":
            firstValue = a[sortDescriptor.column];
            secondValue = b[sortDescriptor.column];
            break;
          default:
            firstValue = a["name"] as string;
            secondValue = b["name"] as string;
            break;
        }

        let cmp: number;
        if (firstValue instanceof Date && secondValue instanceof Date) {
          cmp = firstValue.getTime() - secondValue.getTime();
        } else if (
          typeof firstValue === "number" &&
          typeof secondValue === "number"
        ) {
          cmp = firstValue - secondValue;
        } else if (
          typeof firstValue === "string" &&
          typeof secondValue === "string"
        ) {
          cmp = firstValue.localeCompare(secondValue);
        } else {
          cmp = 0; // Default comparison if types are not as expected
        }
        console.log(sortDescriptor.direction);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
    return pageItems;
  }, [sortDescriptor, filteredproducts]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(sortedItems.length / rowsPerPage);
  const pageItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (products != null) {
      return sortedItems.slice(start, end);
    } else {
      return [];
    }
  }, [page, sortedItems]);
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const handleColumnChange = (value: string) => {
    const direction = value;

    // Update the column while keeping the current direction
    setSortDescriptor((prevDescriptor) => ({
      column: value,
      direction:
        prevDescriptor.column === value
          ? prevDescriptor.direction === "ascending"
            ? "descending"
            : "ascending"
          : "ascending",
    }));
  };

  const handlePriceChange = (
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    if (minPrice && maxPrice) {
      if (minPrice >= maxPrice) {
        alert(
          "Invalid price, minimum price cannot be bigger than maximum price"
        );
      }
    }
    if (minPrice) {
      setMinPrice(minPrice);
    }
    if (maxPrice) {
      setMaxPrice(maxPrice);
    }
  };

  const handleConditionChange = (conditions: Array<string>) => {
    console.log(conditions);

    setSelectedCondition(conditions);
  };

  return (
    <>
      <div className="m-4 p-4  flex flex-col rounded-lg shadow-lg w-full space-x-8 justify-center h-full">
        <div className="grid grid-cols-6 gap-3 p-3">
          <div className="bg-white col-span-1">
            <FilterTable
              selectedCondition={selectedCondition}
              handleConditionChange={handleConditionChange}
              handleColumnChange={handleColumnChange}
              sortValue={sortDescriptor.column}
              minPrice={minPrice}
              maxPrice={maxPrice}
              handlePriceChange={handlePriceChange}
            />
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

            {pageItems.length == 0 ? (
              <div>
                LOADING.....
              </div>
            ) : (
              pageItems.map((product: any) => (
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
                  endTime={product.endTime}
                  startTime={product.startTime}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
