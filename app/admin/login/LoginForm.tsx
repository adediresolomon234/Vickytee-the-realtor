"use client";

import { FormEvent, useState } from "react";

export function LoginForm({ apiBaseUrl }: { apiBaseUrl: string }) {
  const [status, setStatus] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") || ""),
          password: String(formData.get("password") || ""),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus(data.error || "Could not sign in.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setStatus("Could not reach the backend. Make sure the API is running on port 8080.");
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
