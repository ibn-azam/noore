
import CollectionsClient from "./CollectionsClient";

async function getPerfumes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/perfume`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch perfumes");
    }

    const result = await response.json();
    return result.perfumes || [];
  } catch (error) {
    console.error("Error fetching perfumes:", error);
    return [];
  }
}

export default async function CollectionsPage() {
  const perfumes = await getPerfumes();

  return <CollectionsClient perfumes={perfumes} />;
}
