"use server";

export async function getBidsByProductId(id: Number) {
    try {
      const response = await fetch(`http://localhost:8085/bid/by-product/${id}`, {
        method: "GET",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }