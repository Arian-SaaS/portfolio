"use client";

import dynamic from "next/dynamic";

const NetworkScene = dynamic(
  () => import("@/components/three/network-scene").then((mod) => mod.NetworkScene),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse rounded-full bg-accent-blue/5" />,
  }
);

export function HeroScene() {
  return (
    <div className="hidden aspect-square w-full max-w-md lg:block">
      <NetworkScene />
    </div>
  );
}
