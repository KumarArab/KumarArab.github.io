// Everything shown on arabkumar.in/content lives here.
// `null` numbers render as "—" until the real stats arrive from Instagram Insights / the media kit.

export const creator = {
  handle: '@flipsidefolly',
  instagram: 'https://www.instagram.com/flipsidefolly/',
  mediaKit: 'https://flipsidefolly-mediakit.web.app',
  email: 'arabkumar1000@gmail.com',   // TODO(arab): collab email if different
  statsAsOf: null as string | null,     // e.g. 'Sep 2026'
};

export interface Stat { label: string; value: number | null; suffix?: string; decimals?: number; note: string }

// TODO(arab): fill from Instagram Insights (last 30 or 90 days).
export const headline: Stat[] = [
  { label: 'Followers', value: null, suffix: 'K', note: 'People who chose to see more.' },
  { label: 'Avg. reach per reel', value: null, suffix: 'K', note: 'Unique accounts each reel reaches, on average.' },
  { label: 'Avg. views per reel', value: null, suffix: 'K', note: 'Plays per reel, including replays.' },
  { label: 'Engagement rate', value: null, suffix: '%', decimals: 1, note: 'Likes, comments, shares and saves divided by reach.' },
  { label: 'Top reel', value: null, suffix: 'M', decimals: 1, note: 'Views on the best-performing reel so far.' },
];

export interface Pillar { name: string; line: string; formats: string; avgViews: number | null; tint: [string, string]; icon: string; reel?: string; link?: string }

// reel: path to a short muted mp4 in /public/reels/ (empty = styled placeholder)
export const pillars: Pillar[] = [
  { name: 'Dance', line: 'Class clips, choreography and trends, shot so you can learn the moves.', formats: 'Reels · Class videos · Trends', avgViews: null, tint: ['#FF5F6D', '#FFC371'], icon: 'dance' },
  { name: 'Fashion', line: 'Fit checks, styling ideas and outfits that work off the runway.', formats: 'Reels · Carousels · Fit checks', avgViews: null, tint: ['#8E7CFF', '#F4B8FF'], icon: 'hanger' },
  { name: 'Humour', line: 'Everyday moments turned into the reel you send to your group chat.', formats: 'Skits · POVs · Memes', avgViews: null, tint: ['#00B4DB', '#9CFFCE'], icon: 'laugh' },
  { name: 'Relatable & yap', line: 'Honest talk, useful info and hot takes, straight to camera.', formats: 'Talking heads · Carousels · Stories', avgViews: null, tint: ['#F7971E', '#FFD200'], icon: 'mic' },
];

export interface Split { label: string; value: number | null }

// TODO(arab): from Instagram Insights → Audience.
export const audience = {
  gender: [{ label: 'Women', value: null }, { label: 'Men', value: null }] as Split[],
  age: [
    { label: '13–17', value: null }, { label: '18–24', value: null }, { label: '25–34', value: null },
    { label: '35–44', value: null }, { label: '45+', value: null },
  ] as Split[],
  cities: ['City 1', 'City 2', 'City 3', 'City 4', 'City 5'],
  countries: ['India', 'Country 2', 'Country 3'],
};

// TODO(arab): confirm both lists.
export const brandFit = {
  yes: ['Fashion & streetwear', 'Footwear', 'Beauty & grooming', 'Dance & fitness', 'Apps & gadgets', 'Cafés & food', 'Lifestyle & travel', 'Events & music'],
  no: ['Betting & gambling', 'Get-rich-quick schemes', "Anything I wouldn't use myself"],
};

export interface Collab { brand: string; what: string; result: string; todo?: boolean }

// TODO(arab): real partnerships (paid + UGC).
export const collabs: Collab[] = [
  { brand: 'Brand name', what: 'Reel + 3 stories', result: 'Views, clicks or sales', todo: true },
  { brand: 'Brand name', what: 'UGC video for ads', result: 'Views, clicks or sales', todo: true },
  { brand: 'Brand name', what: 'Dance trend launch', result: 'Views, clicks or sales', todo: true },
];

export const services = [
  { name: 'Reel', detail: 'A concept, shot and edited by me, posted on @flipsidefolly.' },
  { name: 'Story set', detail: '3–5 stories with a link sticker, for launches and offers.' },
  { name: 'Carousel', detail: 'Styled photo posts: fit checks, lookbooks, how-tos.' },
  { name: 'UGC video', detail: 'Content for your own ads and pages. You own the usage.' },
  { name: 'Dance trend', detail: 'Choreography for your song, product or campaign.' },
  { name: 'Events', detail: 'Appearances, performances and live coverage.' },
];
