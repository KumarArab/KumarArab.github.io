// Everything shown on arabkumar.in/code lives here.
// Items marked `todo` are placeholders waiting for real details from Arab.

export interface LinkOut { label: string; url: string; kind?: 'play' | 'appstore' | 'web' | 'blog' | 'github' }

export const profile = {
  name: 'Arab Kumar',
  title: 'Mobile Engineer',
  focus: 'Flutter',
  location: 'India',
  email: 'arabkumar1000@gmail.com',
  resume: '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/arab-kumar-b5853b191/',
  github: 'https://github.com/KumarArab',
  openToWork: true,
};

/** Quick facts for the hero. Only counts we can verify from the links below. */
export const facts = [
  { value: 3, label: 'apps live on the stores' },
  { value: 2, label: 'platforms: iOS & Android' },
  { value: 4, label: 'products built for my own problems' },
  { value: 3, label: 'playable games on the web' },
];

export interface Role { role: string; company: string; period: string; points: string[]; stack: string[]; todo?: boolean }

// TODO(arab): replace with the roles from LinkedIn (newest first).
export const experience: Role[] = [
  { role: 'Mobile Engineer', company: 'Current company', period: '20XX — Present', points: ['What you own and ship here.', 'One measurable result (users, speed, revenue, rating).'], stack: ['Flutter', 'Dart'], todo: true },
  { role: 'Flutter Developer', company: 'Previous company', period: '20XX — 20XX', points: ['What you built.', 'One measurable result.'], stack: ['Flutter', 'Firebase'], todo: true },
  { role: 'Freelance · The Flutter Guy', company: 'Self-employed', period: '2020 — 20XX', points: ['Apps and websites for colleges, startups and small businesses.', 'Started the @the.flutter.guy community.'], stack: ['Flutter', 'Web'] },
];

export interface App {
  id: string; name: string; kind: string; line: string; detail: string;
  links: LinkOut[]; stack: string[]; screens: string[]; icon?: string; todo?: string;
}

// screens: paths to screenshots in /public/work/<id>/… (empty = styled placeholder screen)
export const apps: App[] = [
  {
    id: 'cabo', name: 'Cabo', kind: 'Multiplayer card game',
    line: 'The card game where memory wins.',
    detail: 'Real-time multiplayer on iOS and Android. Remember your cards, swap smart and call Cabo before anyone else does. I also write about how it is built on the Cabo engineering blog.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.theflutterguy.kabo&hl=en_IN', kind: 'play' },
      { label: 'App Store', url: 'https://apps.apple.com/in/app/cabo-multiplayer-card-game/id6450954310', kind: 'appstore' },
      { label: 'Engineering blog', url: 'https://cabo-engineering.web.app', kind: 'blog' },
    ],
    stack: ['Flutter', 'Real-time multiplayer'], screens: [],
  },
  {
    id: 'matrix', name: 'Matrix', kind: 'News app',
    line: 'The news, minus the noise.',
    detail: 'A news app for iOS and Android. Stories arrive short and clear so you stay informed without the endless scroll.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=in.matrixnews.matrix', kind: 'play' },
      { label: 'App Store', url: 'https://apps.apple.com/in/app/matrix-news-app/id6745571979', kind: 'appstore' },
    ],
    stack: ['Flutter'], screens: [], todo: 'confirm one-liner',
  },
  {
    id: 'paperid', name: 'Paperid', kind: 'Audiobook app',
    line: 'Books, when your eyes are busy.',
    detail: 'An audiobook app for Android. Keep learning on the commute, at the gym or before sleep.',
    links: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.theflutterguy.paperid&hl=en_IN', kind: 'play' }],
    stack: ['Flutter'], screens: [], todo: 'confirm one-liner',
  },
];

export interface Product { name: string; status: 'Live' | 'In development'; problem: string; solution: string; url: string; embed: boolean; todo?: string }

export const products: Product[] = [
  { name: 'SnapMyCode', status: 'Live', problem: 'Code screenshots on social media looked messy.', solution: 'Turns code into clean, shareable images in seconds.', url: 'https://www.snapmycode.in', embed: true, todo: 'confirm what it does' },
  { name: 'Casca', status: 'Live', problem: 'Posting every reel twice, once on Instagram and again on YouTube.', solution: 'Casca picks up new Instagram posts and publishes them to YouTube automatically.', url: 'https://casca.web.app', embed: true },
  { name: 'Flutter Guru', status: 'Live', problem: 'Writing an informative LinkedIn post every day takes hours.', solution: 'Automates drafting and publishing daily Flutter posts on LinkedIn.', url: 'https://flutter-linkedin-guru.web.app/#/login', embed: true },
  { name: 'Buckminister', status: 'In development', problem: 'Expense trackers feel like homework.', solution: 'An expense tracker built around how I actually spend.', url: 'https://buckminister.com', embed: true, todo: 'confirm one-liner' },
];

export interface Playable { name: string; line: string; url: string }

export const playables: Playable[] = [
  { name: 'Juice Merge', line: 'Drop, merge, chase the combo.', url: 'https://juice-merge.netlify.app/' },
  { name: 'Story Quiz', line: 'A story you play by answering.', url: 'https://playformstoryquiz.netlify.app/' },
  { name: 'Matching Tiles', line: 'Flip, match, remember.', url: 'https://playformmatchingtiles.netlify.app/' },
];

export interface Channel { name: string; handle: string; line: string; url: string; kind: 'linkedin' | 'youtube' | 'instagram' | 'github' | 'blog'; cta: string }

export const community: Channel[] = [
  { name: 'LinkedIn', handle: 'Arab Kumar', line: 'An informative post on Flutter and building products, every single day.', url: 'https://www.linkedin.com/in/arab-kumar-b5853b191/', kind: 'linkedin', cta: 'Read the posts' },
  { name: 'GitHub', handle: 'KumarArab', line: 'Open-source Flutter UI/UX experiments and contributions.', url: 'https://github.com/KumarArab', kind: 'github', cta: 'See the repos' },
  { name: 'YouTube', handle: '@theflutterguy', line: 'Flutter tutorials and full builds, start to finish.', url: 'https://www.youtube.com/@theflutterguy', kind: 'youtube', cta: 'Watch' },
  { name: 'Instagram', handle: '@the.flutter.guy', line: 'Bite-size Flutter tips for developers.', url: 'https://www.instagram.com/the.flutter.guy/', kind: 'instagram', cta: 'Follow' },
  { name: 'Cabo Engineering', handle: 'cabo-engineering.web.app', line: 'How a real-time multiplayer game is built, written in public.', url: 'https://cabo-engineering.web.app', kind: 'blog', cta: 'Read the blog' },
];

export const stack = [
  ['Flutter', 'Dart', 'iOS', 'Android', 'Firebase'],
  ['Real-time multiplayer', 'State management', 'Animations', 'CI/CD'],
  ['Web', 'Automation', 'APIs', 'App Store & Play releases'],
];
