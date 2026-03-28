export type WorkTrack = {
  title: string;
  credit: string;
};

export type WorkItem = {
  title: string;
  artist: string;
  image: string;
  release?: string;
  tracks: WorkTrack[];
};

export const works: WorkItem[] = [
  {
    title: "You Dream & mine",
    artist: "y-Hiyori",
    image: "/images/you-dream-mine.png",
    release: "2026",
    tracks: [
      {
        title: "01 You Dream & mine",
        credit: "Lyrics / Composition / Arrangement",
      },
      {
        title: "02 You Dream & mine (Instrumental)",
        credit: "Composition / Arrangement",
      },
    ],
  },
];