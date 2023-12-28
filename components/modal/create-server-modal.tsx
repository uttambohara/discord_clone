"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadItem from "@/components/upload-item";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

// Form schema
const formSchema = z.object({
  imageUrl: z.string().min(4, {
    message: "Image url must be at least 2 characters.",
  }),
  name: z.string().min(4),
});

type FormSchema = z.infer<typeof formSchema>;

// Modal
export default function CreateServerModal() {
  const { isOpen, onOpen, openModal, onClose } = useModal();

  const router = useRouter();

  // Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Check if the modal is open
  const hasOpened = isOpen && openModal === "createServer";

  // Handlers
  async function onSubmit(values: FormSchema) {
    try {
      await axios.post(`/api/server/create`, values);
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  //
  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a name and an icon. You can always change this
            later.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
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
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
