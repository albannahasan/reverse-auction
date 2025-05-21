"use server";

export async function getBidsByProductId(
  id: Number,
  latestOnly: boolean = false
) {
  try {
    let url = new URL(`http://localhost:8085/bid/by-product/${id}`);
    if (latestOnly) {
      url.searchParams.append("latestOnly", "true");
    }
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
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

export async function createBid(
  id: Number,
  bidData: { price: number; productId: number /* other bid fields */ }
) {
  try {
    let url = new URL(`http://localhost:8085/bid`);

     const response = await fetch(url, {
      method: "POST",
      // Remove no-cors to allow full request/response
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bidData),
    });

    console.log(id, "response", response);
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
