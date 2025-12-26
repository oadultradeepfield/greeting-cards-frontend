import { Mail } from "lucide-react";

interface MessageBlockProps {
  label: string;
  content: string;
}

export function MessageBlock({ label, content }: MessageBlockProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Mail className="text-muted-foreground h-4 w-4" />
        <span className="text-muted-foreground text-sm">{label}</span>
      </div>
      <p className="whitespace-pre-wrap rounded-lg bg-muted p-4">{content}</p>
    </div>
  );
}
