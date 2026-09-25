// Everything shown on arabkumar.in/content lives here.
// Numbers, audience and brands come from the @flipsidefolly media kit (flipsidefolly-mediakit.web.app).

export const creator = {
  handle: '@flipsidefolly',
  instagram: 'https://www.instagram.com/flipsidefolly/',
  mediaKit: 'https://flipsidefolly-mediakit.web.app',
  email: 'flipsidefolly@gmail.com',
  city: 'Bengaluru',
  statsAsOf: 'the latest media kit' as string | null,
};

export interface Stat { label: string; value: number | null; suffix?: string; decimals?: number; note: string }

export const headline: Stat[] = [
  { label: 'Avg. plays per reel', value: 27, suffix: 'K', note: '12× the follower count. The reels travel well beyond the people who already follow.' },
  { label: 'Total plays', value: 2.7, suffix: 'M', decimals: 1, note: 'Every one of them organic. No paid boosts.' },
  { label: 'Engagement rate', value: 4.8, suffix: '%', decimals: 1, note: 'Measured by plays, not followers, so it reflects how people react to the reel itself.' },
  { label: 'Followers', value: 2.3, suffix: 'K', decimals: 1, note: 'Quality over quantity: a tight audience that looks like the person making the content.' },
];

export interface Pillar { name: string; line: string; formats: string; image?: string; reel?: string; link?: string; tint: [string, string]; icon: string }

// image: reel cover in /public/creator/reels/; reel: optional short muted mp4 that plays instead
export const pillars: Pillar[] = [
  { name: 'Office humour', line: 'Standups, managers and Mondays, from someone who is actually in them.', formats: 'Reels · POVs · Skits', image: '/creator/reels/DZ2nvr_TDbr.webp', link: 'https://www.instagram.com/p/DZ2nvr_TDbr/', tint: ['#FF5F6D', '#FFC371'], icon: 'laugh' },
  { name: 'Fits', line: 'Workday outfits for people in tech who still want to look good.', formats: 'Reels · Fit checks · Carousels', image: '/creator/reels/DZm4Egsz5Jx.webp', link: 'https://www.instagram.com/p/DZm4Egsz5Jx/', tint: ['#8E7CFF', '#F4B8FF'], icon: 'hanger' },
  { name: 'Dance', line: 'Class videos and freestyle clips, wherever there is floor space.', formats: 'Reels · Class videos · Trends', image: '/creator/reels/DNIuO3APQ05.webp', link: 'https://www.instagram.com/p/DNIuO3APQ05/', tint: ['#00B4DB', '#9CFFCE'], icon: 'dance' },
  { name: 'Bengaluru life', line: 'Cafés, lakes and slow weekends. The life the audience is building too.', formats: 'Reels · Vlogs · Stories', image: '/creator/reels/DZSS2A1PdRy.webp', link: 'https://www.instagram.com/p/DZSS2A1PdRy/', tint: ['#F7971E', '#FFD200'], icon: 'mic' },
];

/** Reel covers for the "from the feed" strip. */
export const feed = ['DOgVOrDj58_', 'DOvbsyGEy5z', 'DME6lnyTluH', 'DOtIDiCk10T', 'DZC06SOz7tQ', 'DZ2nvr_TDbr', 'DNIuO3APQ05', 'DZm4Egsz5Jx', 'DZSS2A1PdRy']
  .map(id => ({ image: `/creator/reels/${id}.webp`, url: `https://www.instagram.com/p/${id}/` }));

export interface Split { label: string; value: number | null }

export const audience = {
  gender: [{ label: 'Men', value: 74.3 }, { label: 'Women', value: 25.7 }] as Split[],
  age: [
    { label: '25–34', value: 57.6 }, { label: '18–24', value: 32.7 }, { label: '35–44', value: 6.5 }, { label: '13–17', value: 0.8 },
  ] as Split[],
  countries: [
    { label: 'India', value: 43.9 }, { label: 'Nigeria', value: 5.5 }, { label: 'Pakistan', value: 5.2 },
    { label: 'United States', value: 3.5 }, { label: 'Kenya', value: 3.4 },
  ] as Split[],
};

/** Why brands get results here, from the media kit. */
export const why = [
  { title: 'The audience is the same person', body: "They aren't watching for outfit inspo. They watch because it looks like a life they're already building: same city, same grind, same attempt at dressing well." },
  { title: "It reads like someone's actual feed", body: "Because it is. No studio, no stylist, no script. That's why it doesn't look like an ad, even when it is one." },
  { title: 'The joke is always grounded', body: "The humour comes from real work and city moments. People aren't sharing content, they're sharing a feeling they recognise." },
];

// TODO(arab): confirm both lists.
export const brandFit = {
  yes: ["Men's fashion & activewear", 'Footwear', 'Grooming', 'Tech & gadgets', 'Productivity & SaaS apps', 'EdTech & careers', 'Cafés & food', 'Lifestyle apps'],
  no: ['Betting & gambling', 'Get-rich-quick schemes', "Anything I wouldn't use myself"],
};

export interface Collab { brand: string; url: string; category: string; videos: number; logo: string }

export const collabs: Collab[] = [
  { brand: 'MasterEdu.ai', url: 'https://masteredu.ai/', category: 'AI education platform', videos: 30, logo: '/creator/brands/master.webp' },
  { brand: 'Blissclub', url: 'https://blissclub.com/pages/mens-wear', category: "Men's activewear", videos: 10, logo: '/creator/brands/blissclub.webp' },
  { brand: 'SriMandir', url: 'https://www.srimandir.com/', category: 'Devotional & lifestyle app', videos: 5, logo: '/creator/brands/srimandir.webp' },
];

export const services = [
  { name: 'UGC video', detail: 'Ad-ready videos for your own pages and campaigns. Briefed properly, delivered on time.' },
  { name: 'Reel', detail: 'A concept, shot and edited by me, posted on @flipsidefolly.' },
  { name: 'Story set', detail: '3–5 stories with a link sticker, for launches and offers.' },
  { name: 'Fit check', detail: 'Your product styled into a real workday outfit.' },
  { name: 'Dance trend', detail: 'Choreography for your song, product or campaign.' },
  { name: 'Events', detail: 'Appearances, launches and live coverage in Bengaluru.' },
];
