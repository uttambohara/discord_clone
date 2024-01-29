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
import { useRouter } from "next/navigation";

export default function InitialServerModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
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
      const createdServer = await axios.post("/api/server", values);
      router.refresh();
      window.location.assign(`/server/${createdServer.data.createdServer.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <Dialog open>
      <DialogContent>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUpdating}>
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
