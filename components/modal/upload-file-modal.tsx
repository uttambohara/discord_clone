"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal";
import {
  UploadFileSchema,
  createServerSchema,
  uploadFileSchema,
} from "@/schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadContent from "../upload-content";
import queryString from "query-string";
import axios from "axios";

export default function UploadFileServer() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...
  const form = useForm<UploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  async function onSubmit(values: UploadFileSchema) {
    try {
      setIsUpdating(true);
      const url = queryString.stringifyUrl({
        url: data.channelData?.apiUrl || "",
        query: data.channelData?.params,
      });

      await axios.post(url, {
        fileUrl: values.fileUrl,
        content: values.fileUrl,
      });
      form.reset();
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  const hasOpened = isOpen && openModal === "uploadFile";

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle>Upload</DialogTitle>
          <DialogDescription>Upload a file in the server.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadContent endpoint="fileUploader" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isUpdating}>
              Upload file
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
