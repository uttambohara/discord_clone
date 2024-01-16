"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { CreateChannelModalT, createChannelModalT } from "@/schemas";
import { ChannelType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import queryString from "query-string";

export default function CreateChannelModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { onClose, openModal, isOpen, server } = useModal();

  //   Form
  const form = useForm<CreateChannelModalT>({
    resolver: zodResolver(createChannelModalT),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  async function onSubmit(values: CreateChannelModalT) {
    console.log(values);
    try {
      setIsUpdating(true);

      const query = queryString.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: server?.id,
        },
      });

      await axios.patch(query, values);
      router.refresh();
      window.location.reload();
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
  const hasOpened = isOpen && openModal === "createChannel";

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create channel
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Channel name"
                        {...field}
                        disabled={isUpdating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel type</FormLabel>
                    <FormControl>
                      <Select disabled={isUpdating}>
                        <SelectTrigger className="w-[100%]">
                          <SelectValue placeholder={ChannelType.TEXT} />
                        </SelectTrigger>
                        <SelectContent className="w-[100%]">
                          {Object.values(ChannelType).map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
