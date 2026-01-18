"use client";

import * as React from "react";
import { Loader2, Check } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  loadingText?: string;
  successText?: string;
}

export function LoadingButton({
  children,
  isLoading = false,
  isSuccess = false,
  loadingText,
  successText,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : isSuccess ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          {successText || "Success!"}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
