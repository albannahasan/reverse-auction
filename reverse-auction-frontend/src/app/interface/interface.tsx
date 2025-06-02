export interface Bid {
    id: number;
    productId: number;
    price: number;
    createdAt: string;
  }

  export interface CartItem {
    id: number;
    productId: number;
    price: number;
    addedAt: string;
  } 

  export interface Product {
     id: number;
    name: string;
    itemTime: string;
    price: number;
    latestBid: Bid;
    condition: string;
    description: string;
    endTime: string;
    startTime: string;
    images: string[];
    totalBids: number;
  }