export type Language = "ja" | "ko" | "en";

type TranslationSchema = {
  nav: {
    discography: string;
    contact: string;
    backHome: string;
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
  };
  contactSection: {
    label: string;
    title: string;
    text: string;
    button: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    description: string;
    typeLabel: string;
    typePlaceholder: string;
    typeIndividual: string;
    typeCompany: string;
    name: string;
    companyName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    phoneOptional: string;
    nextToConfirm: string;
    backToEdit: string;
    finalSubmit: string;
    sending: string;
    success: string;
    error: string;
    configError: string;
    confirmTitle: string;
    confirmDescription: string;
    fieldRequired: string;
    placeholderSubjectIndividual: string;
    placeholderSubjectCompany: string;
    placeholderMessageIndividual: string;
    placeholderMessageCompany: string;
  };
  validation: {
    selectInquiryType: string;
    requiredName: string;
    requiredCompanyName: string;
    requiredEmail: string;
    invalidEmail: string;
    requiredSubject: string;
    requiredMessage: string;
  };
  modal: {
    detail: string;
    close: string;
  };
  footer: {
    rights: string;
  };
};

export const translations: Record<Language, TranslationSchema> = {
  ja: {
    nav: {
      discography: "参加楽曲",
      contact: "お問い合わせ",
      backHome: "トップへ戻る",
    },
    hero: {
      eyebrow: "Composer / Track Maker / Producer",
      profileText:
        "現在17歳でK-popアーティストに楽曲提供を目標に活動しています。",
      subtitle:
        "一曲に複数のジャンルを配合したダンス曲を得意とし、主にK-popスタイルのサウンドを作るトラックメーカー",
      worksCta: "作品を見る",
      contactCta: "お問い合わせ",
    },
    discography: {
      label: "Discography",
      title: "参加した作品",
    },
    contactSection: {
      label: "Contact",
      title: "お問い合わせ",
      text:
        "制作依頼、共同制作、楽曲提供のご相談などは、専用フォームからご連絡ください。",
      button: "お問い合わせへ進む",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "お問い合わせ入力",
      description:
        "お問い合わせ区分を選択したうえで、必要事項をご入力ください。",
      typeLabel: "お問い合わせ区分",
      typePlaceholder: "区分を選択してください",
      typeIndividual: "個人",
      typeCompany: "法人",
      name: "お名前",
      companyName: "法人名",
      email: "返信用メールアドレス",
      phone: "電話番号",
      subject: "要件",
      message: "内容",
      phoneOptional: "電話番号（任意）",
      nextToConfirm: "確認画面へ進む",
      backToEdit: "入力に戻る",
      finalSubmit: "送信完了",
      sending: "送信中...",
      success: "送信が完了しました。",
      error: "送信に失敗しました。時間をおいて再度お試しください。",
      configError: "EmailJSの設定が未完了です。",
      confirmTitle: "入力内容の確認",
      confirmDescription: "以下の内容で送信してよろしいですか？",
      fieldRequired: "必須",
      placeholderSubjectIndividual: "例：楽曲制作のご相談",
      placeholderSubjectCompany: "例：法人案件のご相談",
      placeholderMessageIndividual:
        "ご依頼内容、ご希望のテイスト、納期などをご記入ください。",
      placeholderMessageCompany:
        "案件概要、用途、スケジュール、ご希望の内容などをご記入ください。",
    },
    validation: {
      selectInquiryType: "お問い合わせ区分を選択してください。",
      requiredName: "お名前を入力してください。",
      requiredCompanyName: "法人名を入力してください。",
      requiredEmail: "メールアドレスを入力してください。",
      invalidEmail: "正しいメールアドレスを入力してください。",
      requiredSubject: "要件を入力してください。",
      requiredMessage: "内容を入力してください。",
    },
    modal: {
      detail: "作品詳細",
      close: "閉じる",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },

  ko: {
    nav: {
  discography: "디스코그래피",
  contact: "문의하기",
  backHome: "홈으로 돌아가기",
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
    },
    contactSection: {
      label: "Contact",
      title: "문의하기",
      text:
        "작업 의뢰, 공동 제작, 곡 제공 관련 문의는 전용 양식을 통해 연락 부탁드립니다.",
      button: "문의 페이지로 이동",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "문의 입력",
      description:
        "문의 구분을 선택한 뒤 필요한 내용을 입력해 주세요.",
      typeLabel: "문의 구분",
      typePlaceholder: "구분을 선택해 주세요",
      typeIndividual: "개인",
      typeCompany: "법인",
      name: "이름",
      companyName: "법인명",
      email: "회신용 이메일",
      phone: "전화번호",
      subject: "용건",
      message: "내용",
      phoneOptional: "전화번호 (선택)",
      nextToConfirm: "확인 화면으로",
      backToEdit: "수정하기",
      finalSubmit: "전송 완료",
      sending: "전송 중...",
      success: "전송이 완료되었습니다.",
      error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      configError: "EmailJS 설정이 완료되지 않았습니다.",
      confirmTitle: "입력 내용 확인",
      confirmDescription: "아래 내용으로 전송하시겠습니까?",
      fieldRequired: "필수",
      placeholderSubjectIndividual: "예: 곡 작업 문의",
      placeholderSubjectCompany: "예: 법인 프로젝트 문의",
      placeholderMessageIndividual:
        "원하시는 작업 내용, 분위기, 일정 등을 입력해 주세요.",
      placeholderMessageCompany:
        "프로젝트 개요, 용도, 일정, 요청사항 등을 입력해 주세요.",
    },
    validation: {
      selectInquiryType: "문의 구분을 선택해 주세요.",
      requiredName: "이름을 입력해 주세요.",
      requiredCompanyName: "법인명을 입력해 주세요.",
      requiredEmail: "이메일을 입력해 주세요.",
      invalidEmail: "올바른 이메일 주소를 입력해 주세요.",
      requiredSubject: "용건을 입력해 주세요.",
      requiredMessage: "내용을 입력해 주세요.",
    },
    modal: {
      detail: "작품 상세",
      close: "닫기",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },

  en: {
    nav: {
      discography: "Discography",
      contact: "Contact",
      backHome: "Back to Home",
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
    },
    contactSection: {
      label: "Contact",
      title: "Contact",
      text:
        "For commissions, collaborations, and music inquiries, please use the dedicated form.",
      button: "Go to Contact Form",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Contact Form",
      description:
        "Please select the inquiry type and fill in the required information.",
      typeLabel: "Inquiry Type",
      typePlaceholder: "Please select a type",
      typeIndividual: "Individual",
      typeCompany: "Company",
      name: "Name",
      companyName: "Company Name",
      email: "Reply Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Message",
      phoneOptional: "Phone Number (Optional)",
      nextToConfirm: "Review Details",
      backToEdit: "Back to Edit",
      finalSubmit: "Send",
      sending: "Sending...",
      success: "Your message has been sent.",
      error: "Failed to send. Please try again later.",
      configError: "EmailJS is not configured yet.",
      confirmTitle: "Review Your Message",
      confirmDescription: "Please confirm the details below before sending.",
      fieldRequired: "Required",
      placeholderSubjectIndividual: "e.g. Music production inquiry",
      placeholderSubjectCompany: "e.g. Corporate project inquiry",
      placeholderMessageIndividual:
        "Please describe your request, preferred style, and deadline.",
      placeholderMessageCompany:
        "Please share the project outline, usage, schedule, and request details.",
    },
    validation: {
      selectInquiryType: "Please select an inquiry type.",
      requiredName: "Please enter your name.",
      requiredCompanyName: "Please enter your company name.",
      requiredEmail: "Please enter your email address.",
      invalidEmail: "Please enter a valid email address.",
      requiredSubject: "Please enter a subject.",
      requiredMessage: "Please enter your message.",
    },
    modal: {
      detail: "Work Detail",
      close: "Close",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
  },
};