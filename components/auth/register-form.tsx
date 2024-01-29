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
  LoginSchema,
  RegisterSchema,
  loginSchema,
  registerSchema,
} from "@/schemas";
import AuthWrapper from "./auth-wrapper";
import { useState } from "react";
import { AxiosError } from "axios";
import axios from "axios";
import AuthMessage from "./auth-message";

export function RegisterForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ...
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    setError("");
    setSuccess("");
    setIsRegistering(true);
    try {
      await axios.post("/api/auth/register", values);
      setSuccess("Verification email sent");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(err.message);
      }
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <AuthWrapper
      title="Register"
      description="Create an account"
      hasSocialIcons
      backLinkLabel="Already have an account?"
      backLinkHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    {...field}
                    disabled={isRegistering}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={isRegistering}
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
                    disabled={isRegistering}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {success && <AuthMessage type="success" label={success} />}
          {error && <AuthMessage type="error" label={error} />}

          <Button type="submit" className="w-full" disabled={isRegistering}>
            Register
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
