import Image from "next/image";
import Link from "next/link";

import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        <Image src="/brand/mark.png" width={44} height={32} alt="" className={styles.mark} />
        <span>Tuned Testimony</span>
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/#featured">Featured</Link>
        <Link href="/#music">Collections</Link>
        <Link href="/#listen">Listen</Link>
      </nav>
    </header>
  );
}
