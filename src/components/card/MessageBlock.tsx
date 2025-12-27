import { Mail } from "lucide-react";
import { TypingText } from "../ui/typing-text";

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
      <p className="relative rounded-lg bg-muted p-4">
        <span className="invisible whitespace-pre-wrap">{content}</span>
        <span className="absolute inset-0 whitespace-pre-wrap p-4">
          <TypingText
            text={content}
            delay={1000}
            speed={60}
            showCursor={false}
          />
        </span>
      </p>
    </div>
  );
}
