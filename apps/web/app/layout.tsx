import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "@workspace/ui/styles/globals.css";
import { ORPCReactProvider } from "@/utils/orpc/client";
import { Toaster } from "@workspace/ui/components/sonner";

const defaultUrl = "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen flex flex-col">
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ORPCReactProvider>
            <main className="flex-1">
              <div className="h-screen flex flex-col items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                      <Link href={"/"}>acemate interview challenge</Link>
                    </div>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </nav>
                <div className="flex-1 w-full flex flex-col items-center p-5">{children}</div>
                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
                  <p>
                    <a
                      href="https://acemate.ai"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      acemate
                    </a>
                  </p>
                  <ThemeSwitcher />
                </footer>
              </div>
            </main>
          </ORPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
