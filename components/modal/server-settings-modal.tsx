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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateServerSchema, createServerSchema } from "@/schemas";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadContent from "../upload-content";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export default function ServerSettingModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...
  const form = useForm<CreateServerSchema>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  async function onSubmit(values: CreateServerSchema) {
    try {
      setIsUpdating(true);
      const createdServer = await axios.patch(
        `/api/server/${data?.server?.id}`,
        values
      );
      router.refresh();
      onOpen("serverSetting", { server: createdServer.data.updatedServer });
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

  useEffect(
    function () {
      if (data) {
        form.setValue("imageUrl", data?.server?.imageUrl!);
        form.setValue("name", data?.server?.name!);
      }
    },
    [data]
  );

  const hasOpened = isOpen && openModal === "serverSetting";

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle>Create a server</DialogTitle>
          <DialogDescription>
            Give your server a personality by giving it a name and an image.
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadContent endpoint="imageUploader" {...field} />
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
                        placeholder="Name"
                        {...field}
                        disabled={isUpdating}
                        className="dark:bg-[#36393e]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUpdating}>
                Update
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
