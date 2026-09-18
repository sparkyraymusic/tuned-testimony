// English-edition numbers verified against the official indexes (September 2026).
// Children's Songbook uses page numbers, including letter suffixes.
export const hymnals = [
  { id: "hymns-1985", title: "1985 Hymn Book", numberLabel: "Hymn", source: "https://www.churchofjesuschrist.org/study/manual/hymns?lang=eng" },
  { id: "childrens-songbook", title: "Children's Songbook", numberLabel: "Page", source: "https://www.churchofjesuschrist.org/study/manual/childrens-songbook?lang=eng" },
  { id: "home-and-church", title: "Hymns for Home and Church", numberLabel: "Hymn", source: "https://www.churchofjesuschrist.org/study/music/hymns-for-home-and-church?lang=eng" },
] as const;

export type HymnalId = (typeof hymnals)[number]["id"];
export type HymnDefinition = { title: string; numbers: Partial<Record<HymnalId, string>> };

// Stable identity shared by every arrangement, including translated and Kids versions.
export const hymnCatalog = {
  "onward-christian-soldiers": {
    "title": "Onward, Christian Soldiers",
    "numbers": {
      "hymns-1985": "246"
    }
  },
  "let-us-all-press-on": {
    "title": "Let Us All Press On",
    "numbers": {
      "hymns-1985": "243"
    }
  },
  "behold-a-royal-army": {
    "title": "Behold! A Royal Army",
    "numbers": {
      "hymns-1985": "251"
    }
  },
  "true-to-the-faith": {
    "title": "True to the Faith",
    "numbers": {
      "hymns-1985": "254"
    }
  },
  "come-along-come-along": {
    "title": "Come Along, Come Along",
    "numbers": {
      "hymns-1985": "244"
    }
  },
  "whos-on-the-lords-side": {
    "title": "Who’s on the Lord’s Side?",
    "numbers": {
      "hymns-1985": "260"
    }
  },
  "called-to-serve": {
    "title": "Called to Serve",
    "numbers": {
      "hymns-1985": "249",
      "childrens-songbook": "174"
    }
  },
  "hope-of-israel": {
    "title": "Hope of Israel",
    "numbers": {
      "hymns-1985": "259"
    }
  },
  "we-are-all-enlisted": {
    "title": "We Are All Enlisted",
    "numbers": {
      "hymns-1985": "250"
    }
  },
  "o-thou-rock-of-our-salvation": {
    "title": "O Thou Rock of Our Salvation",
    "numbers": {
      "hymns-1985": "258"
    }
  },
  "ill-go-where-you-want-me-to-go": {
    "title": "I’ll Go Where You Want Me to Go",
    "numbers": {
      "hymns-1985": "270"
    }
  },
  "put-your-shoulder-to-the-wheel": {
    "title": "Put Your Shoulder to the Wheel",
    "numbers": {
      "hymns-1985": "252"
    }
  },
  "come-thou-fount-of-every-blessing": {
    "title": "Come, Thou Fount of Every Blessing",
    "numbers": {
      "home-and-church": "1001"
    }
  },
  "amazing-grace": {
    "title": "Amazing Grace",
    "numbers": {
      "home-and-church": "1010"
    }
  },
  "my-shepherd-will-supply-my-need": {
    "title": "My Shepherd Will Supply My Need",
    "numbers": {
      "home-and-church": "1014"
    }
  },
  "the-lords-my-shepherd": {
    "title": "The Lord’s My Shepherd",
    "numbers": {
      "home-and-church": "1038"
    }
  },
  "his-eye-is-on-the-sparrow": {
    "title": "His Eye Is on the Sparrow",
    "numbers": {
      "home-and-church": "1005"
    }
  },
  "softly-and-tenderly-jesus-is-calling": {
    "title": "Softly and Tenderly Jesus Is Calling",
    "numbers": {
      "home-and-church": "1020"
    }
  },
  "take-my-heart-and-let-it-be-consecrated": {
    "title": "Take My Heart and Let It Be Consecrated",
    "numbers": {
      "home-and-church": "1025"
    }
  },
  "standing-on-the-promises": {
    "title": "Standing on the Promises",
    "numbers": {
      "home-and-church": "1023"
    }
  },
  "it-is-well-with-my-soul": {
    "title": "It Is Well with My Soul",
    "numbers": {
      "home-and-church": "1003"
    }
  },
  "this-little-light-of-mine": {
    "title": "This Little Light of Mine",
    "numbers": {
      "home-and-church": "1028"
    }
  },
  "his-voice-as-the-sound": {
    "title": "His Voice as the Sound",
    "numbers": {
      "home-and-church": "1040"
    }
  },
  "nearer-my-god-to-thee": {
    "title": "Nearer, My God, to Thee",
    "numbers": {
      "hymns-1985": "100"
    }
  },
  "precious-savior-dear-redeemer": {
    "title": "Precious Savior, Dear Redeemer",
    "numbers": {
      "hymns-1985": "103"
    }
  },
  "jesus-the-very-thought-of-thee": {
    "title": "Jesus, the Very Thought of Thee",
    "numbers": {
      "hymns-1985": "141"
    }
  },
  "jesus-lover-of-my-soul": {
    "title": "Jesus, Lover of My Soul",
    "numbers": {
      "hymns-1985": "102"
    }
  },
  "come-unto-jesus": {
    "title": "Come unto Jesus",
    "numbers": {
      "hymns-1985": "117"
    }
  },
  "come-follow-me": {
    "title": "Come, Follow Me",
    "numbers": {
      "hymns-1985": "116"
    }
  },
  "come-we-that-love-the-lord": {
    "title": "Come, We That Love the Lord",
    "numbers": {
      "hymns-1985": "119"
    }
  },
  "be-still-my-soul": {
    "title": "Be Still, My Soul",
    "numbers": {
      "hymns-1985": "124"
    }
  },
  "the-lord-my-pasture-will-prepare": {
    "title": "The Lord My Pasture Will Prepare",
    "numbers": {
      "hymns-1985": "109"
    }
  },
  "ye-simple-souls-who-stray": {
    "title": "Ye Simple Souls Who Stray",
    "numbers": {
      "hymns-1985": "118"
    }
  },
  "how-long-o-lord-most-holy-and-true": {
    "title": "How Long, O Lord Most Holy and True",
    "numbers": {
      "hymns-1985": "126"
    }
  },
  "i-know-that-my-redeemer-lives": {
    "title": "I Know That My Redeemer Lives",
    "numbers": {
      "hymns-1985": "136"
    }
  },
  "choose-the-right": {
    "title": "Choose the Right",
    "numbers": {
      "hymns-1985": "239"
    }
  },
  "love-at-home": {
    "title": "Love at Home",
    "numbers": {
      "hymns-1985": "294"
    }
  },
  "have-i-done-any-good": {
    "title": "Have I Done Any Good?",
    "numbers": {
      "hymns-1985": "223"
    }
  },
  "the-iron-rod": {
    "title": "The Iron Rod",
    "numbers": {
      "hymns-1985": "274"
    }
  },
  "count-your-blessings": {
    "title": "Count Your Blessings",
    "numbers": {
      "hymns-1985": "241"
    }
  },
  "should-you-feel-inclined-to-censure": {
    "title": "Should You Feel Inclined to Censure",
    "numbers": {
      "hymns-1985": "235"
    }
  },
  "let-us-oft-speak-kind-words": {
    "title": "Let Us Oft Speak Kind Words",
    "numbers": {
      "hymns-1985": "232"
    }
  },
  "oh-say-what-is-truth": {
    "title": "Oh Say, What Is Truth?",
    "numbers": {
      "hymns-1985": "272"
    }
  },
  "oh-holy-words-of-truth-and-love": {
    "title": "Oh, Holy Words of Truth and Love",
    "numbers": {
      "hymns-1985": "271"
    }
  },
  "dare-to-do-right": {
    "title": "Dare to Do Right",
    "numbers": {
      "childrens-songbook": "158"
    }
  },
  "nay-speak-no-ill": {
    "title": "Nay, Speak No Ill",
    "numbers": {
      "hymns-1985": "233"
    }
  },
  "do-what-is-right": {
    "title": "Do What Is Right",
    "numbers": {
      "hymns-1985": "237"
    }
  },
  "jesus-wants-me-for-a-sunbeam": {
    "title": "Jesus Wants Me for a Sunbeam",
    "numbers": {
      "childrens-songbook": "60"
    }
  },
  "can-a-little-child-like-me": {
    "title": "Can a Little Child like Me?",
    "numbers": {
      "childrens-songbook": "9"
    }
  },
  "tell-me-the-stories-of-jesus": {
    "title": "Tell Me the Stories of Jesus",
    "numbers": {
      "childrens-songbook": "57"
    }
  },
  "all-things-bright-and-beautiful": {
    "title": "All Things Bright and Beautiful",
    "numbers": {
      "childrens-songbook": "231"
    }
  },
  "if-with-all-your-hearts": {
    "title": "If with All Your Hearts",
    "numbers": {
      "childrens-songbook": "15"
    }
  },
  "jesus-once-was-a-little-child": {
    "title": "Jesus Once Was a Little Child",
    "numbers": {
      "childrens-songbook": "55"
    }
  },
  "beauty-everywhere": {
    "title": "Beauty Everywhere",
    "numbers": {
      "childrens-songbook": "232"
    }
  },
  "thanks-to-our-father": {
    "title": "Thanks to Our Father",
    "numbers": {
      "childrens-songbook": "20b"
    }
  },
  "the-wise-man-and-the-foolish-man": {
    "title": "The Wise Man and the Foolish Man",
    "numbers": {
      "childrens-songbook": "281"
    }
  },
  "tell-me-dear-lord": {
    "title": "Tell Me, Dear Lord",
    "numbers": {
      "childrens-songbook": "176"
    }
  },
  "shine-on": {
    "title": "Shine On",
    "numbers": {
      "childrens-songbook": "144"
    }
  },
  "i-think-when-i-read-that-sweet-story": {
    "title": "I Think When I Read That Sweet Story",
    "numbers": {
      "childrens-songbook": "56"
    }
  },
  "stand-for-the-right": {
    "title": "Stand for the Right",
    "numbers": {
      "childrens-songbook": "159"
    }
  },
  "thank-thee-father": {
    "title": "Thank Thee, Father",
    "numbers": {
      "childrens-songbook": "24"
    }
  },
  "heavenly-father-now-i-pray": {
    "title": "Heavenly Father, Now I Pray",
    "numbers": {
      "childrens-songbook": "19"
    }
  },
  "lift-up-your-voice-and-sing": {
    "title": "Lift Up Your Voice and Sing",
    "numbers": {
      "childrens-songbook": "252"
    }
  },
  "the-dearest-names": {
    "title": "The Dearest Names",
    "numbers": {
      "childrens-songbook": "208"
    }
  },
  "saturday": {
    "title": "Saturday",
    "numbers": {
      "childrens-songbook": "196"
    }
  },
  "joseph-smiths-first-prayer": {
    "title": "Joseph Smith’s First Prayer",
    "numbers": {
      "hymns-1985": "26"
    }
  },
  "we-thank-thee-o-god-for-a-prophet": {
    "title": "We Thank Thee, O God, for a Prophet",
    "numbers": {
      "hymns-1985": "19"
    }
  },
  "come-ye-children-of-the-lord": {
    "title": "Come, Ye Children of the Lord",
    "numbers": {
      "hymns-1985": "58"
    }
  },
  "a-poor-wayfaring-man-of-grief": {
    "title": "A Poor Wayfaring Man of Grief",
    "numbers": {
      "hymns-1985": "29"
    }
  },
  "praise-to-the-man": {
    "title": "Praise to the Man",
    "numbers": {
      "hymns-1985": "27"
    }
  },
  "battle-hymn-of-the-republic": {
    "title": "Battle Hymn of the Republic",
    "numbers": {
      "hymns-1985": "60"
    }
  },
  "now-let-us-rejoice": {
    "title": "Now Let Us Rejoice",
    "numbers": {
      "hymns-1985": "3"
    }
  },
  "come-come-ye-saints": {
    "title": "Come, Come, Ye Saints",
    "numbers": {
      "hymns-1985": "30"
    }
  },
  "high-on-the-mountain-top": {
    "title": "High on the Mountain Top",
    "numbers": {
      "hymns-1985": "5"
    }
  },
  "lead-kindly-light": {
    "title": "Lead, Kindly Light",
    "numbers": {
      "hymns-1985": "97"
    }
  },
  "guide-us-o-thou-great-jehovah": {
    "title": "Guide Us, O Thou Great Jehovah",
    "numbers": {
      "hymns-1985": "83"
    }
  },
  "o-my-father": {
    "title": "O My Father",
    "numbers": {
      "hymns-1985": "292"
    }
  },
  "i-stand-all-amazed": {
    "title": "I Stand All Amazed",
    "numbers": {
      "hymns-1985": "193"
    }
  },
  "the-lord-is-my-light": {
    "title": "The Lord Is My Light",
    "numbers": {
      "hymns-1985": "89"
    }
  },
  "i-need-thee-every-hour": {
    "title": "I Need Thee Every Hour",
    "numbers": {
      "hymns-1985": "98"
    }
  },
  "jesus-once-of-humble-birth": {
    "title": "Jesus, Once of Humble Birth",
    "numbers": {
      "hymns-1985": "196"
    }
  }
} satisfies Record<string, HymnDefinition>;

export type HymnId = keyof typeof hymnCatalog;
