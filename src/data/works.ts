export type WorkItem = {
  title: string;
  artist: string;
  role: string;
  image: string;
  release?: string;
};

export const works: WorkItem[] = [
  {
    title: "You Dream & mine",
    artist: "y-Hiyori",
    role: "Composition / Lyrics / Arrangement",
    image: "/images/you-dream-mine.png",
    release: "2026",
  },
];