import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { checkAuth } from "../lib/auth";
import "./globals.css";
import { LogoutButton } from "./LogoutButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = checkAuth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              Social Network
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/marketplace">Marketplace</Link>
              </li>
              {userId == null ? (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              ) : null}
              {userId != null ? (
                <>
                  <li>
                    <Link href="/new-post">New Post</Link>
                  </li>
                  <li>
                    <Link href="/new-marketplace">New Marketplace</Link>
                  </li>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/messages">Message</Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
