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
  Dialog,
  DialogContent,
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
import { useModal } from "@/hooks/use-modal";
import { ChannelModalSchema, channelModalSchema } from "@/schemas";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

export default function CreateChannelModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...
  const form = useForm<ChannelModalSchema>({
    resolver: zodResolver(channelModalSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  async function onSubmit(values: ChannelModalSchema) {
    try {
      setIsUpdating(true);
      const qs = queryString.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: data.server?.id,
        },
      });
      await axios.post(qs, values);
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
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center">Create a channel</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full" disabled={isUpdating}>
                          <SelectValue placeholder={ChannelType.TEXT} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ChannelType).map(([item, value]) => (
                            <SelectItem value={value} key={item}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    <FormLabel>Channel name</FormLabel>
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
                Create a channel
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
