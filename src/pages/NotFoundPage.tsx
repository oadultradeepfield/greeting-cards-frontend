import { ArrowLeft, FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto">
            <FileQuestion className="text-muted-foreground h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">404 - Not Found</CardTitle>
          <CardDescription>
            The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
