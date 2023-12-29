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
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadItem from "../upload-item";

// Form schema
const formSchema = z.object({
  name: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  imageUrl: z.string().min(8, {
    message: "Image url must be at least 8 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

// Modal
export default function CreateServerModal() {
  const { isOpen, openModal, onClose } = useModal();
  const router = useRouter();

  // form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: FormSchema) {
    try {
      const server = await axios.post(`/api/server/create`, values);
      router.refresh();
      window.location.assign(`/server/${server.data.server.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  // Open and close state
  const isCurrentlyOpen = isOpen && openModal === "createServer";

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isCurrentlyOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality by adding a name and an icon. You can
            always change this later...
          </DialogDescription>
        </DialogHeader>
        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Server name..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
