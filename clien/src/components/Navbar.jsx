import Link from 'next/link';

export default function Navbar() {
  return (
    <nav >
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/login">Get Started</Link>
    </nav>
  );
}