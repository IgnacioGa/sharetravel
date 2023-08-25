"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { FormContextProvider } from "@provider/formProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FormContextProvider>{children}</FormContextProvider>
    </SessionProvider>
  );
}
