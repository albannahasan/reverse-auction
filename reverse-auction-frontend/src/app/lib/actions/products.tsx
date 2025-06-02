"use server";

export async function getAllProductsActions(pageSize:Number) {
    try {
      const response = await fetch(`http://localhost:8085/product/all?pageNo=0&pageSize=${pageSize}`, {
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


  export async function getProductByBatch(productList:Number[]) {
    try {
      const response = await fetch(`http://localhost:8085/product/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productList),
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

  export async function getProductById(id: Number) {
    try {

      const response = await fetch(`http://localhost:8085/product/${id}`, {
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