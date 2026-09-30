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
  // 1985 Hymn Book
  "the-morning-breaks": {
    "title": "The Morning Breaks",
    "numbers": {
      "hymns-1985": "1"
    }
  },
  "the-spirit-of-god": {
    "title": "The Spirit of God",
    "numbers": {
      "hymns-1985": "2"
    }
  },
  "now-let-us-rejoice": {
    "title": "Now Let Us Rejoice",
    "numbers": {
      "hymns-1985": "3"
    }
  },
  "truth-eternal": {
    "title": "Truth Eternal",
    "numbers": {
      "hymns-1985": "4"
    }
  },
  "high-on-the-mountain-top": {
    "title": "High on the Mountain Top",
    "numbers": {
      "hymns-1985": "5"
    }
  },
  "redeemer-of-israel": {
    "title": "Redeemer of Israel",
    "numbers": {
      "hymns-1985": "6"
    }
  },
  "israel-israel-god-is-calling": {
    "title": "Israel, Israel, God is Calling",
    "numbers": {
      "hymns-1985": "7"
    }
  },
  "come-sing-to-the-lord": {
    "title": "Come, Sing to the Lord",
    "numbers": {
      "hymns-1985": "10"
    }
  },
  "what-was-witnessed-in-the-heavens": {
    "title": "What Was Witnessed in the Heavens?",
    "numbers": {
      "hymns-1985": "11"
    }
  },
  "an-angel-from-on-high": {
    "title": "An Angel from On High",
    "numbers": {
      "hymns-1985": "13"
    }
  },
  "we-thank-thee-o-god-for-a-prophet": {
    "title": "We Thank Thee, O God, for a Prophet",
    "numbers": {
      "hymns-1985": "19"
    }
  },
  "joseph-smiths-first-prayer": {
    "title": "Joseph Smith’s First Prayer",
    "numbers": {
      "hymns-1985": "26"
    }
  },
  "praise-to-the-man": {
    "title": "Praise to the Man",
    "numbers": {
      "hymns-1985": "27"
    }
  },
  "a-poor-wayfaring-man-of-grief": {
    "title": "A Poor Wayfaring Man of Grief",
    "numbers": {
      "hymns-1985": "29"
    }
  },
  "come-come-ye-saints": {
    "title": "Come, Come, Ye Saints",
    "numbers": {
      "hymns-1985": "30"
    }
  },
  "come-ye-children-of-the-lord": {
    "title": "Come, Ye Children of the Lord",
    "numbers": {
      "hymns-1985": "58"
    }
  },
  "battle-hymn-of-the-republic": {
    "title": "Battle Hymn of the Republic",
    "numbers": {
      "hymns-1985": "60"
    }
  },
  "guide-us-o-thou-great-jehovah": {
    "title": "Guide Us, O Thou Great Jehovah",
    "numbers": {
      "hymns-1985": "83"
    }
  },
  "the-lord-is-my-light": {
    "title": "The Lord Is My Light",
    "numbers": {
      "hymns-1985": "89"
    }
  },
  "lead-kindly-light": {
    "title": "Lead, Kindly Light",
    "numbers": {
      "hymns-1985": "97"
    }
  },
  "i-need-thee-every-hour": {
    "title": "I Need Thee Every Hour",
    "numbers": {
      "hymns-1985": "98"
    }
  },
  "nearer-my-god-to-thee": {
    "title": "Nearer, My God, to Thee",
    "numbers": {
      "hymns-1985": "100"
    }
  },
  "jesus-lover-of-my-soul": {
    "title": "Jesus, Lover of My Soul",
    "numbers": {
      "hymns-1985": "102"
    }
  },
  "precious-savior-dear-redeemer": {
    "title": "Precious Savior, Dear Redeemer",
    "numbers": {
      "hymns-1985": "103"
    }
  },
  "the-lord-my-pasture-will-prepare": {
    "title": "The Lord My Pasture Will Prepare",
    "numbers": {
      "hymns-1985": "109"
    }
  },
  "come-follow-me": {
    "title": "Come, Follow Me",
    "numbers": {
      "hymns-1985": "116"
    }
  },
  "come-unto-jesus": {
    "title": "Come unto Jesus",
    "numbers": {
      "hymns-1985": "117"
    }
  },
  "ye-simple-souls-who-stray": {
    "title": "Ye Simple Souls Who Stray",
    "numbers": {
      "hymns-1985": "118"
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
  "jesus-the-very-thought-of-thee": {
    "title": "Jesus, the Very Thought of Thee",
    "numbers": {
      "hymns-1985": "141"
    }
  },
  "i-stand-all-amazed": {
    "title": "I Stand All Amazed",
    "numbers": {
      "hymns-1985": "193"
    }
  },
  "jesus-once-of-humble-birth": {
    "title": "Jesus, Once of Humble Birth",
    "numbers": {
      "hymns-1985": "196"
    }
  },
  "have-i-done-any-good": {
    "title": "Have I Done Any Good?",
    "numbers": {
      "hymns-1985": "223"
    }
  },
  "let-us-oft-speak-kind-words": {
    "title": "Let Us Oft Speak Kind Words",
    "numbers": {
      "hymns-1985": "232"
    }
  },
  "nay-speak-no-ill": {
    "title": "Nay, Speak No Ill",
    "numbers": {
      "hymns-1985": "233"
    }
  },
  "should-you-feel-inclined-to-censure": {
    "title": "Should You Feel Inclined to Censure",
    "numbers": {
      "hymns-1985": "235"
    }
  },
  "do-what-is-right": {
    "title": "Do What Is Right",
    "numbers": {
      "hymns-1985": "237"
    }
  },
  "choose-the-right": {
    "title": "Choose the Right",
    "numbers": {
      "hymns-1985": "239"
    }
  },
  "count-your-blessings": {
    "title": "Count Your Blessings",
    "numbers": {
      "hymns-1985": "241"
    }
  },
  "let-us-all-press-on": {
    "title": "Let Us All Press On",
    "numbers": {
      "hymns-1985": "243"
    }
  },
  "come-along-come-along": {
    "title": "Come Along, Come Along",
    "numbers": {
      "hymns-1985": "244"
    }
  },
  "onward-christian-soldiers": {
    "title": "Onward, Christian Soldiers",
    "numbers": {
      "hymns-1985": "246"
    }
  },
  "called-to-serve": {
    "title": "Called to Serve",
    "numbers": {
      "hymns-1985": "249",
      "childrens-songbook": "174"
    }
  },
  "we-are-all-enlisted": {
    "title": "We Are All Enlisted",
    "numbers": {
      "hymns-1985": "250"
    }
  },
  "behold-a-royal-army": {
    "title": "Behold! A Royal Army",
    "numbers": {
      "hymns-1985": "251"
    }
  },
  "put-your-shoulder-to-the-wheel": {
    "title": "Put Your Shoulder to the Wheel",
    "numbers": {
      "hymns-1985": "252"
    }
  },
  "true-to-the-faith": {
    "title": "True to the Faith",
    "numbers": {
      "hymns-1985": "254"
    }
  },
  "o-thou-rock-of-our-salvation": {
    "title": "O Thou Rock of Our Salvation",
    "numbers": {
      "hymns-1985": "258"
    }
  },
  "hope-of-israel": {
    "title": "Hope of Israel",
    "numbers": {
      "hymns-1985": "259"
    }
  },
  "whos-on-the-lords-side": {
    "title": "Who’s on the Lord’s Side?",
    "numbers": {
      "hymns-1985": "260"
    }
  },
  "ill-go-where-you-want-me-to-go": {
    "title": "I’ll Go Where You Want Me to Go",
    "numbers": {
      "hymns-1985": "270"
    }
  },
  "oh-holy-words-of-truth-and-love": {
    "title": "Oh, Holy Words of Truth and Love",
    "numbers": {
      "hymns-1985": "271"
    }
  },
  "oh-say-what-is-truth": {
    "title": "Oh Say, What Is Truth?",
    "numbers": {
      "hymns-1985": "272"
    }
  },
  "the-iron-rod": {
    "title": "The Iron Rod",
    "numbers": {
      "hymns-1985": "274"
    }
  },
  "o-my-father": {
    "title": "O My Father",
    "numbers": {
      "hymns-1985": "292"
    }
  },
  "love-at-home": {
    "title": "Love at Home",
    "numbers": {
      "hymns-1985": "294"
    }
  },

  // Children's Songbook
  "can-a-little-child-like-me": {
    "title": "Can a Little Child like Me?",
    "numbers": {
      "childrens-songbook": "9"
    }
  },
  "if-with-all-your-hearts": {
    "title": "If with All Your Hearts",
    "numbers": {
      "childrens-songbook": "15"
    }
  },
  "heavenly-father-now-i-pray": {
    "title": "Heavenly Father, Now I Pray",
    "numbers": {
      "childrens-songbook": "19"
    }
  },
  "thanks-to-our-father": {
    "title": "Thanks to Our Father",
    "numbers": {
      "childrens-songbook": "20b"
    }
  },
  "thank-thee-father": {
    "title": "Thank Thee, Father",
    "numbers": {
      "childrens-songbook": "24"
    }
  },
  "jesus-once-was-a-little-child": {
    "title": "Jesus Once Was a Little Child",
    "numbers": {
      "childrens-songbook": "55"
    }
  },
  "i-think-when-i-read-that-sweet-story": {
    "title": "I Think When I Read That Sweet Story",
    "numbers": {
      "childrens-songbook": "56"
    }
  },
  "tell-me-the-stories-of-jesus": {
    "title": "Tell Me the Stories of Jesus",
    "numbers": {
      "childrens-songbook": "57"
    }
  },
  "jesus-wants-me-for-a-sunbeam": {
    "title": "Jesus Wants Me for a Sunbeam",
    "numbers": {
      "childrens-songbook": "60"
    }
  },
  "shine-on": {
    "title": "Shine On",
    "numbers": {
      "childrens-songbook": "144"
    }
  },
  "dare-to-do-right": {
    "title": "Dare to Do Right",
    "numbers": {
      "childrens-songbook": "158"
    }
  },
  "stand-for-the-right": {
    "title": "Stand for the Right",
    "numbers": {
      "childrens-songbook": "159"
    }
  },
  "tell-me-dear-lord": {
    "title": "Tell Me, Dear Lord",
    "numbers": {
      "childrens-songbook": "176"
    }
  },
  "saturday": {
    "title": "Saturday",
    "numbers": {
      "childrens-songbook": "196"
    }
  },
  "the-dearest-names": {
    "title": "The Dearest Names",
    "numbers": {
      "childrens-songbook": "208"
    }
  },
  "all-things-bright-and-beautiful": {
    "title": "All Things Bright and Beautiful",
    "numbers": {
      "childrens-songbook": "231"
    }
  },
  "beauty-everywhere": {
    "title": "Beauty Everywhere",
    "numbers": {
      "childrens-songbook": "232"
    }
  },
  "lift-up-your-voice-and-sing": {
    "title": "Lift Up Your Voice and Sing",
    "numbers": {
      "childrens-songbook": "252"
    }
  },
  "the-wise-man-and-the-foolish-man": {
    "title": "The Wise Man and the Foolish Man",
    "numbers": {
      "childrens-songbook": "281"
    }
  },

  // Hymns for Home and Church
  "come-thou-fount-of-every-blessing": {
    "title": "Come, Thou Fount of Every Blessing",
    "numbers": {
      "home-and-church": "1001"
    }
  },
  "it-is-well-with-my-soul": {
    "title": "It Is Well with My Soul",
    "numbers": {
      "home-and-church": "1003"
    }
  },
  "his-eye-is-on-the-sparrow": {
    "title": "His Eye Is on the Sparrow",
    "numbers": {
      "home-and-church": "1005"
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
  "softly-and-tenderly-jesus-is-calling": {
    "title": "Softly and Tenderly Jesus Is Calling",
    "numbers": {
      "home-and-church": "1020"
    }
  },
  "standing-on-the-promises": {
    "title": "Standing on the Promises",
    "numbers": {
      "home-and-church": "1023"
    }
  },
  "take-my-heart-and-let-it-be-consecrated": {
    "title": "Take My Heart and Let It Be Consecrated",
    "numbers": {
      "home-and-church": "1025"
    }
  },
  "this-little-light-of-mine": {
    "title": "This Little Light of Mine",
    "numbers": {
      "home-and-church": "1028"
    }
  },
  "the-lords-my-shepherd": {
    "title": "The Lord’s My Shepherd",
    "numbers": {
      "home-and-church": "1038"
    }
  },
  "his-voice-as-the-sound": {
    "title": "His Voice as the Sound",
    "numbers": {
      "home-and-church": "1040"
    }
  }
} satisfies Record<string, HymnDefinition>;

export type HymnId = keyof typeof hymnCatalog;
