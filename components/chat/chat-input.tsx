"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Smile } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import EmojiPicker from "@emoji-mart/react";
import queryString from "query-string";
import axios from "axios";

const inputSchema = z.object({
  content: z.string().min(2, {
    message: "Chat content must be at least 2 characters.",
  }),
});

type InputSchema = z.infer<typeof inputSchema>;

interface ChatInputProps {
  type: "channel" | "conversation";
  apiUrl: string;
  params: Record<string, string>;
  name: string;
}

export default function ChatInput({
  name,
  type,
  apiUrl,
  params,
}: ChatInputProps) {
  const { onOpen } = useModal();
  const form = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      content: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: InputSchema) {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query: params,
      });

      await axios.post(url, { content: values.content });
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mt-auto mb-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute z-10 top-1 left-4 bg-slate-300 flex items-center justify-center p-2 rounded-full text-white hover:bg-slate-400 cursor-pointer"
                      onClick={() =>
                        onOpen("uploadFile", {
                          channelData: { apiUrl, params },
                        })
                      }
                    >
                      <Plus size={18} />
                    </div>
                    <Input
                      placeholder={`Message #${name}`}
                      {...field}
                      className="h-11 pl-14"
                      disabled={isSubmitting}
                    />
                    <div className="absolute z-10 top-2 right-5">
                      <Popover>
                        <PopoverTrigger>
                          <Smile />
                        </PopoverTrigger>
                        <PopoverContent
                          side="left"
                          sideOffset={50}
                          className="mb-12 bg-transparent border-none shadow-none"
                        >
                          <EmojiPicker />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
