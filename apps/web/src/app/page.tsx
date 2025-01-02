import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Envyper</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Your secure environment variable management solution. Sign in to get
          started.
        </p>
        <Button
          href="/sign-up"
          as={Link}
          color="primary"
          size="lg"
          className="font-semibold"
        >
          Get Started
        </Button>
      </main>
    </>
  );
}
