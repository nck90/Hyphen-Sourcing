import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Hyphensosing | 대학생 아이디어 공모전 플랫폼",
  description: "예비창업가와 창업가의 아이디어를 대학생들이 실현하는 온/오프라인 해커톤 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-800 selection:bg-primary/20 selection:text-primary">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
