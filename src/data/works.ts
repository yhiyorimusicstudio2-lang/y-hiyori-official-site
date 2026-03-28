export type WorkItem = {
  title: string;
  artist: string;
  role: string;
  image: string;
  description: string;
  release?: string;
};

export const works: WorkItem[] = [
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Track Making / Composition",
    image: "/images/work-1.jpg",
    description:
      "ここに作品の詳細説明を入れます。参加内容、制作背景、担当パートなどを記載できます。",
    release: "2026",
  },
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Track Making / Production",
    image: "/images/work-2.jpg",
    description:
      "ここに作品の詳細説明を入れます。複数曲ある場合も、このファイルで作品ごとに管理できます。",
    release: "2026",
  },
  {
    title: "Coming Soon",
    artist: "TBA",
    role: "Composition / Arrangement",
    image: "/images/work-3.jpg",
    description:
      "ここに作品の詳細説明を入れます。アルバム名、シングル名、クレジットなども追加可能です。",
    release: "2026",
  },
];