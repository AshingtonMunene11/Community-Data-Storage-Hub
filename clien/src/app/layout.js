import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';


export const metadata = {
  title: 'Community Data Hub',
  description: 'Decentralized storage for all',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
