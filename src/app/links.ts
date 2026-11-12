// Every outside link on the site lives here. Paste the full address (https://…) between the
// quotes. A link left blank simply doesn't show (footer icons) or shows as "Link coming soon"
// (Community page), so nothing ever points at the wrong place.

/** GALOP's own accounts: the icons in the footer. */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/galoplife/',
  facebook: 'https://www.facebook.com/share/1ExQbmKq3d/?mibextid=wwXIfr',
};

/** The Community page cards (Metabolism Diaries), in order. Sydney: edit the wording freely. */
export const COMMUNITY: { kind: string; name: string; text: string; cta: string; url: string }[] = [
  {
    kind: 'Podcast',
    name: 'Listen on Spotify',
    text: 'Honest GLP-1 stories, hosted by Sydney.',
    cta: 'Listen',
    url: 'https://open.spotify.com/show/38CWtUdLAJQP85hB5zDm3H',
  },
  {
    kind: 'YouTube',
    name: 'Watch the episodes',
    text: 'Metabolism Diaries on video.',
    cta: 'Watch',
    url: 'https://www.youtube.com/@metabolismdiaries',
  },
  {
    kind: 'Substack',
    name: 'Read the newsletter',
    text: 'On a GLP-1 and talking about all of it.',
    cta: 'Read',
    url: 'https://metabolismdiaries.substack.com/',
  },
  {
    kind: 'Instagram',
    name: 'Follow along',
    text: 'Metabolism Diaries on Instagram.',
    cta: 'Follow',
    url: '',
  },
];
