import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function Header() {
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem'}}>
      <Link href="/">{SITE.name}</Link>
      <nav style={{display:'flex',gap:'1rem'}}>
        <Link href="/feed">Feed</Link>
        <Link href="/reels">Reels</Link>
        <Link href="/daily-prompts">Prompts</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}