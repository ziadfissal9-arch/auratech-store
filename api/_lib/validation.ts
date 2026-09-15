import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  name: z.string().trim().min(1, "Name is required.").max(80),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1, "Password is required."),
});

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        qty: z.number().int().positive().max(99),
      })
    )
    .min(1, "Cart is empty."),
});
