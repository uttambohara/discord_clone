"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// Form schema
const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .refine((name) => name !== "general", {
      message: "Name cannot be general.",
    }),
  type: z.nativeEnum(ChannelType),
});

type FormSchema = z.infer<typeof formSchema>;

// Modal
export default function CreateChannelModal() {
  const { isOpen, openModal, onClose, data, onOpen } = useModal();
  const router = useRouter();

  // form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: FormSchema) {
    try {
      const server = await axios.post(
        `/api/server/${data?.id}/channel`,
        values,
      );
      router.refresh();

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  // Open and close state
  const isCurrentlyOpen = isOpen && openModal === "createChannel";

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isCurrentlyOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Channel type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ChannelType).map((item) => (
                          <SelectItem value={item} key={item}>
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
            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
