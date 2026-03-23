"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-auth";
import { saveSession } from "@/lib/api/session";
import { DashboardRoutes } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { LoginReq } from "@/types/auth";
import { loginReqSchema } from "@/types/auth";

import { authToastOptions } from "./auth-toast";

type LoginFormValues = LoginReq & { remember?: boolean };

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const setTokens = useAuthStore((s) => s.setTokens);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginReqSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    login.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: async (token) => {
          saveSession(token.accessToken, token.refreshToken);
          setTokens(token.accessToken, token.refreshToken);
          router.push(DashboardRoutes.DASHBOARD);
        },
        onError: (error) => {
          toast.error(error.message || "Login failed", authToastOptions);
        },
      },
    );
  };

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormControl>
                <Checkbox
                  id="login-remember"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="size-4"
                />
              </FormControl>
              <FormLabel htmlFor="login-remember" className="ml-1 font-medium text-muted-foreground text-sm">
                Remember me for 30 days
              </FormLabel>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={login.isPending}>
          {login.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
