"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkImageProps {
  url?: string | null;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  /** Rendered when [url] is empty or the image fails to load. */
  fallback?: ReactNode;
}

/**
 * Direct port of the Flutter `AppNetworkImage`: shows the remote image
 * with a smooth fade-in, falls back to a generic shield icon when the
 * URL is missing or fails. Uses next/image with `unoptimized` since the
 * mock URLs come from a CDN we don't own.
 */
export function NetworkImage({
  url,
  alt = "",
  width,
  height,
  className,
  fallback,
}: NetworkImageProps) {
  const [failed, setFailed] = useState(false);

  if (!url || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-text-muted",
          className,
        )}
        style={{ width, height }}
      >
        {fallback ?? <Shield className="size-6" />}
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
