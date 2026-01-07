"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";

export default function Page() {
  const [username, setUsername] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 500);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserMessage(data.message);
      } else {
        const data = await response.json();
        console.log(data);
        setUserMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form
          className="flex flex-col items-center justify-center w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 text-center"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-500 py-2 px-4 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
