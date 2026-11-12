// Every outside link on the site lives here. Paste the full address (https://…) between the
// quotes. A link left blank simply doesn't show (footer icons) or shows as "Link coming soon"
// (Community page), so nothing ever points at the wrong place.

/** GALOP's own accounts: the icons in the footer. */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/galoplife/',
  facebook: '',
};

/** The Community page cards, in order. Sydney: edit the wording freely. */
export const COMMUNITY: { kind: string; name: string; text: string; cta: string; url: string }[] = [
  {
    kind: 'Podcast',
    name: 'The podcast',
    text: 'Honest conversations about life on a GLP-1.',
    cta: 'Listen',
    url: '',
  },
  {
    kind: 'Instagram',
    name: 'Metabolism Diaries',
    text: 'Everyday notes, wins and real talk from the journey.',
    cta: 'Follow',
    url: '',
  },
  {
    kind: 'Substack',
    name: 'The newsletter',
    text: 'Longer reads from Sydney, straight to your inbox.',
    cta: 'Read',
    url: '',
  },
];
