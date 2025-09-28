"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Show sidebar only if NOT on home or about pages
  const showSidebar = pathname !== "/" && pathname !== "/about";

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
            <div className="px-6 py-4 text-xl font-bold border-b">Data Hub</div>
            <nav className="flex-1 p-4 space-y-2">
              <a href="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Home
              </a>
              <a
                href="/dashboard"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Dashboard
              </a>
              <a
                href="/uploads"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Uploads
              </a>
              <a
                href="/users"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Log Out
              </a>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}