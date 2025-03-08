import React from "react";
import { Button } from "@heroui/button";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <header className="container min-h-[calc(100vh-64px)] flex flex-col items-start md:items-center justify-center gap-4 md:gap-6">
        <h1 className="text-3xl md:text-4xl tracking-tight">
          Welcome to Envyper
        </h1>
        <p className="text-6xl md:text-7xl font-extrabold tracking-wider max-w-4xl md:text-center">
          Your one-stop solution for environment variable management.
        </p>
        <Button
          as={Link}
          href="/sign-in"
          color="primary"
          size="lg"
          className="mt-8 w-full md:w-auto"
        >
          Get Started
        </Button>
      </header>
    </>
  );
};

export default Home;
