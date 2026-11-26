import ProductsClient from "@/components/dashboard/dashboardAdmin/products/ProductsClient";

async function getPerfumes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/perfume`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch perfumes");
    }

    const result = await response.json();

    return result.perfumes || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage() {
  const perfumes = await getPerfumes();

  return <ProductsClient initialProducts={perfumes} />;
}
