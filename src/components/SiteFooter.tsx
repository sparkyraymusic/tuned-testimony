import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import styles from "./SiteFooter.module.css";

const socialLinks = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@TunedTestimony",
    icon: FaYoutube,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tunedtestimony/",
    icon: FaInstagram,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@tunedtestimony",
    icon: FaTiktok,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61590150252230",
    icon: FaFacebook,
  },
  {
    name: "X",
    url: "https://x.com/tunedtestimony",
    icon: FaXTwitter,
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link href="/" aria-label="Tuned Testimony home" className={styles.brand}><Image src="/brand/mark.png" alt="" width={36} height={26} /><span>Tuned Testimony</span></Link>
      <p>© 2026 Tuned Testimony</p>

      <div className={styles.socialLinks}>
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              key={social.name}
            >
              <Icon />
            </a>
          );
        })}
      </div>

      <p>Cherished Words. Fresh Take.</p>
    </footer>
  );
}
