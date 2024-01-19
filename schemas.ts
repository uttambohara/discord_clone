import * as z from "zod";
import { ChannelType } from "@prisma/client";
//
export const loginSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

//
export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

//
export const createServerModal = z.object({
  imageUrl: z.string().min(4, {
    message: "Image url must be at least 4 characters.",
  }),
  name: z.string().min(5, {
    message: "Server name must be at least 5 characters.",
  }),
});

export type CreateServerModal = z.infer<typeof createServerModal>;

//
export const createChannelModalT = z
  .object({
    name: z.string().min(5, {
      message: "Server name must be at least 5 characters.",
    }),
    type: z.nativeEnum(ChannelType),
  })
  .refine((data) => data.name !== "general", {
    message: "General is the default channel name.",
    path: ["name"],
  });

export type CreateChannelModalT = z.infer<typeof createChannelModalT>;

//
export const messageSchema = z.object({
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export type MessageSchema = z.infer<typeof messageSchema>;
