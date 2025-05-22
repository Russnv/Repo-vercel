import { ENV } from "@/config/envs";

export async function newOrder(
  products: number[],
  userId: number,
  token: string
): Promise<boolean> {
  try {
    const response = await fetch(`${ENV.API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ userId, products }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Error en la compra");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
