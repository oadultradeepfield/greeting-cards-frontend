import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { type CardAPIResponse, CardAPIResponseSchema } from "../schema/card";

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Card Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
