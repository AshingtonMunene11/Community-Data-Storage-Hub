"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { AppProvider, useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


function LogoutButton() {
  const { logout, user } = useAppContext();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <LogoutButton />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
