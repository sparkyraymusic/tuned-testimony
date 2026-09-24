import Link from "next/link";
import styles from "./HymnalBrowser.module.css";

export default function HymnBrowseNav({ active }: { active: "songs" | "albums" | "hymnal" }) {
  return (
    <nav className={styles.browseNav} aria-label="Browse hymns">
      <Link href="/hymns" aria-current={active === "songs" ? "page" : undefined}>Songs</Link>
      <Link href="/hymns/by-hymnal" aria-current={active === "hymnal" ? "page" : undefined}>By Hymnal</Link>
      <Link href="/hymns/albums" aria-current={active === "albums" ? "page" : undefined}>Albums</Link>
    </nav>
  );
}
