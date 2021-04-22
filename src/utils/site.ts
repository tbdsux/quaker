import urljoin from 'url-join';

const PROJECT_SITE = process.env.NEXT_PUBLIC_PROJECT_SITE;

const joinFormUrl = (link: string): string => {
  return urljoin(PROJECT_SITE, 'f', link);
};

export { PROJECT_SITE, joinFormUrl };
