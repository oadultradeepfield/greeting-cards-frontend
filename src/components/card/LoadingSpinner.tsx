import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Loader2 className="text-muted-foreground mx-auto h-12 w-12 animate-spin" />
      <p className="text-muted-foreground mt-4 animate-pulse">{message}</p>
    </div>
  );
}
