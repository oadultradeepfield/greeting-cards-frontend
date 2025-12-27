import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Cake, PartyPopper, Send, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/schema/card";
import { AuroraText } from "../ui/aurora-text";
import { ShineBorder } from "../ui/shine-border";
import { MessageBlock } from "./MessageBlock";

interface GreetingCardDisplayProps {
  card: CardType;
  isBlurred?: boolean;
}

export function GreetingCardDisplay({
  card,
  isBlurred = false,
}: GreetingCardDisplayProps) {
  const OccasionIcon = card.occasion === "birthday" ? Cake : PartyPopper;

  return (
    <Card
      className={cn(
        "w-full max-w-lg transition-all duration-700 ease-out",
        isBlurred ? "blur-sm" : "blur-0",
      )}
    >
      <ShineBorder shineColor={["#C4B5FD", "#FBCFE8", "#FDE68A"]} />
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <OccasionIcon className="text-muted-foreground h-5 w-5" />
          <span className="text-muted-foreground text-sm capitalize">
            {card.occasion}
          </span>
        </div>
        <div className="flex items-center justify-between -my-6">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl">
              <AuroraText>{card.title}</AuroraText>
            </CardTitle>
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
          </div>
          <DotLottieReact
            src="/lottie/blue-working-cat.lottie"
            loop
            autoplay
            className="h-36 w-36 shrink-0"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {card.thai_content && (
          <MessageBlock label="Thai Message" content={card.thai_content} />
        )}
        {card.english_content && (
          <MessageBlock label="Message" content={card.english_content} />
        )}
      </CardContent>
    </Card>
  );
}
