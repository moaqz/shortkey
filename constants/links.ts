import { SOCIAL_LINKS } from "./social";

interface FooterLink {
  name: string;
  path: string;
  external: boolean;
}

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: "Home",
    path: "/",
    external: false,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    external: false,
  },
  {
    name: "Github",
    path: SOCIAL_LINKS.github,
    external: true,
  },
  {
    name: "X (Twitter)",
    path: SOCIAL_LINKS.twitter,
    external: true,
  },
];
