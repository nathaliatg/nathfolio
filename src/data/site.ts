export const site = {
  name: 'Nathalia Gonçalves',
  mark: 'n.g.',
  role: 'front-end developer & visual designer',
  email: 'nathaliatgoncalves@gmail.com',
  location: 'curitiba, br',
  year: 2026,
  description:
    'Front-end developer with a designer’s eye. I build interfaces that look as good as they work.',
  footerNote: 'made with care (and a cat on the keyboard)',
  social: {
    // empty string hides the link
    github: 'https://github.com/nathaliatg',
    linkedin: 'https://www.linkedin.com/in/nathaliatg',
    instagram: 'https://www.instagram.com/hotncoisas',
  },
} as const;

/** Internal URL with the configured base path. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
