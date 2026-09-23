import type { ImageMetadata } from 'astro';
import petmatchImg from '../assets/petmatch.png';
import safeImg from '../assets/safe.png';
import artsyImg from '../assets/artsy.png';
import petilioImg from '../assets/petilio.png';

// All projects live here. Adding a `study` creates the /work/<slug> page.
// Empty links ('') don't render a button.

export interface CaseStudyBlock {
  label?: string;
  heading?: string;
  /** **text** becomes <strong> */
  body?: string[];
  list?: string[];
  features?: { name: string; text: string }[];
  stack?: string[];
  quote?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** hides the card and its page */
  hidden?: boolean;
  card: {
    role: string;
    blurb: string;
    image?: ImageMetadata;
    /** cover = crop, contain = small centered, contain-full = whole image */
    fit?: 'cover' | 'contain' | 'contain-full';
    bg?: string;
    /** hover circle colour */
    cover: string;
    revealInk?: string;
    badge?: { label: string; tone: 'soon' | 'course' };
    /** desktop columns out of 12 */
    span: number;
    /** pulls the card up on desktop, breaking the row alignment */
    nudgeUp?: boolean;
    wordmark?: { text: string; color: string };
  };
  study?: {
    eyebrow: string;
    tagline: string;
    meta: { role: string; stack: string; type: string };
    links: { live?: string; repo?: string };
    hero: {
      bg: string;
      fit: 'cover' | 'contain';
      /** files in public/videos/ */
      video?: { mp4: string; webm?: string };
    };
    blocks: CaseStudyBlock[];
  };
}

export const projects: Project[] = [
  {
    slug: 'petmatch',
    name: 'PetMatch',
    card: {
      role: 'product design · javascript',
      blurb:
        'I designed and built an adoption platform that helps shelters and future pet owners find their match faster.',
      image: petmatchImg,
      fit: 'contain-full',
      bg: '#f6dee2',
      cover: '#1C194A',
      span: 7,
    },
    study: {
      eyebrow: 'selected work — 2026',
      tagline:
        'An adoption platform that treats matching as a real problem, not a photo gallery. Designed and built end to end: brand, interface and code.',
      meta: { role: 'Design & development', stack: 'HTML, CSS, JavaScript', type: 'Personal project' },
      links: {
        live: 'https://nathaliatg.github.io/petmatch/',
        repo: '',
      },
      hero: {
        bg: '#f0eee6',
        fit: 'cover',
        video: { mp4: '/videos/Petmatch.mp4' },
      },
      blocks: [
        {
          label: 'the problem',
          heading: 'Shelters are full, adoption pages are endless, and nobody finds each other.',
          body: [
            "Finding a pet to adopt can easily turn into an endless scroll through photos and profiles. But a cute face isn't necessarily enough to tell someone whether an animal is a good fit for their routine, home or experience.",
            'I wanted to explore what adoption could look like if the experience focused a little less on browsing and a little more on compatibility.',
            'Instead of starting with “which pet do you like?”, PetMatch starts with “what kind of pet fits your life?”',
          ],
        },
        {
          quote:
            "I came from veterinary medicine, so the idea of compatibility between an animal's needs and a family's routine was especially interesting to me. PetMatch started as a way to explore that idea through interface design.",
        },
        {
          label: 'the solution',
          heading: 'Start with the person, then find the pet.',
          body: [
            'Instead of making the user browse every animal, PetMatch introduces a short form that collects information about their lifestyle and preferences.',
            'The project also includes individual pet profiles, where users can find more information before deciding whether a match feels right.',
          ],
          features: [
            {
              name: 'Lifestyle questions',
              text: 'A short form about routine, living situation and experience with pets.',
            },
            {
              name: 'Pet profiles',
              text: 'A closer look at each animal, with information presented alongside their photos.',
            },
            {
              name: 'Interactive form',
              text: 'Client-side validation, phone number formatting and GET-based form submission using JavaScript.',
            },
            {
              name: 'Responsive interface',
              text: 'Layouts and components designed to work across different screen sizes.',
            },
          ],
        },
        {
          label: 'building it from scratch',
          body: [
            'I handled the structure, styling and interactions myself, including form validation, dynamic modals, data retrieval and small UI interactions.',
            'Some of the things I implemented:',
          ],
          list: [
            'Form validation with RegExp',
            'Phone number masking',
            'Dynamic pet detail modals',
            'GET requests with URLSearchParams',
            'Animated counters using IntersectionObserver and requestAnimationFrame',
            'Responsive layouts with Flexbox and Grid',
            'Semantic HTML structure',
            'Reusable styling through CSS variables',
          ],
        },
        {
          label: 'tech',
          stack: [
            'HTML',
            'CSS',
            'JavaScript',
            'CSS Variables',
            'Flexbox & Grid',
            'IntersectionObserver',
            'URLSearchParams',
          ],
        },
        {
          label: 'visual identity',
          body: [
            'PetMatch also gave me the opportunity to create the visual identity from scratch, including the colour palette, typography and custom illustrations.',
          ],
          stack: ['Fraunces + Inter', 'Custom illustrations'],
        },
      ],
    },
  },

  {
    slug: 'safe',
    name: 'safe',
    card: {
      role: 'healthtech · react + vite',
      blurb:
        "A free tool that tells you what's safe to eat on a Low FODMAP diet, inspired by my fiancée's everyday challenge with IBS.",
      image: safeImg,
      fit: 'contain',
      bg: '#1E4228',
      cover: '#21432A',
      revealInk: '#e8f2fd',
      span: 5,
    },
    study: {
      eyebrow: 'selected work — 2026',
      tagline:
        "Know what's safe to eat, before you take a bite. A free, no-friction tool that turns the Low FODMAP diet into a quick, clear answer, for anyone living with IBS.",
      meta: { role: 'Design & development', stack: 'React, Vite, Tailwind', type: 'Personal project' },
      links: {
        live: 'https://nathaliatg.github.io/safe/',
        repo: '',
      },
      hero: { bg: '#1E4228', fit: 'contain' },
      blocks: [
        {
          label: 'the problem',
          heading: 'Living with IBS means every meal comes with a question mark.',
          body: [
            "The Low FODMAP diet is one of the most evidence-based tools for managing IBS symptoms, but it's genuinely hard to follow. Foods that seem healthy (apples, garlic, honey, onion, dates, oat milk) can quietly wreck your day. Hidden ingredients like garlic powder and onion powder turn up in everything from store-bought pesto to BBQ sauce to spice blends.",
            'Most online resources are either locked behind apps that require subscriptions, buried in clinical PDFs, or written for dietitians rather than patients. The result: people either eat the same five "safe" meals forever, or spend twenty minutes Googling every ingredient before they can cook.',
          ],
        },
        {
          quote:
            'safe was built to fix that, inspired by my fiancée, and the everyday challenges of Low FODMAP living.',
        },
        {
          label: 'the solution',
          heading: 'A fast, free reference: search any food, get a clear answer in seconds.',
          body: [
            'Most FODMAP tools show a green or red label and nothing else. **safe tells you why a food is a problem, how much is actually safe, and what to use instead**, because understanding the diet is what makes it sustainable. Particular attention went to the tricky ingredients that catch people off guard: garlic powder, dates, hibiscus tea, pesto, soft cheeses, balsamic vinegar.',
          ],
          features: [
            {
              name: 'Food search',
              text: 'Instant FODMAP status for 100+ foods, with plain-language explanations and portion guidance.',
            },
            {
              name: 'Recipe analyzer',
              text: 'Paste an ingredient list and get every FODMAP flagged, with swap suggestions.',
            },
            {
              name: 'PDF upload',
              text: 'Upload a recipe PDF and let safe extract and analyze the ingredients automatically.',
            },
            { name: 'Grocery list', text: 'Generate a shopping list from any recipe in one click.' },
          ],
        },
        {
          label: 'tech',
          stack: [
            'React + Vite',
            'Tailwind CSS',
            'Fuse.js (fuzzy search)',
            'PDF.js (recipe parsing)',
            'Fraunces + Inter',
          ],
        },
      ],
    },
  },

  {
    slug: 'artsy',
    name: 'Artsy',
    card: {
      role: 'academic project · php + postgresql',
      blurb:
        'A full-stack workshop platform built for my web programming course: auth, CRUD, and a relational database from scratch.',
      image: artsyImg,
      fit: 'contain-full',
      bg: '#f2d564',
      cover: '#6B3450',
      badge: { label: 'coursework', tone: 'course' },
      span: 6,
      nudgeUp: true,
    },
    study: {
      eyebrow: 'coursework — web programming',
      tagline:
        'A platform for booking art workshops, built from an empty database up. No framework, no ORM, no shortcuts, which is exactly why it taught me the most.',
      meta: { role: 'Design & development', stack: 'PHP, PostgreSQL', type: 'Academic project' },
      links: {
        live: '',
        repo: '',
      },
      hero: {
        bg: '#f0eee6',
        fit: 'cover',
        video: { mp4: '/videos/Artsy.mp4' },
      },
      blocks: [
        {
          label: 'the brief',
          heading: 'Build a working full-stack product without a framework catching you.',
          body: [
            'The assignment was a CRUD app. I turned it into a real product: Artsy lets people find and book hands-on art workshops, and lets instructors publish and manage them.',
            'Doing it in plain PHP against PostgreSQL meant writing the parts a framework usually hides: session handling, password hashing, prepared statements, the relational schema, the validation layer. **I stopped treating the database as a black box after this project.**',
          ],
        },
        {
          label: 'what I built',
          heading: 'Auth, CRUD, and a schema that holds up.',
          features: [
            {
              name: 'Authentication',
              text: 'Sessions and hashed passwords, with role separation between instructor and student.',
            },
            {
              name: 'Workshop CRUD',
              text: 'Instructors create, edit and retire workshops; bookings stay consistent with the seats available.',
            },
            {
              name: 'Relational schema',
              text: 'Normalised tables for users, workshops and bookings, with foreign keys doing the integrity work.',
            },
            {
              name: 'Server-rendered UI',
              text: 'A designed interface. Coursework rarely looks considered, and I wanted this one to.',
            },
          ],
        },
        {
          label: 'tech',
          stack: ['PHP', 'PostgreSQL', 'HTML + CSS', 'Prepared statements', 'Session auth'],
        },
      ],
    },
  },

  {
    slug: 'water-cycle-game',
    name: 'Water cycle game',
    hidden: true,
    card: {
      role: 'illustration · javascript',
      blurb: 'An educational game for kids, illustrated and coded solo.',
      bg: '#12351f',
      cover: '#0F6E56',
      revealInk: '#e1f5ee',
      span: 4,
    },
    study: {
      eyebrow: 'selected work',
      tagline:
        'A browser game that teaches the water cycle to kids: every drop, cloud and raindrop drawn by hand, and every rule coded from scratch.',
      meta: {
        role: 'Illustration, design & development',
        stack: 'JavaScript, Canvas',
        type: 'Personal project',
      },
      links: {
        live: '',
        repo: '',
      },
      hero: { bg: '#12351f', fit: 'contain' },
      blocks: [
        {
          label: 'the problem',
          heading: 'Kids get taught the water cycle as a diagram they have to memorise.',
          body: [
            'Evaporation, condensation, precipitation, collection: four words on an arrow loop. It is the kind of thing you can recite perfectly and still not understand, because nothing about a static diagram shows you that it is a system where one step feeds the next.',
          ],
        },
        {
          label: 'the solution',
          heading: 'Let them run the cycle instead of reading about it.',
          body: [
            'The game puts the player in charge of a single drop of water and lets them push it through the cycle: heat it, watch it rise, cool it, watch it fall. **Getting it wrong is part of the lesson**: the drop stalls, and the game shows what was missing.',
            'I illustrated every asset myself, which let the art carry the explanation instead of the text doing all the work.',
          ],
          features: [
            {
              name: 'Hand-drawn art',
              text: 'Every character and background illustrated from scratch, with no stock assets.',
            },
            {
              name: 'Learn by doing',
              text: 'Players drive each stage of the cycle instead of reading a caption about it.',
            },
            {
              name: 'Forgiving feedback',
              text: 'Wrong moves explain themselves rather than ending the game.',
            },
            {
              name: 'Runs anywhere',
              text: 'Plain JavaScript in the browser. No install, works on a school computer.',
            },
          ],
        },
        {
          label: 'tech',
          stack: ['Vanilla JavaScript', 'HTML Canvas', 'Original illustration', 'CSS animation'],
        },
      ],
    },
  },

  {
    slug: 'petilio',
    name: 'Petilio',
    card: {
      role: 'freelance · home-visit vet care',
      blurb:
        "A brand and website for a mobile veterinary service, designed and built as a freelance project, launching soon.",
      image: petilioImg,
      fit: 'contain-full',
      bg: '#fbeaf3',
      cover: '#BB606C',
      revealInk: '#fce4f0',
      badge: { label: 'coming soon', tone: 'soon' },
      span: 6,
    },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);

export const studies = visibleProjects.filter((p) => p.study);

export function nextStudy(slug: string): Project {
  const i = studies.findIndex((p) => p.slug === slug);
  return studies[(i + 1) % studies.length]!;
}
