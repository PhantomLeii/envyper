"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/react";
import Link from "next/link";

const SignInForm = () => {
  return (
    <Card className="rounded lg:w-1/2 lg:h-auto p-4">
      <CardHeader className="flex-col items-start gap-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide md:text-center">
          Welcome to Envyper
        </h1>
        <p className="text-xl tracking-tight w-full md:text-center">
          Register a new account
        </p>
      </CardHeader>

      <CardBody className="border-b border-secondary-300">
        <form action="" className="flex flex-col gap-4">
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="
            Enter your email address"
            />
          </div>

          <div className="w-full">
            <label htmlFor="password">Password</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="
            Enter your email address"
            />
          </div>

          <Button
            color="primary"
            onPress={() => console.log("Sign in")}
            className="mt-8"
          >
            Sign in
          </Button>
        </form>
      </CardBody>

      <CardFooter className="mt-6">
        <p className="w-full text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary-500 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
