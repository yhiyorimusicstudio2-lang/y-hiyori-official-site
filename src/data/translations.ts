export type Language = "ja" | "ko" | "en";

type TranslationSchema = {
  nav: {
    discography: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    profileText: string;
    subtitle: string;
    worksCta: string;
    contactCta: string;
  };
  discography: {
    label: string;
    title: string;
    intro: string;
  };
  contact: {
    label: string;
    title: string;
    text: string;
    button: string;
  };
  footer: {
    rights: string;
  };
};

export const translations: Record<Language, TranslationSchema> = {
  ja: {
    nav: {
      discography: "Discography",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Composer / Track Maker / Producer",
      profileText: "現在17歳でK-popアーティストに楽曲提供を目標に活動しています。",
      subtitle:
        "一曲に複数のジャンルを配合したダンス曲を得意とし、主にK-popスタイルのサウンドを作るトラックメーカー",
      worksCta: "作品を見る",
      contactCta: "お問い合わせ",
    },
    discography: {
  label: "Discography",
  title: "参加した作品",
  intro: "",
},
    contact: {
      label: "Contact",
      title: "制作依頼・お問い合わせ",
      text:
        "楽曲提供、共同制作、アーティスト案件などのお問い合わせはこちらからお願いいたします。",
      button: "お問い合わせ",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },

  ko: {
    nav: {
      discography: "Discography",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Composer / Track Maker / Producer",
      profileText:
        "현재 17세이며, K-pop 아티스트에게 곡을 제공하는 것을 목표로 활동하고 있습니다.",
      subtitle:
        "한 곡 안에 여러 장르를 조합한 댄스곡을 강점으로 하며, 주로 K-pop 스타일의 사운드를 만드는 트랙메이커입니다.",
      worksCta: "작품 보기",
      contactCta: "문의하기",
    },
    discography: {
  label: "Discography",
  title: "참여 작품",
  intro: "",
},
    contact: {
      label: "Contact",
      title: "문의 및 협업",
      text:
        "곡 작업, 공동 제작, 아티스트 프로젝트 관련 문의는 아래를 통해 연락 부탁드립니다.",
      button: "문의하기",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },

  en: {
    nav: {
      discography: "Discography",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Composer / Track Maker / Producer",
      profileText:
        "Currently 17 years old, working toward the goal of providing songs for K-pop artists.",
      subtitle:
        "A track maker specializing in dance music that blends multiple genres within a single song, mainly creating K-pop style sounds.",
      worksCta: "View Works",
      contactCta: "Contact",
    },
    discography: {
  label: "Discography",
  title: "Participated Works",
  intro: "",
},
    contact: {
      label: "Contact",
      title: "Work & Inquiries",
      text:
        "For song placements, collaborations, artist projects, and other inquiries, please get in touch below.",
      button: "Contact Me",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },
};