import { z } from "zod";

export const CardSchema = z.object({
  recipient: z.string().min(1),
  sender: z.string().min(1),
  occasion: z.enum(["general", "birthday"]),
  title: z.string().min(1),
  thai_content: z.string().nullable(),
  english_content: z.string().nullable(),
});

export const CardAPIResponseSchema = z.object({
  success: z.boolean(),
  data: CardSchema,
});

export type Card = z.infer<typeof CardSchema>;
export type CardAPIResponse = z.infer<typeof CardAPIResponseSchema>;
