"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/actions/login";
import CardMessage from "@/components/auth/card-message";
import CardWrapper from "@/components/auth/card-wrapper";
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
import { LoginSchema, loginSchema } from "@/schema";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const OAuthError = searchParams.get("error");

  // Fomr
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    setError("");
    startTransition(() =>
      login(values).then((res) => {
        if (res) {
          setError(res.error as string);
        }
      })
    );
  }

  return (
    <CardWrapper
      cardTitle="Login"
      cardDescription="Continue with your account..."
      backHrefLink="/auth/register"
      backHrefLabel="No Account?"
      backHrefLabelShort="Sign up"
      hasSocialLink
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <CardMessage type="error" label={error} />}

          {OAuthError && (
            <CardMessage
              type="error"
              label={"Email already taken by other provider!"}
            />
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
