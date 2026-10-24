import type { Localized } from "@/types/content";

/** Free Pexels photos stored locally. Photo pages: https://www.pexels.com/photo/{id}/ */
export type Cover = {
  src: string;
  alt: Localized;
  photoId: number;
};

export const covers: Record<string, Cover> = {
  "whatsapp-follow-up-system": {
    src: "/media/whatsapp-follow-up.jpg",
    photoId: 607812,
    alt: {
      en: "A hand holding a phone open to a folder of messaging apps, including WhatsApp",
      ne: "व्हाट्सएपसहित सन्देश एपहरू खुलेको फोन समातेको हात",
    },
  },
  "weekend-shop-automations": {
    src: "/media/weekend-shop.jpg",
    photoId: 3965545,
    alt: {
      en: "A small clothing shop with garments on a rail and plants in the front",
      ne: "अगाडि बिरुवा र रेलमा लुगा झुन्ड्याइएको सानो पसल",
    },
  },
  "diaspora-clients-without-the-grind": {
    src: "/media/diaspora-desk.jpg",
    photoId: 4458554,
    alt: {
      en: "A person working on a laptop from a quiet room, notebook open beside them",
      ne: "शान्त कोठामा ल्यापटपमा काम गर्दै गरेको व्यक्ति, छेउमा खुला नोटबुक",
    },
  },
  "starlink-puts-carriers-on-notice": {
    src: "/media/starlink-notice.jpg",
    photoId: 30596260,
    alt: {
      en: "Earth at night, with city lights across North America seen from space",
      ne: "अन्तरिक्षबाट देखिएको रातको पृथ्वी, उत्तर अमेरिकाका सहर बत्तीसहित",
    },
  },
  "small-models-for-solo-businesses": {
    src: "/media/small-models.jpg",
    photoId: 1181244,
    alt: {
      en: "A person at a small round table with a laptop and a phone",
      ne: "सानो गोलो टेबलमा ल्यापटप र फोनसहित बसेको व्यक्ति",
    },
  },
  "saves-and-sends-beat-likes": {
    src: "/media/saves-and-sends.jpg",
    photoId: 3585088,
    alt: {
      en: "Hands holding a phone while browsing a grid of photos",
      ne: "फोटोको ग्रिड हेर्दै फोन समातेका हात",
    },
  },
  "whatsapp-is-the-shop": {
    src: "/media/market-shop.jpg",
    photoId: 1307698,
    alt: {
      en: "A small cafe counter with tables, plants, and daylight from the street",
      ne: "सडकको उज्यालो, टेबल र बिरुवा भएको सानो क्याफे काउन्टर",
    },
  },
  "automate-the-second-step": {
    src: "/media/second-step.jpg",
    photoId: 669615,
    alt: {
      en: "Hands taking notes beside a printed page and a laptop",
      ne: "छापिएको पाना र ल्यापटपको छेउमा टिपोट गर्दै गरेका हात",
    },
  },
  "one-offer-one-page": {
    src: "/media/one-page.jpg",
    photoId: 1181467,
    alt: {
      en: "A person working on a single laptop screen at a bright desk",
      ne: "उज्यालो डेस्कमा एउटा ल्यापटप स्क्रिनमा काम गर्दै गरेको व्यक्ति",
    },
  },
  "weekend-automation-stack": {
    src: "/media/weekend-stack.jpg",
    photoId: 574071,
    alt: {
      en: "Hands typing on a laptop at a wooden desk",
      ne: "काठको डेस्कमा ल्यापटपमा टाइप गर्दै गरेका हात",
    },
  },
  "prompts-that-win-work": {
    src: "/media/prompts-notes.jpg",
    photoId: 196644,
    alt: {
      en: "A notebook of page sketches, a pen, and a phone on a wooden table",
      ne: "काठको टेबलमा पानाको स्केच, कलम र फोन भएको नोटबुक",
    },
  },
  "read-ai-news-in-twelve-minutes": {
    src: "/media/reading-news.jpg",
    photoId: 518543,
    alt: {
      en: "A stack of folded newspapers on a stone ledge",
      ne: "ढुङ्गाको छेउमा दोब्रिएका पत्रपत्रिकाको थुप्रो",
    },
  },
  "proposal-prompt": {
    src: "/media/proposal.jpg",
    photoId: 261662,
    alt: {
      en: "Hands writing a short page on a laptop",
      ne: "ल्यापटपमा छोटो पाना लेख्दै गरेका हात",
    },
  },
  "invoice-follow-up-workflow": {
    src: "/media/invoice.jpg",
    photoId: 4386321,
    alt: {
      en: "A notebook, a pen, a phone, and cash laid out on a white table",
      ne: "सेतो टेबलमा नोटबुक, कलम, फोन र नगद",
    },
  },
  "bilingual-caption-template": {
    src: "/media/caption-phone.jpg",
    photoId: 4348401,
    alt: {
      en: "A person laying out visual posts on a laptop at a large table",
      ne: "ठूलो टेबलमा ल्यापटपमा दृश्य पोस्ट मिलाउँदै गरेको व्यक्ति",
    },
  },
  "weekly-content-checklist": {
    src: "/media/checklist.jpg",
    photoId: 3243,
    alt: {
      en: "A handwritten to-do list and a pen on an open calendar",
      ne: "खुला पात्रोमाथि हस्तलिखित कार्यसूची र कलम",
    },
  },
  "solopreneur-tool-stack": {
    src: "/media/tool-stack.jpg",
    photoId: 3183150,
    alt: {
      en: "A wooden table covered with laptops, notebooks, and phones",
      ne: "ल्यापटप, नोटबुक र फोनले भरिएको काठको टेबल",
    },
  },
  about: {
    src: "/media/about-desk.jpg",
    photoId: 733856,
    alt: {
      en: "A person writing in a notebook at a cafe table, with a phone and coffee nearby",
      ne: "क्याफेको टेबलमा नोटबुकमा लेख्दै गरेको व्यक्ति, नजिकै फोन र कफी",
    },
  },
};

export function coverFor(slug: string) {
  return covers[slug];
}
