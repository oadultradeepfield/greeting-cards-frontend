import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { GreetingCardDisplay } from "@/components/card/GreetingCardDisplay";
import { LoadingSpinner } from "@/components/card/LoadingSpinner";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { useConfetti } from "@/hooks/useConfetti";
import { cn } from "@/lib/utils";
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

  const { data, isPending, isError } = useQuery({
    queryKey: ["card", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Card ID is required");
      }
      return fetchCard(id);
    },
    enabled: !!id,
  });

  const shouldStartConfetti = !isPending && !!data;
  const { isAnimating, hasStarted } = useConfetti(shouldStartConfetti);

  const [isBlurredLocal, setIsBlurredLocal] = useState(true);

  useEffect(() => {
    if (shouldStartConfetti) {
      setIsBlurredLocal(true);
    }
  }, [shouldStartConfetti]);

  useEffect(() => {
    if (hasStarted && !isAnimating) {
      setIsBlurredLocal(false);
    }
  }, [hasStarted, isAnimating]);

  if (isPending) {
    return <LoadingSpinner message="Loading card..." />;
  }

  if (isError || !data) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="relative z-10">
        <GreetingCardDisplay card={data.data} isBlurred={isBlurredLocal} />
      </div>
      <InteractiveGridPattern
        className={cn(
          "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={40}
        height={40}
        squares={[100, 100]}
        squaresClassName="hover:fill-blue-300"
      />
    </div>
  );
}
