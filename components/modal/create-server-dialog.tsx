"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Upload from "@/lib/upload";
import { CreateServerModalSchema, createServerModalSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";

export default function CreateServerDialog() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { isOpen, openModal, onClose } = useModal();

  // form
  const form = useForm<CreateServerModalSchema>({
    resolver: zodResolver(createServerModalSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: CreateServerModalSchema) {
    try {
      setIsUpdating(true);
      await axios.post("/api/server", values);
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  const hasOpened = isOpen && openModal === "createServer";

  if (!hasOpened) return null;
  return (
    <Dialog open={hasOpened} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create a server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with a name and an image. You can
            always change this later.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload endpoint="imageUploader" {...field} />
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
                        placeholder="Server name"
                        {...field}
                        disabled={isUpdating}
                        className="dark:bg-[#282b30]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUpdating}>
                Create a server
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
