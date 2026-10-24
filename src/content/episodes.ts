import type { Localized } from "@/types/content";

export type Episode = {
  slug: string;
  title: Localized;
  description: Localized;
  publishedAt: string;
  durationMinutes: number;
  seriesId: string;
  series: Localized;
  guest?: Localized;
  youtubeId?: string;
  videoUrl?: string;
  /** Free stand-in footage, not the real episode. */
  sample?: boolean;
  audioUrl?: string;
  takeaways: Localized<string[]>;
  timestamps: { seconds: number; label: Localized }[];
  transcript: Localized<string[]>;
  resourceSlugs: string[];
  tags: string[];
  popular?: boolean;
};

/** Sample episodes. Demo clips are public YouTube embeds until the real cut exists. */
export const episodes: Episode[] = [
  {
    slug: "whatsapp-follow-up-system",
    title: {
      en: "The follow-up system for people who sell on WhatsApp",
      ne: "व्हाट्सएपमा बेच्नेहरूका लागि फलोअप प्रणाली",
    },
    description: {
      en: "Capture the lead, send a human first reply, and stop losing the second message. The only automation most service businesses need.",
      ne: "लिड टिप्नुहोस्, पहिलो जवाफ मान्छेले नै दिनुहोस्, र दोस्रो सन्देश हराउन बन्द गर्नुहोस्। अधिकांश सेवा व्यवसायलाई चाहिने एउटै अटोमेसन।",
    },
    publishedAt: "2026-10-21",
    durationMinutes: 18,
    seriesId: "practical-stack",
    series: { en: "Practical Stack", ne: "व्यावहारिक स्ट्याक" },
    youtubeId: "lzJgcZh9b2w",
    sample: true,
    takeaways: {
      en: [
        "Write the first reply yourself. Automate the reminder.",
        "Three templates cover most threads: price, proof, and still thinking.",
        "A row in a sheet beats a CRM you will not open.",
      ],
      ne: [
        "पहिलो जवाफ आफैं लेख्नुहोस्। सम्झना मात्र स्वचालित बनाउनुहोस्।",
        "धेरै थ्रेडलाई तीन टेम्प्लेट पुग्छ: मूल्य, प्रमाण, र अझै सोचिरहेको।",
        "नखोल्ने सीआरएमभन्दा एउटा पानाको हरफ राम्रो हो।",
      ],
    },
    timestamps: [
      { seconds: 0, label: { en: "Why the second message is the product", ne: "दोस्रो सन्देश नै उत्पादन हो" } },
      { seconds: 140, label: { en: "The three-column memory", ne: "तीन खाने स्मृति" } },
      { seconds: 420, label: { en: "Price, proof, still thinking", ne: "मूल्य, प्रमाण, अझै सोच" } },
      { seconds: 780, label: { en: "What not to automate", ne: "के स्वचालित नबनाउने" } },
    ],
    transcript: {
      en: [
        "Most of the money in a service business is not in the first hello. It is in the message you meant to send tomorrow and did not. The thread goes quiet, you feel rude following up, and the person hires whoever answered on Thursday.",
        "The system is small. A sheet with name, next step, and date. You write the first reply in your own words, the same day. An automation does not send that reply. It only pings you when the date arrives and the row has not moved.",
        "Keep three drafts nearby. One states the price and what it includes. One shows proof from a finished job. One is a short, human note for the person who said they would think about it. Edit every time. The draft is a start, not a mask.",
        "Do not automate the judgment. A bot that quotes a custom job, or that pretends to be you at 11pm, will cost more than the lead it saves. The machine’s job is memory. Yours is the reply.",
      ],
      ne: [
        "सेवा व्यवसायको धेरै पैसा पहिलो नमस्तेमा हुँदैन। भोलि पठाउँछु भनेर नपठाएको सन्देशमा हुन्छ। थ्रेड शान्त हुन्छ, फलोअप गर्न अप्ठ्यारो लाग्छ, र बिहीबार जवाफ दिनेलाई काम जान्छ।",
        "प्रणाली सानो छ। नाम, अर्को कदम र मितिको एउटा पाना। पहिलो जवाफ त्यही दिन आफ्नै शब्दमा लेख्नुहोस्। अटोमेसनले त्यो जवाफ पठाउँदैन। मिति आएर हरफ नचलेको बेला तपाईंलाई मात्र सम्झाउँछ।",
        "नजिक तीन मस्यौदा राख्नुहोस्। एउटाले मूल्य र के पर्छ भन्छ। एउटाले सकिएको कामको प्रमाण देखाउँछ। एउटाले सोचिरहेको मान्छेलाई छोटो, मानवीय टिप्पणी गर्छ। हरेक पटक मिलाउनुहोस्। मस्यौदा सुरुवात हो, मुखुण्डो होइन।",
        "निर्णय स्वचालित नबनाउनुहोस्। कस्टम कामको मूल्य भन्ने वा राति ११ बजे तपाईं जस्तो देखिने बोटले जोगाएको लिडभन्दा बढी खर्च गर्छ। मेसिनको काम स्मृति हो। जवाफ तपाईंको हो।",
      ],
    },
    resourceSlugs: ["invoice-follow-up-workflow", "proposal-prompt"],
    tags: ["whatsapp", "automation", "clients"],
    popular: true,
  },
  {
    slug: "weekend-shop-automations",
    title: {
      en: "Five automations a small shop can set up on Saturday",
      ne: "सानो पसलले शनिबार राख्न सक्ने पाँच अटोमेसन",
    },
    description: {
      en: "A four-hour setup for reminders, invoice nudges, caption drafts, FAQ answers, and a weekly review. No new platform required.",
      ne: "सम्झना, बिलको धक्का, क्याप्सनको मस्यौदा, बारम्बारका प्रश्न र साप्ताहिक समीक्षाका लागि चार घण्टाको सेटअप। नयाँ प्लेटफर्म चाहिँदैन।",
    },
    publishedAt: "2026-10-14",
    durationMinutes: 24,
    seriesId: "practical-stack",
    series: { en: "Practical Stack", ne: "व्यावहारिक स्ट्याक" },
    youtubeId: "ZOAszesMBGc",
    sample: true,
    takeaways: {
      en: [
        "Pick chores you already repeat. Do not invent a new process for the tool.",
        "One source document should hold prices, policies, and stock answers.",
        "If you ignore an automation twice, delete it.",
      ],
      ne: [
        "पहिले नै दोहोरिने काम छान्नुहोस्। औजारका लागि नयाँ प्रक्रिया नबनाउनुहोस्।",
        "मूल्य, नियम र तयार जवाफ एउटै स्रोत कागजमा हुनुपर्छ।",
        "अटोमेसन दुई पटक बेवास्ता गर्नुभयो भने मेट्नुहोस्।",
      ],
    },
    timestamps: [
      { seconds: 0, label: { en: "The Saturday limit", ne: "शनिबारको सीमा" } },
      { seconds: 180, label: { en: "Reminder, not message", ne: "सन्देश होइन, सम्झना" } },
      { seconds: 560, label: { en: "Invoice nudge", ne: "बिलको धक्का" } },
      { seconds: 980, label: { en: "The monthly cleanup", ne: "मासिक सफाइ" } },
    ],
    transcript: {
      en: [
        "Give the setup a hard stop. Four hours, then you close the laptop. A shop does not get more reliable because you spent Sunday connecting a sixth app.",
        "Automation one is a reminder for quiet leads. Automation two drafts the invoice follow-up but does not send it. Automation three turns one finished job into a caption draft. Automation four answers only the questions you have already written down. Automation five is a Friday note: which rows moved, which automations you ignored.",
        "Everything reads from one document. If the price changes, you change it there. Tools that keep their own copy of your policy will be wrong by next month.",
        "The test on Monday is rude and useful. Did any of this save a real minute, or did it only create a new inbox? Keep the ones that saved a minute.",
      ],
      ne: [
        "सेटअपलाई कडा समय दिनुहोस्। चार घण्टा, अनि ल्यापटप बन्द। छैटौं एप जोडेर आइतबार बिताउँदा पसल भरपर्दो हुँदैन।",
        "पहिलो अटोमेसन शान्त लिडको सम्झना हो। दोस्रोले बिल फलोअपको मस्यौदा बनाउँछ, पठाउँदैन। तेस्रोले सकिएको कामबाट क्याप्सनको मस्यौदा निकाल्छ। चौथोले तपाईंले पहिले नै लेखेका प्रश्न मात्र जवाफ दिन्छ। पाँचौं शुक्रबारको टिप्पणी हो: कुन हरफ चल्यो, कुन अटोमेसन बेवास्ता भयो।",
        "सबैले एउटै कागज पढ्छन्। मूल्य बदलिए त्यहीँ बदल्नुहोस्। तपाईंको नियमको आफ्नै प्रति राख्ने औजार अर्को महिनासम्म गलत हुन्छ।",
        "सोमबारको परीक्षा कठोर र काम लाग्ने छ। के यसले साँचै एक मिनेट जोगायो, कि नयाँ इनबक्स मात्र बनायो? मिनेट जोगाउनेलाई राख्नुहोस्।",
      ],
    },
    resourceSlugs: ["solopreneur-tool-stack", "weekly-content-checklist", "invoice-follow-up-workflow"],
    tags: ["automation", "productivity", "nepal"],
    popular: true,
  },
  {
    slug: "diaspora-clients-without-the-grind",
    title: {
      en: "Serving diaspora clients without working all night",
      ne: "रातभर नबसी डायस्पोरा ग्राहकलाई सेवा",
    },
    description: {
      en: "Hours, proposals, and async updates when the client is in the US and you are in Nepal. A guest episode on boundaries that still feel responsive.",
      ne: "ग्राहक अमेरिकामा र तपाईं नेपालमा हुँदा समय, प्रस्ताव र असिनक्रोन अपडेट। जवाफदेही लाग्ने सीमाको अतिथि एपिसोड।",
    },
    publishedAt: "2026-10-07",
    durationMinutes: 27,
    seriesId: "nepal-desk",
    series: { en: "Nepal Desk", ne: "नेपाल डेस्क" },
    youtubeId: "LN6dGGBfDYs",
    sample: true,
    guest: {
      en: "A diaspora-client operator",
      ne: "डायस्पोरा ग्राहकसँग काम गर्ने सञ्चालक",
    },
    takeaways: {
      en: [
        "Publish your hours in both time zones once, then repeat them in the proposal.",
        "Async updates beat instant replies that arrive at 1am.",
        "A standing agenda keeps the call short enough to protect the evening.",
      ],
      ne: [
        "दुवै समय क्षेत्रको समय एक पटक लेख्नुहोस्, अनि प्रस्तावमा दोहोर्याउनुहोस्।",
        "राति १ बजेको तत्काल जवाफभन्दा असिनक्रोन अपडेट राम्रो हो।",
        "तय एजेन्डाले कल छोटो राख्छ र बेलुका जोगाउँछ।",
      ],
    },
    timestamps: [
      { seconds: 0, label: { en: "The overnight trap", ne: "रातभरको पासो" } },
      { seconds: 240, label: { en: "Hours on the proposal", ne: "प्रस्तावमा समय" } },
      { seconds: 700, label: { en: "The async update", ne: "असिनक्रोन अपडेट" } },
      { seconds: 1100, label: { en: "What the guest stopped doing", ne: "अतिथिले के छोडे" } },
    ],
    transcript: {
      en: [
        "The trap is politeness. A client in the US sends a note at their lunch, which is your evening, and you answer because silence feels like losing the job. A month later you are tired and the work is worse.",
        "Put the working window in the proposal in both clocks. Say when you reply, and what counts as urgent. People respect a rule they saw before they paid more than a rule you invent when you are exhausted.",
        "Replace the late-night reply with a morning update: what moved, what is blocked, what you need. Record a short voice note if typing will drag you back into the thread. The client wants progress, not proof that you are awake.",
        "Our guest stopped taking discovery calls without an agenda. The call is twenty-five minutes. Decisions go into the notes the same day. That single boundary returned the evening, which is when the actual craft happens.",
      ],
      ne: [
        "पासो विनम्रता हो। अमेरिकाको ग्राहकले आफ्नो खाजाको बेला लेख्छन्, त्यो तपाईंको बेलुका हो, र चुप लाग्दा काम जाने डरले जवाफ दिनुहुन्छ। एक महिनापछि थकान लाग्छ र काम कमजोर हुन्छ।",
        "प्रस्तावमा काम गर्ने समय दुवै घडीमा लेख्नुहोस्। कहिले जवाफ आउँछ, र के चाँडो हो। थाकेर बनाएको नियमभन्दा पैसा तिर्नुअघि देखेको नियम मानिसले मान्छन्।",
        "रातिको जवाफलाई बिहानको अपडेटले बदल्नुहोस्: के अघि बढ्यो, के अड्कियो, के चाहिन्छ। टाइपले फेरि थ्रेडमा तान्छ भने छोटो भ्वाइस नोट राख्नुहोस्। ग्राहकलाई प्रगति चाहिन्छ, तपाईं ब्यूँझनुभएको प्रमाण होइन।",
        "हाम्रा अतिथिले एजेन्डाबिना डिस्कभरी कल लिन छाडे। कल पच्चिस मिनेटको हो। निर्णय त्यही दिन नोटमा जान्छ। त्यसै सीमाबाट बेलुका फर्कियो, जहाँ असली सीप बन्छ।",
      ],
    },
    resourceSlugs: ["proposal-prompt", "bilingual-caption-template"],
    tags: ["diaspora", "clients", "proposals"],
    popular: false,
  },
];
