import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      <Link href="/board">
        <a>Board</a>
      </Link>
      <Link href="/messages">
        <a>Messages</a>
      </Link>
    </div>
  );
}
