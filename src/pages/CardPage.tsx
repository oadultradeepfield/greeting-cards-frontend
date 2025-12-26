import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { GreetingCardDisplay } from "@/components/card/GreetingCardDisplay";
import { LoadingSpinner } from "@/components/card/LoadingSpinner";
import { type CardAPIResponse, CardAPIResponseSchema } from "@/schema/card";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchCard(id: string): Promise<CardAPIResponse> {
  const response = await fetch(`${BACKEND_URL}/api/cards/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch card: ${response.status}`);
  }
  const json = await response.json();
  return CardAPIResponseSchema.parse(json);
}

export default function CardPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["card", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Card ID is required");
      }
      return fetchCard(id);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading card..." />;
  }

  if (isError || !data) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GreetingCardDisplay card={data.data} />
    </div>
  );
}
