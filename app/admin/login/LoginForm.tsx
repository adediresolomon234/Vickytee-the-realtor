"use client";

import { FormEvent, useState } from "react";

const LOGIN_TIMEOUT_MS = 15000;

export function LoginForm() {
  const [status, setStatus] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), LOGIN_TIMEOUT_MS);
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        signal: controller.signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") || ""),
          password: String(formData.get("password") || ""),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus(response.status === 401 ? "Incorrect email or password." : data.error || "Could not sign in.");
        return;
      }
      window.location.assign("/admin");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Login timed out. Check your network connection and try again.");
        return;
      }
      setStatus("Could not reach the backend. Check your network connection and try again.");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={login}>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="button button-dark" type="submit">Sign in</button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
