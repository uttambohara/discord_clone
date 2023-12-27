"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-modal";
import UploadItem from "../upload-items";

// Form schema and zod
const formSchema = z.object({
  imageUrl: z.string().min(4, {
    message: "Image URL must be at least 2 characters.",
  }),
  name: z
    .string()
    .min(4, { message: "Server name should contain at least 3 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

// Modal
export default function CreateServerModal() {
  // state and hooks
  const { openModal, isOpen } = useModalStore();

  // form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  // form submit handler
  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  // condition
  const hasOpened = isOpen && openModal === "createServer";
  if (!hasOpened) return null;

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with a name and image. You can always
            change this later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Upload item */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadItem endpoint={"imageUploader"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Server name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server name</FormLabel>
                  <FormControl>
                    <Input placeholder="Server name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
