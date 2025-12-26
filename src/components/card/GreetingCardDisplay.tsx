import { Cake, PartyPopper, Send, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Card as CardType } from "@/schema/card";
import { MessageBlock } from "./MessageBlock";

interface GreetingCardDisplayProps {
  card: CardType;
}

export function GreetingCardDisplay({ card }: GreetingCardDisplayProps) {
  const OccasionIcon = card.occasion === "birthday" ? Cake : PartyPopper;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <OccasionIcon className="text-muted-foreground h-5 w-5" />
          <span className="text-muted-foreground text-sm capitalize">
            {card.occasion}
          </span>
        </div>
        <CardTitle className="text-2xl">{card.title}</CardTitle>
        <CardDescription className="flex flex-col gap-1 pt-2">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" />
            To: {card.recipient}
          </span>
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            From: {card.sender}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {card.thai_content && (
          <MessageBlock label="ข้อความ" content={card.thai_content} />
        )}
        {card.english_content && (
          <MessageBlock label="Message" content={card.english_content} />
        )}
      </CardContent>
    </Card>
  );
}
