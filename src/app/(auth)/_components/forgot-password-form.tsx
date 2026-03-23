"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/use-auth";
import type { ForgotPasswordReq } from "@/types/auth";
import { forgotPasswordReqSchema } from "@/types/auth";

import { authToastOptions } from "./auth-toast";

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordReq>({
    resolver: zodResolver(forgotPasswordReqSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordReq): Promise<void> => {
    forgotPassword.mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success("Reset link sent! Check your email.", authToastOptions);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to send reset link", authToastOptions);
      },
    });
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-sm">
        <p className="mb-1 font-medium text-foreground">Check your email</p>
        <p>We&apos;ve sent a password reset link to your email address. It may take a few minutes to arrive.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={forgotPassword.isPending}>
          {forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  );
}
