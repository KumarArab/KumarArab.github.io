// Everything shown on arabkumar.in/code lives here.
// Numbers come from the public store listings, the Cabo engineering blog, YouTube and GitHub (Sep 2026).
// Items marked `todo` are placeholders waiting for real details from Arab.

export interface LinkOut { label: string; url: string; kind?: 'play' | 'appstore' | 'web' | 'blog' | 'github' }
export interface Metric { value: string; label: string }

export const profile = {
  name: 'Arab Kumar',
  title: 'Senior Mobile Engineer',
  focus: 'Flutter & Android',
  location: 'Bengaluru, India',
  email: 'arabkumar1000@gmail.com',
  resume: '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/arab-kumar-b5853b191/',
  github: 'https://github.com/KumarArab',
  openToWork: true,
};

/** Hero counters. Each one is backed by the resume or a public source. */
export const facts = [
  { value: 5, suffix: ' yrs', label: 'shipping Flutter & Android apps' },
  { value: 4, suffix: '', label: 'fintechs: Moniepoint, CRED, Uni, Fello' },
  { value: 10, suffix: 'K+', label: 'downloads on Cabo, my own game' },
  { value: 150, suffix: '+', label: 'GitHub stars on open-source Flutter UI' },
];

export interface Role { role: string; company: string; period: string; points: string[]; stack: string[]; todo?: boolean }

// From the resume + LinkedIn (newest first).
export const experience: Role[] = [
  {
    role: 'Senior Mobile Engineer', company: 'Moniepoint Group · Bengaluru, remote', period: 'May 2026 — Present',
    points: [
      'Leading the end-to-end migration of the Overdraft module (Business Loans) to a new core app architecture and design system.',
      'Own the Working Capital Loans module, a core lending product: features, fixes and stability.',
    ],
    stack: ['Flutter', 'Clean Architecture', 'Design systems', 'Lending'],
  },
  {
    role: 'Mobile Engineer (Consultant)', company: 'CRED · Bengaluru', period: 'Oct 2025 — Mar 2026',
    points: [
      'Migrated the UPI scanner from Flutter to native Jetpack Compose for faster camera start-up and snappier scans.',
      'Kept Flutter and native layers working as one, with the same UX, across critical payment flows.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'KMM', 'Flutter'],
  },
  {
    role: 'SDE → SDE II', company: 'Uni Cards · Bengaluru', period: 'Oct 2023 — Sep 2025',
    points: [
      'Architected Fixed Deposits and multi-credit-card support, and shipped personal loans and P2P lending.',
      'Rebuilt the design system (30% fewer visual inconsistencies) and added unit + golden tests (30% fewer regressions).',
    ],
    stack: ['Flutter', 'Riverpod', 'System design', 'Golden tests'],
  },
  {
    role: 'Intern → Software Development Engineer', company: 'Fello Finance · Bengaluru', period: 'Jan 2021 — Oct 2023',
    points: [
      'Built a gamified investment app that blends payments, skill-based games and rewards.',
      'Designed a server-driven journey framework and CI/CD for multi-flavour releases, cutting release time by 40%.',
    ],
    stack: ['Flutter', 'Firebase', 'Server-driven UI', 'CI/CD'],
  },
];

export interface App {
  id: string; name: string; kind: string; line: string; detail: string;
  links: LinkOut[]; stack: string[]; screens: string[]; metrics: Metric[]; icon?: string; todo?: string;
}

// screens: store screenshots saved in /public/work/<id>/
export const apps: App[] = [
  {
    id: 'cabo', name: 'Cabo', kind: 'Multiplayer memory games',
    line: 'Remember your cards. Outsmart real players.',
    detail: 'A real-time PvP card game where memory wins, plus Recall, Trek and WordGrid in one app. Serverless functions handle auth, referrals and rewards; a Node.js server runs live game state and chat. Leagues, streaks, a daily spin and vouchers keep players coming back.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.theflutterguy.kabo&hl=en_IN', kind: 'play' },
      { label: 'App Store', url: 'https://apps.apple.com/in/app/cabo-multiplayer-card-game/id6450954310', kind: 'appstore' },
      { label: 'Engineering blog', url: 'https://cabo-engineering.web.app', kind: 'blog' },
    ],
    metrics: [{ value: '10K+', label: 'downloads' }, { value: '4.1★', label: 'App Store' }, { value: '4', label: 'games in one app' }],
    stack: ['Flutter', 'Node.js', 'Firebase', 'WebSockets', 'AdMob mediation', 'Mixpanel'],
    screens: ['/work/cabo/1.webp', '/work/cabo/2.webp', '/work/cabo/3.webp', '/work/cabo/4.webp', '/work/cabo/5.webp'], icon: '/work/cabo/icon.webp',
  },
  {
    id: 'matrix', name: 'Matrix News', kind: 'AI news app',
    line: "India's news, summarised by AI.",
    detail: "Matrix pulls stories from India's top publishers and an LLM condenses them into one clear summary. Read it your way (ELI5, Opposite Sides, bullet points or the 5Ws), tap any word for context and follow a story's full timeline.",
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=in.matrixnews.matrix', kind: 'play' },
      { label: 'App Store', url: 'https://apps.apple.com/in/app/matrix-news-app/id6745571979', kind: 'appstore' },
    ],
    metrics: [{ value: '5.0★', label: 'App Store' }, { value: '4.2★', label: 'Google Play' }, { value: '4+', label: 'summary styles' }],
    stack: ['Flutter', 'LLM summaries', 'News pipeline'],
    screens: ['/work/matrix/1.webp', '/work/matrix/2.webp', '/work/matrix/3.webp', '/work/matrix/4.webp', '/work/matrix/5.webp'], icon: '/work/matrix/icon.webp',
  },
  {
    id: 'paperid', name: 'Paperid', kind: 'Audiobook app · open source',
    line: 'Books, when your eyes are busy.',
    detail: 'A clean audiobook app built with Flutter and Firebase, published on Google Play with its source code open on GitHub. The UI version of it is my most-starred repo.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.theflutterguy.paperid&hl=en_IN', kind: 'play' },
      { label: 'Source code', url: 'https://github.com/KumarArab/Paperid---Audiobook-App', kind: 'github' },
    ],
    metrics: [{ value: '28★', label: 'on the UI repo' }, { value: '11', label: 'forks' }, { value: '100%', label: 'open source' }],
    stack: ['Flutter', 'Firebase'],
    screens: ['/work/paperid/1.webp', '/work/paperid/2.webp', '/work/paperid/3.webp', '/work/paperid/4.webp', '/work/paperid/5.webp'], icon: '/work/paperid/icon.webp',
  },
];

export interface Product { name: string; tag: string; status: 'Live' | 'In development'; problem: string; solution: string; url: string; embed: boolean; image?: string }

// embed: live iframe preview (only for sites that allow framing); image: screenshot shown underneath / instead
export const products: Product[] = [
  { name: 'SnapMyCode', tag: 'Code-to-image API', status: 'Live', problem: 'Sharing code as an image meant screenshots, cropping and ugly fonts.', solution: 'One POST request returns a pixel-perfect PNG, WebP or SVG in under a second. 24 languages, 10 themes, free and paid plans.', url: 'https://www.snapmycode.in', embed: false, image: '/work/products/snapmycode.webp' },
  { name: 'Casca', tag: 'Reels to YouTube, on autopilot', status: 'Live', problem: 'Posting every reel twice, once on Instagram and again on YouTube.', solution: 'Casca picks up new Instagram reels and cross-posts them to YouTube Shorts automatically.', url: 'https://casca.web.app', embed: true },
  { name: 'Flutter Guru', tag: 'LinkedIn post automation', status: 'Live', problem: 'Writing an informative LinkedIn post every day takes hours.', solution: 'A dashboard that drafts and publishes daily Flutter posts to LinkedIn for me.', url: 'https://flutter-linkedin-guru.web.app/#/login', embed: false },
  { name: 'Buckminister', tag: 'Private expense tracker for iPhone', status: 'In development', problem: 'Expense apps want your data before they help you.', solution: 'Log in seconds, set budgets with alerts, export to CSV and split bills with friends. Your data stays on your device.', url: 'https://buckminister.com', embed: true, image: '/work/products/buckminister.webp' },
];

export interface Playable { name: string; line: string; url: string }

// HTML5 playable ads for Meta & Google Ads, built at Playform Labs
export const playablesInfo = {
  dashboard: 'https://playformlabsadvertiserdashboard.netlify.app/login',
  points: ['Customisable HTML5 ads that run inside Meta and Google Ads', 'A modular analytics SDK for every playable', 'An advertiser dashboard for interactions and conversions', 'Smaller bundles with sprite sheets, font subsetting and FFmpeg video compression'],
};

export const playables: Playable[] = [
  { name: 'Juice Merge', line: 'Drop fruit, merge juices, chase the combo.', url: 'https://juice-merge.netlify.app/' },
  { name: 'Story Quiz', line: 'A story you play by answering.', url: 'https://playformstoryquiz.netlify.app/' },
  { name: 'Match the Tiles', line: 'Find the three matching sets before time runs out.', url: 'https://playformmatchingtiles.netlify.app/' },
];

export interface Channel { name: string; handle: string; line: string; url: string; kind: 'linkedin' | 'youtube' | 'instagram' | 'github' | 'blog'; cta: string; stat?: string }

export const community: Channel[] = [
  { name: 'LinkedIn', handle: 'Arab Kumar', line: 'An informative post on Flutter and building products, every single day.', url: 'https://www.linkedin.com/in/arab-kumar-b5853b191/', kind: 'linkedin', cta: 'Read the posts', stat: '20K+ devs reached weekly' },
  { name: 'GitHub', handle: 'KumarArab', line: 'Open-source Flutter UI builds, from audiobooks to trading apps.', url: 'https://github.com/KumarArab', kind: 'github', cta: 'See the repos', stat: '80 repos · 150+ ★' },
  { name: 'YouTube', handle: '@TheFlutterGuy', line: 'Dribbble designs turned into real Flutter apps, start to finish.', url: 'https://www.youtube.com/@theflutterguy', kind: 'youtube', cta: 'Watch', stat: '1.87K subscribers' },
  { name: 'Instagram', handle: '@the.flutter.guy', line: 'Bite-size Flutter tips for developers.', url: 'https://www.instagram.com/the.flutter.guy/', kind: 'instagram', cta: 'Follow' },
  { name: 'Cabo Engineering', handle: 'cabo-engineering.web.app', line: 'WebSockets, FCM, modular Flutter and anti-cheat, written up from real bugs.', url: 'https://cabo-engineering.web.app', kind: 'blog', cta: 'Read the blog', stat: '18 deep dives' },
];

export const stack = [
  ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose', 'KMM', 'Android', 'iOS'],
  ['Clean Architecture', 'Modularization', 'Riverpod', 'Server-driven UI', 'Golden tests', 'CI/CD'],
  ['Firebase', 'Node.js', 'WebSockets', 'Redis', 'MongoDB', 'Mixpanel', 'Sentry', 'Datadog'],
];
