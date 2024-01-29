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
import { LoginSchema, loginSchema } from "@/schemas";
import AuthWrapper from "./auth-wrapper";
import { useState } from "react";
import AuthMessage from "./auth-message";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // ...
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    setSuccess("");
    setError("");
    setIsLoggingIn(true);
    try {
      await axios.post("/api/auth/login", values);
      setSuccess("Logged in");
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(err?.response?.data);
      }
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <AuthWrapper
      title="Auth"
      description="Welcome back"
      hasSocialIcons
      backLinkLabel="Don't have an account?"
      backLinkHref="/auth/register"
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
                  <Input
                    placeholder="Enter you email"
                    {...field}
                    disabled={isLoggingIn}
                  />
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
                    placeholder="******"
                    {...field}
                    type="password"
                    disabled={isLoggingIn}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {success && <AuthMessage type="success" label={success} />}
          {error && <AuthMessage type="error" label={error} />}

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
