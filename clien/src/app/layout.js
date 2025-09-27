import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { AppProvider } from '@/context/AppContext'; // Adjust path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Community Data Storage Hub</title>
      </head>
      <body className="bg-background text-foreground font-sans">
        <AppProvider>
          <div className="page-wrapper">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}