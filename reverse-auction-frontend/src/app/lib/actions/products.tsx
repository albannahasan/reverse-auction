"use server";
export async function getAllProductsActions() {
    try {
      const response = await fetch(`http://localhost:8085/product/all?pageNo=0&pageSize=3`, {
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