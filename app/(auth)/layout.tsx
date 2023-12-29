import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid h-screen place-content-center">{children}</div>;
}
