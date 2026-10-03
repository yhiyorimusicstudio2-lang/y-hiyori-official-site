export type YoutubeVideoItem = {
  id: string;
  embedUrl: string;
};

export const youtubeVideos: YoutubeVideoItem[] = [
  {
    id: "qhfG7Pj_3vg",
    // NOTE: iframe の src には「埋め込み用URL」が必要。
    // youtu.be/… や watch?v=… のままでは再生できないため /embed/ 形式にする。
    embedUrl: "https://www.youtube.com/embed/qhfG7Pj_3vg?rel=0",
  },
];
