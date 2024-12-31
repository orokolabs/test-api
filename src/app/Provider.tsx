"use client";

import React from "react";
import QueryProvider from "../query/QueryProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
