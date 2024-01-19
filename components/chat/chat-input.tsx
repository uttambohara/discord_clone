"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MessageSchema, messageSchema } from "@/schemas";
import axios from "axios";
import { Plus, SmileIcon } from "lucide-react";
import queryString from "query-string";

interface ChatInputProps {
  name?: string;
  type: "channel" | "conversation";
  apiUrl: string;
  query: Record<string, string>;
}

export default function ChatInput({
  name,
  type,
  apiUrl,
  query,
}: ChatInputProps) {
  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: MessageSchema) {
    const qs = queryString.stringifyUrl({
      url: apiUrl,
      query,
    });
    try {
      await axios.post(qs, values);

      form.reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      className="absolute top-1 left-1 h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center"
                    >
                      <Plus color="darkgreen" />
                    </button>
                    <Input
                      placeholder={`${
                        type === "channel" ? "#" + name : "#" + "member"
                      } `}
                      {...field}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white/20 py-6 px-14 text-[0.9rem]"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 h-10 w-10 rounded-full flex items-center justify-center"
                    >
                      <SmileIcon color="darkgreen" />
                    </button>
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
