"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import Social from "./social";

interface CardWrapperProps {
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  backHrefLabel?: string;
  backHrefLink?: string;
  backHrefLabelShort?: string;
  hasSocialLink: boolean;
}

export default function CardWrapper({
  cardTitle,
  cardDescription,
  children,
  backHrefLabel,
  backHrefLink,
  backHrefLabelShort,
  hasSocialLink,
}: CardWrapperProps) {
  return (
    <Card className="w-[24rem] space-y-4">
      <CardHeader className="px-6 py-3">
        <CardTitle className="text-3xl mb-1">{cardTitle}</CardTitle>
        <CardDescription className="text-md">{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-5">
        {/* Social */}
        {hasSocialLink && <Social />}
        {/* Href Label */}
        <div className="flex items-center gap-1">
          <span className="font-normal text-sm text-slate-600">
            {backHrefLabel}
          </span>
          <Link href={backHrefLink!} className="text-sm text-blue-400">
            {backHrefLabelShort}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
