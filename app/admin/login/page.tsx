import Image from "next/image";
import { publicBackendUrl } from "../../../lib/backend";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={210} height={82} priority />
        <div>
          <p className="eyebrow">Admin access</p>
          <h1>Sign in</h1>
          <p>Use your backend admin credentials to manage leads and properties.</p>
        </div>
        <LoginForm apiBaseUrl={publicBackendUrl()} />
      </section>
    </main>
  );
}
