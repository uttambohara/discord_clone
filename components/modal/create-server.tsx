"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateServerModal, createServerModal } from "@/schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Upload from "../upload";

export default function CreateServer() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  useEffect(() => setHasMounted(true), []);
  //   Form
  const form = useForm<CreateServerModal>({
    resolver: zodResolver(createServerModal),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  async function onSubmit(values: CreateServerModal) {
    try {
      setIsUpdating(true);
      const createdServer = await axios.post("/api/server", values);
      router.refresh();
      window.location.assign(`/server/${createdServer.data.server.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!hasMounted) return null;

  return (
    <Dialog open>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with a name and an icon. You can
            always change it later.
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-[#282b30]"
                        placeholder="Server name"
                        {...field}
                        disabled={isUpdating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button type="submit" disabled={isUpdating} className="ml-auto">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
