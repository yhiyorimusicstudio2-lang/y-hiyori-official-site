export type WorkItem = {
  title: string;
  artist: string;
  role: string;
  image: string;
};

export const works = [
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Track Making / Composition",
    image: "/images/work-1.jpg",
  },
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Track Making / Production",
    image: "/images/work-2.jpg",
  },
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Composition / Arrangement",
    image: "/images/work-3.jpg",
  },
] satisfies WorkItem[];