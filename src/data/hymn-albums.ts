type StreamingLink = {
  name: string;
  url: string;
};

type HymnTrack = {
  title: string;
  style: string;
  songSlug?: string;
};

type HymnAlbum = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  links: StreamingLink[];
  tracks: HymnTrack[];
};

export const hymnAlbums: HymnAlbum[] = [
	{
		slug: "josephs-vision",
		title: "Joseph's Vision",
		subtitle: "Hymns celebrating Joseph Smith and the Restoration",
		image: "/albums/josephs-vision.png",
		links: [
			{ name: "Spotify", url: "https://open.spotify.com/album/61SUeXDxeyO4lokvcE3Ggv", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/josephs-vision-ep/1808667843?uo=4", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_kf4Dy7tMwboA_Vau3Ik1TrA_kBASw0KcY&si=jqDZmTFK_OzUEOd4", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0F4XM3F5L?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_kHHpNnjHmCdq8xP6FyGTzIrvg", }
		],
		tracks: [
			{ title: "Joseph Smith's First Prayer", style: "Pop", songSlug: "josephs-first-prayer-pop", },
			{ title: "We Thank Thee, O God, for a Prophet", style: "Pop", songSlug: "we-thank-thee-o-god-for-a-prophet-pop", },
			{ title: "Come, Ye Children of the Lord", style: "Pop", songSlug: "come-ye-children-of-the-lord-pop", },
			{ title: "A Poor Wayfaring Man of Grief", style: "Pop/Rock", songSlug: "a-poor-wayfaring-man-of-grief-pop-rock", },
			{ title: "Praise To The Man", style: "Pop/Rock", songSlug: "praise-to-the-man-pop-rock", },
			{ title: "Battle Hymn of the Republic", style: "Rock", songSlug: "battle-hymn-of-the-republic-rock", },
		],
	},
	{
		slug: "goodly",
		title: "Goodly",
		subtitle: "Hymns of good, righteous living",
		image: "/albums/goodly.png",
		links: [
			{ name: "Spotify", url: "https://open.spotify.com/album/4T4rzzi6Pf9naxK09dtVf7", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/goodly/1806334479?uo=4", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_keRyuoise21GO4e885AmwTgfMnQ3S-uKM&si=KDhq9S5jVPWlyyUI", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0F3J3C2FH?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_Udox6gpGsM7dDSGWdUY9UOMjD", },
			{ name: "Tidal", url: "https://tidal.com/album/427916339/u", },
		],
		tracks: [
			{ title: "Choose the Right", style: "Pop", songSlug: "choose-the-right-pop", },
			{ title: "Love at Home", style: "Country", songSlug: "love-at-home-country", },
			{ title: "Have I Done Any Good?", style: "Ballad", songSlug: "have-i-done-any-good-ballad", },
			{ title: "The Iron Rod", style: "Country", songSlug: "the-iron-rod-country", },
			{ title: "Count Your Blessings", style: "Pop", songSlug: "count-your-blessings-pop", },
			{ title: "Should You Feel Inclined to Censure", style: "Island", songSlug: "should-you-feel-inclined-to-censure-island", },
			{ title: "Let Us Oft Speak Kind Words", style: "Country", songSlug: "let-us-oft-speak-kind-words-country", },
			{ title: "Oh Say, What Is Truth?", style: "Pop", songSlug: "oh-say-what-is-truth-pop", },
			{ title: "Oh, Holy Words of Truth and Love", style: "Ballad", songSlug: "oh-holy-words-of-truth-and-love-ballad", },
			{ title: "Dare to Do Right", style: "Pop", songSlug: "dare-to-do-right-pop", },
			{ title: "Nay, Speak No Ill", style: "Country", songSlug: "nay-speak-no-ill-country", },
			{ title: "Do What Is Right", style: "Pop", songSlug: "do-what-is-right-pop", },
		],
	},
  {
    slug: "primary-days",
    title: "Primary Days",
    subtitle: "Timeless songs. Eternal truths.",
    image: "/albums/primary-days.png",
		links: [
			{ name: "YouTube Lyric Videos", url: "https://www.youtube.com/playlist?list=PLHfoT_AcfQVg", },
			{ name: "Spotify", url: "https://open.spotify.com/album/5PUQtHwAmD4tIW2FV6Eg6x", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/childrens-songbook-reimagined/1805332998?uo=4", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_klAc1m__k3In_57hTSv1kwQBNHJ5SWOt8", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0F2YZ86RT?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_kBFwtWiEaouQniz1UidRdh4hG", },
			{ name: "Tidal", url: "https://tidal.com/album/427023075/u", },
		],
		tracks: [
			{ title: "Jesus Wants Me For A Sunbeam", style: "Country", songSlug: "jesus-wants-me-for-a-sunbeam" },
			{ title: "Can A Little Child Like Me?", style: "Ballad", songSlug: "can-a-little-child-like-me" },
			{ title: "Tell Me The Stories Of Jesus", style: "Island", songSlug: "tell-me-the-stories-of-jesus" },
			{ title: "All Things Bright and Beautiful", style: "Pop", songSlug: "all-things-bright-and-beautiful" },
			{ title: "If With All Your Hearts", style: "Celtic", songSlug: "if-with-all-your-hearts" },
			{ title: "Jesus Once Was A Little Child", style: "Rock", songSlug: "jesus-once-was-a-little-child" },
			{ title: "Beauty Everywhere", style: "Acapella", songSlug: "beauty-everywhere" },
			{ title: "Thanks to Our Father", style: "Country", songSlug: "thanks-to-our-father" },
			{ title: "The Wise Man and the Foolish Man", style: "Pop", songSlug: "the-wise-man-and-the-foolish-man" },
			{ title: "Tell Me, Dear Lord", style: "Ballad", songSlug: "tell-me-dear-lord" },
			{ title: "Shine On", style: "Pop", songSlug: "shine-on" },
			{ title: "I Think When I Read That Sweet Story", style: "Island", songSlug: "i-think-when-i-read-that-sweet-story" },
			{ title: "Stand For The Right", style: "Country", songSlug: "stand-for-the-right" },
			{ title: "Thank Thee, Father", style: "Acapella", songSlug: "thank-thee-father" },
			{ title: "Dare To Do Right", style: "Rock", songSlug: "dare-to-do-right" },
			{ title: "Heavenly Father, Now I Pray", style: "Ballad", songSlug: "heavenly-father-now-i-pray" },
			{ title: "Lift Up Your Voice And Sing", style: "Country", songSlug: "lift-up-your-voice-and-sing" },
			{ title: "The Dearest Names", style: "Celtic", songSlug: "the-dearest-names" },
			{ title: "Saturday", style: "Pop", songSlug: "saturday" },
		],
  },
	{
		slug: "ever-near",
		title: "Ever Near",
		subtitle: "Hymns of faith, peace & trust in our Savior",
		image: "/albums/ever-near.png",
		links: [
			{ name: "Spotify", url: "https://open.spotify.com/album/7E02uOPavm4CUnNvO0ekon", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/ever-near/1820876435?uo=4", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_lfgvw4SnqWNmw6PkwoM5nzLnpi0epIzmA&si=k7s7hc_Ka1kInvrM", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0FD9XJX7J?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_gUPuskVmJJn0P0X9RDaMoT9hk", },
			{ name: "Tidal", url: "https://tidal.com/album/442347891/u", },
		],
		tracks: [
			{ title: "Nearer, My God, To Thee", style: "Piano Ballad", songSlug: "nearer-my-god-to-thee-piano-ballad", },
			{ title: "Jesus, the Very Thought of Thee", style: "Pop/Rock", songSlug: "jesus-the-very-thought-of-thee", },
			{ title: "Jesus, Lover of My Soul", style: "Celtic Pop", songSlug: "jesus-lover-of-my-soul", },
			{ title: "Precious Savior, Dear Redeemer", style: "Pop", songSlug: "precious-savior-dear-redeemer", },
			{ title: "Come unto Jesus", style: "Rock", songSlug: "come-unto-jesus", },
			{ title: "Come, Follow Me", style: "Jazz Pop", songSlug: "come-follow-me", },
			{ title: "Come, We That Love the Lord", style: "Country", songSlug: "come-we-that-love-the-lord", },
			{ title: "Be Still, My Soul", style: "Pop", songSlug: "be-still-my-soul", },
			{ title: "The Lord My Pasture Will Prepare", style: "Ballad", songSlug: "the-lord-my-pasture-will-prepare", },
			{ title: "Ye Simple Souls Who Stray", style: "Yacht Rock", songSlug: "ye-simple-souls-who-stray", },
			{ title: "How Long, O Lord Most Holy and True", style: "Gospel Pop", songSlug: "how-long-o-lord-most-holy-and-true", },
			{ title: "I Know That My Redeemer Lives", style: "Surf Rock", songSlug: "i-know-that-my-redeemer-lives", },
		],
	},
  {
    slug: "a-royal-army",
    title: "A Royal Army",
    subtitle: "Songs of faith and service",
    image: "/albums/a-royal-army.png",
		links: [
			{ name: "Spotify", url: "https://open.spotify.com/album/6dLIBhdQvfLIzCyydFYfsZ?si=f6ilDUKYSfGRkGD0p6DVVg", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/a-royal-army/1805825127", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_nMsSxwLsoZrnFf7-zQLLV4pLObdk3bLFo&si=g6_dEXwlNIkg5uit", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0F384Z37S?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_Nt4hbcsZ3llWPxxengCJMUVI5", },
		],
		tracks: [
			{ title: "Onward, Christian Soldiers", style: "Pop/Rock", songSlug: "onward-christian-soldiers" },
			{ title: "Let Us All Press On", style: "Pop", songSlug: "let-us-all-press-on" },
			{ title: "Behold! A Royal Army", style: "Country", songSlug: "behold-a-royal-army" },
			{ title: "True to the Faith", style: "Pop/Rock", songSlug: "true-to-the-faith" },
			{ title: "Come Along, Come Along", style: "Country", songSlug: "true-to-the-faith" },
			{ title: "Who’s On The Lord’s Side?", style: "Pop", songSlug: "whos-on-the-lords-side" },
			{ title: "Called To Serve", style: "Pop", songSlug: "called-to-serve" },
			{ title: "Hope Of Israel", style: "Celtic", songSlug: "hope-of-israel" },
			{ title: "We Are All Enlisted", style: "Rock", songSlug: "we-are-all-enlisted" },
			{ title: "O Thou Rock Of Our Salvation", style: "Pop", songSlug: "o-thou-rock-of-our-salvation" },
			{ title: "I’ll Go Where You Want Me To Go", style: "Country", songSlug: "ill-go-where-you-want-me-to-go" },
			{ title: "Put Your Shoulder To The Wheel", style: "Pop", songSlug: "put-your-shoulder-to-the-wheel" },
		],
  },
	{
		slug: "boundless-grace",
		title: "Boundless Grace",
		subtitle: "Hymns of grace, trust, and devotion",
		image: "/albums/boundless-grace.png",
		links: [
			{ name: "Spotify", url: "https://open.spotify.com/album/3yZH1s9wJXYcnNjyB2h5Re?si=WcOnpR7mQ6eXzN6eI8vgXA", },
			{ name: "Apple Music", url: "https://music.apple.com/us/album/boundless-grace/1876124846", },
			{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_kqKAzRp1Wf6oa_v0_DunlDvjC2GvAbGI0&si=mbKMeDaOn3bSJ2IX", },
			{ name: "Amazon Music", url: "https://music.amazon.com/albums/B0GMGZYF3G?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_mP8Yambw9GB4A0CKeN8fIvg3S", },
			{ name: "Tidal", url: "https://tidal.com/album/497402850/u", },
		],
		tracks: [
			{ title: "Come, Thou Fount of Every Blessing", style: "Pop/Country", songSlug: "come-thou-fount-of-every-blessing" },
			{ title: "Amazing Grace", style: "Classic Rock", songSlug: "amazing-grace" },
			{ title: "My Shepherd Will Supply My Need", style: "80's Ballad", songSlug: "my-shepherd-will-supply-my-need" },
			{ title: "The Lord’s My Shepherd", style: "Country Ballad", songSlug: "the-lords-my-shepherd" },
			{ title: "His Eye Is on the Sparrow", style: "Pop/Country", songSlug: "his-eye-is-on-the-sparrow" },
			{ title: "Softly and Tenderly Jesus Is Calling", style: "Surf Rock", songSlug: "softly-and-tenderly-jesus-is-calling" },
			{ title: "Take My Heart and Let It Be Consecrated", style: "Acapella", songSlug: "take-my-heart-and-let-it-be-consecrated" },
			{ title: "Standing on the Promises", style: "Rock", songSlug: "standing-on-the-promises" },
			{ title: "It Is Well with My Soul", style: "Orchestral Worship", songSlug: "it-is-well-with-my-soul" },
			{ title: "This Little Light of Mine", style: "Pop/Rock", songSlug: "this-little-light-of-mine" },
			{ title: "His Voice as the Sound", style: "Power Ballad", songSlug: "his-voice-as-the-sound" },
		],
	},
];
