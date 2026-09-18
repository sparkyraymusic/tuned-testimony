import Link from "next/link";
import styles from "./HymnalBrowser.module.css";

export default function HymnBrowseNav({ active }: { active: "albums" | "hymnal" }) {
  return (
    <nav className={styles.browseNav} aria-label="Browse hymns">
      <Link href="/hymns" aria-current={active === "albums" ? "page" : undefined}>By Album</Link>
      <Link href="/hymns/by-hymnal" aria-current={active === "hymnal" ? "page" : undefined}>By Hymnal</Link>
    </nav>
  );
}
