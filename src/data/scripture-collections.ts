export type ScriptureCollection = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
};

export const scriptureCollections: ScriptureCollection[] = [
  {
    slug: "old-testament",
    title: "Old Testament",
    subtitle: "Songs inspired by scripture from the Old Testament.",
    image: "/songs/scripture/old-testament/default.webp",
  },
  {
    slug: "new-testament",
    title: "New Testament",
    subtitle: "Songs inspired by scripture from the New Testament.",
    image: "/songs/scripture/new-testament/default.webp",
  },
  {
    slug: "book-of-mormon",
    title: "Book of Mormon",
    subtitle: "Songs inspired by scripture from the Book of Mormon.",
    image: "/songs/scripture/book-of-mormon/default.webp",
  },
  {
    slug: "doctrine-and-covenants",
    title: "Doctrine & Covenants",
    subtitle: "Songs inspired by modern revelation in the Doctrine and Covenants.",
    image: "/songs/scripture/doctrine-and-covenants/default.webp",
  },
  {
    slug: "pearl-of-great-price",
    title: "Pearl of Great Price",
    subtitle: "Songs inspired by scripture from the Pearl of Great Price.",
    image: "/songs/scripture/pearl-of-great-price/default.webp",
  },
];
