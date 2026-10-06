import type { IconType } from "react-icons";
import {
  SiApplemusic,
  SiLine,
  SiRakuten,
  SiSpotify,
  SiTidal,
  SiYoutubemusic,
} from "react-icons/si";
import { FaAmazon, FaDeezer, FaItunesNote, FaMusic } from "react-icons/fa";

export type StoreLink = {
  name: string;
  url: string;
  icon: IconType;
  accent: string;
};

export type ReleaseCredit = {
  role: string;
  names: string;
};

export type ReleaseTrack = {
  number: number;
  title: string;
  artist: string;
  credits: ReleaseCredit[];
};

export type Release = {
  slug: string;
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
  links: StoreLink[];
  tracks: ReleaseTrack[];
  shorts: {
    title: string;
    url: string;
  };
};

export const artistProfile = {
  name: "y-Hiyori",
  pageUrl: "https://www.tunecore.co.jp/artists/y-hiyori",
  socials: {
    youtube: "https://www.youtube.com/channel/UCKsRSyRjqjHGI5bXKHks2jQ",
    instagram: "https://www.instagram.com/yhiyori_music",
    tiktok: "https://www.tiktok.com/@yhiyorimusic",
  },
};

/*
 * 新しいリリースの追加方法
 * 1. public/images/ にジャケット画像を置く（例: /images/新曲.png）
 * 2. 下の releases 配列の「先頭」にオブジェクトを1つ追加する（先頭＝最新として表示）
 *    slug はURLの末尾になります（例: slug: "my-new-song" → /#release/my-new-song）
 * 3. 配信リンク（links）やクレジット（credits）は既存の項目をコピーして書き換える
 */
export const releases: Release[] = [
  {
    slug: "you-dream-mine",
    title: "You dream & mine",
    artist: "y-Hiyori",
    cover: "/images/you-dream-mine.png",
    releaseDate: "2026/04/30",
    links: [
      {
        name: "Apple Music",
        url: "https://www.tunecore.co.jp/to/apple_music/1699739",
        icon: SiApplemusic,
        accent: "#fa243c",
      },
      {
        name: "Spotify",
        url: "https://www.tunecore.co.jp/to/spotify/1699739",
        icon: SiSpotify,
        accent: "#1db954",
      },
      {
        name: "YouTube Music",
        url: "https://www.tunecore.co.jp/to/youtube_music_key/1699739",
        icon: SiYoutubemusic,
        accent: "#ff0000",
      },
      {
        name: "LINE MUSIC",
        url: "https://www.tunecore.co.jp/to/line/1699739",
        icon: SiLine,
        accent: "#06c755",
      },
      {
        name: "Amazon Music",
        url: "https://www.tunecore.co.jp/to/amazon_music/1699739",
        icon: FaAmazon,
        accent: "#25d1da",
      },
      {
        name: "iTunes",
        url: "https://www.tunecore.co.jp/to/itunes/1699739",
        icon: FaItunesNote,
        accent: "#f94c57",
      },
      {
        name: "AWA",
        url: "https://www.tunecore.co.jp/to/awa/1699739",
        icon: FaMusic,
        accent: "#ff7bac",
      },
      {
        name: "Deezer",
        url: "https://www.tunecore.co.jp/to/deezer/1699739",
        icon: FaDeezer,
        accent: "#a238ff",
      },
      {
        name: "TIDAL",
        url: "https://listen.tidal.com/search?q=y-Hiyori%20You%20dream%20%26%20mine",
        icon: SiTidal,
        accent: "#111111",
      },
      {
        name: "KKBOX",
        url: "https://www.kkbox.com/jp/ja/search.php?word=y-Hiyori%20You%20dream%20%26%20mine",
        icon: FaMusic,
        accent: "#0098ff",
      },
      {
        name: "FLO",
        url: "https://www.music-flo.com/search/all?keyword=y-Hiyori%20You%20dream%20%26%20mine",
        icon: FaMusic,
        accent: "#3d5afe",
      },
      {
        name: "mora",
        url: "https://www.tunecore.co.jp/to/mora1701/1699739",
        icon: FaMusic,
        accent: "#e60012",
      },
      {
        name: "レコチョク",
        url: "https://www.tunecore.co.jp/to/recochoku401/1699739",
        icon: FaMusic,
        accent: "#00a0e9",
      },
      {
        name: "楽天ミュージック",
        url: "https://music.rakuten.co.jp/link/search/result/ALBUM?q=%20You%20dream%20%26%20mine",
        icon: SiRakuten,
        accent: "#bf0000",
      },
      {
        name: "OTOTOY",
        url: "https://ototoy.jp/find/?q=%20You%20dream%20%26%20mine&search=%E6%A4%9C%E7%B4%A2",
        icon: FaMusic,
        accent: "#111111",
      },
      {
        name: "NetEase Music",
        url: "https://music.163.com/#/search/m/?s=y-Hiyori%20You%20dream%20%26%20mine&type=10",
        icon: FaMusic,
        accent: "#c20c0c",
      },
      {
        name: "QQ Music",
        url: "https://y.qq.com/portal/search.html?t=album&w=y-Hiyori%20You%20dream%20%26%20mine",
        icon: FaMusic,
        accent: "#31c27c",
      },
      {
        name: "music.jp",
        url: "https://music-book.jp/Search?Keyword=y-Hiyori%20You%20dream%20%26%20mine",
        icon: FaMusic,
        accent: "#e5004f",
      },
    ],
    tracks: [
      {
        number: 1,
        title: "You dream & mine",
        artist: "y-Hiyori",
        credits: [
          { role: "Lyricist", names: "y-Hiyori" },
          { role: "Composer", names: "y-Hiyori" },
          { role: "Producer", names: "y-Hiyori" },
          { role: "Recording Engineer", names: "y-Hiyori" },
          { role: "Mixing Engineer", names: "y-Hiyori" },
          { role: "Mastering Engineer", names: "y-Hiyori" },
          { role: "Assistant Engineer", names: "REN" },
          { role: "Guitar", names: "y-Hiyori" },
          { role: "Bass Guitar", names: "y-Hiyori" },
          { role: "Drums", names: "y-Hiyori" },
          { role: "Keyboards", names: "y-Hiyori" },
          { role: "Synthesizer", names: "y-Hiyori" },
          { role: "Vocals", names: "y-Hiyori, REN, SAKI" },
          { role: "Background Vocals", names: "y-Hiyori, REN, MIKOTO, SAKI" },
          { role: "Violin", names: "y-Hiyori" },
          { role: "Songwriter", names: "SAKI" },
        ],
      },
      {
        number: 2,
        title: "You dream & mine (Instrumental)",
        artist: "y-Hiyori",
        credits: [
          { role: "Composer", names: "y-Hiyori" },
          { role: "Producer", names: "y-Hiyori" },
          { role: "Recording Engineer", names: "y-Hiyori" },
          { role: "Mixing Engineer", names: "y-Hiyori" },
          { role: "Mastering Engineer", names: "y-Hiyori" },
          { role: "Assistant Engineer", names: "REN" },
          { role: "Guitar", names: "y-Hiyori" },
          { role: "Bass Guitar", names: "y-Hiyori" },
          { role: "Drums", names: "y-Hiyori" },
          { role: "Keyboards", names: "y-Hiyori" },
          { role: "Synthesizer", names: "y-Hiyori" },
          { role: "Violin", names: "y-Hiyori" },
        ],
      },
    ],
    shorts: {
      title: "You dream & mine",
      url: "https://www.youtube.com/source/Ul6j2uGuKyw/shorts",
    },
  },
];

export function getRelease(slug?: string): Release {
  const found = releases.find((item) => item.slug === slug);
  return found ?? releases[0];
}
