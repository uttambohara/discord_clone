import { ChannelType } from "@prisma/client";
import * as z from "zod";

//
export const loginSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

//
export const registerSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

//
export const createServerSchema = z.object({
  name: z.string().min(2, {
    message: "Server name must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "Image Url name must be at least 2 characters.",
  }),
});

export type CreateServerSchema = z.infer<typeof createServerSchema>;

//
export const channelModalSchema = z
  .object({
    name: z.string().min(2, {
      message: "Channel name must be at least 2 characters.",
    }),
    type: z.nativeEnum(ChannelType),
  })
  .refine((data) => data.name !== "general", {
    message: "Default type general already taken!",
  });

export type ChannelModalSchema = z.infer<typeof channelModalSchema>;

//
//
export const uploadFileSchema = z.object({
  fileUrl: z.string().min(2, {
    message: "File Url name must be at least 2 characters.",
  }),
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
