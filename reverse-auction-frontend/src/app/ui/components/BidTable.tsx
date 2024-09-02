"use client";

import { Bid } from "@/app/interface/interface";
import { getBidsByProductId } from "@/app/lib/actions/bid";
import {
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { format } from 'date-fns'; // Import date-fns for formatting


export default function BidTable({ id }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bids, setBids] = useState<Bid[]>([]);

  const [sortDescriptor, setSortDescriptor] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
    column: 'amount',
    direction: 'ascending',
  });

  useEffect(() => {
    console.log(id);
    // console.log(bidId)
    if (id) {
      const fetchBids = async () => {
        const fetchedBid = await getBidsByProductId(id);
        console.log(fetchedBid);

        setBids(fetchedBid);
        setIsLoading(false)
      };

      fetchBids();
    }
  }, [id]);

  const sortedBids = useMemo(() => {
    return [...bids].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [bids, sortDescriptor]);


  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy HH:mm:ss'); // Custom format, e.g., "September 02, 2024 12:23:51"
  };

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={sortDescriptor}
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="id" allowsSorting>
          id
        </TableColumn>
        <TableColumn key="price" allowsSorting>
          Bid Amount
        </TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          Bid Time
        </TableColumn>
      </TableHeader>
      <TableBody
        items={bids}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="text-slate-900	">
                {columnKey === 'createdAt' ? formatDate(item[columnKey]) : getKeyValue(item, columnKey)}
                </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
