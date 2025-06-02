"use server";

export async function getCartByUserId(
  id: Number,
) {
  try {
    let url = new URL(`http://localhost:8085/cart/user/${id}`);
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