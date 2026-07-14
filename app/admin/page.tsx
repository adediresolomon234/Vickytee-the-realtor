import Image from "next/image";
import Link from "next/link";
import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../chatgpt-auth";
import { getLeads, type Lead } from "../../lib/storage";
import { AdminUploader } from "./AdminUploader";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getChatGPTUser();
  const adminEmail = (env as unknown as { ADMIN_EMAIL?: string }).ADMIN_EMAIL?.toLowerCase();
  if (!user) return <main className="admin-shell"><div className="signin-card"><Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={220} height={65} /><h1>Admin access</h1><p>Sign in to manage website videos and review new client inquiries.</p><a className="button button-dark" href="/signin-with-chatgpt?return_to=/admin">Sign in securely</a></div></main>;
  if (adminEmail && user.email.toLowerCase() !== adminEmail) return <main className="admin-shell"><div className="signin-card"><h1>Access restricted</h1><p>This workspace is reserved for Victoria’s authorized account.</p><Link className="button button-dark" href="/">Return to website</Link></div></main>;

  let leads: Lead[] = [];
  try { leads = await getLeads(); } catch { /* Storage may be initializing in a local preview. */ }
  return <main className="admin-shell">
    <nav className="admin-nav"><Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={200} height={60} /><Link href="/">View website ↗</Link></nav>
    <header className="admin-header"><div><p className="eyebrow">Private workspace</p><h1>Welcome, Victoria.</h1></div><p>Publish a social post or upload a video, then review people who have contacted you through the website.</p></header>
    <div className="admin-grid">
      <section className="admin-panel"><p className="eyebrow">Social publishing</p><h2>Add a website update</h2><p>Paste an Instagram Reel/post link for a live embed, or upload the original video file directly.</p><AdminUploader /></section>
      <section className="admin-panel"><p className="eyebrow">Client inquiries</p><h2>New conversations</h2><p>Messages submitted from the homepage appear here, newest first.</p><div className="lead-list">{leads.length ? leads.map((lead) => <article className="lead-card" key={lead.id}><div><h3>{lead.firstName} {lead.lastName} · {lead.interest}</h3><p><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <> · <a href={`tel:${lead.phone}`}>{lead.phone}</a></>}</p>{lead.message && <p>{lead.message}</p>}</div><time>{new Date(lead.createdAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}</time></article>) : <p>No inquiries yet. New messages will appear here.</p>}</div></section>
    </div>
  </main>;
}
