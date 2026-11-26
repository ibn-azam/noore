import PerfumeDetailsClient from "@/components/dashboard/dashboardAdmin/products/PerfumeDetailsClient";

async function getPerfume(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/perfume/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.perfume || null;
  } catch (error) {
    console.error("Error fetching perfume:", error);
    return null;
  }
}

export default async function PerfumeDetailsPage({ params }) {
  const { id } = await params;
  const perfume = await getPerfume(id);

  if (!perfume) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-[#25221F]">
          Perfume not found
        </h2>
        <p className="mt-2 text-sm text-[#77716A]">
          This product may have been deleted or the ID is invalid.
        </p>
      </div>
    );
  }

  return <PerfumeDetailsClient perfume={perfume} />;
}
