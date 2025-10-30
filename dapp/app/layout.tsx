import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectsProvider } from "./context/ProjectsProvider";
import { ConnectionProvider } from "./context/ConnectionProvider";
import Navbar from "./components/navbar/Navbar";
import Shader from "./components/ui/shader/Shader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenHouse🌳",
  description: "Simulated Market Place of Voluntary Carbon Credits of verified Projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
        className={`${geistSans.variable} ${geistMono.variable} font-outline antialiased`}
      >
        <ProjectsProvider>
          <ConnectionProvider>
            <Navbar />
            <Shader/>
            {children}
          </ConnectionProvider>
        </ProjectsProvider>

      </body>
    </html>
  );
}
