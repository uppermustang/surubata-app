import type { Localized } from "@/types/content";

export type NewsletterIssue = {
  number: number;
  publishedAt: string;
  title: Localized;
  summary: Localized;
  points: Localized<string[]>;
};

export const newsletterIssues: NewsletterIssue[] = [
  {
    number: 12,
    publishedAt: "2026-10-19",
    title: {
      en: "The second message",
      ne: "दोस्रो सन्देश",
    },
    summary: {
      en: "What to automate if you only touch one thing before Dashain season ends up eating the calendar anyway: the follow-up you keep postponing.",
      ne: "एउटा मात्र कुरा छुने हो भने के स्वचालित बनाउने: तपाईंले सारिरहनुभएको फलोअप।",
    },
    points: {
      en: [
        "Write the first reply yourself.",
        "Let a reminder defend the second one.",
        "Use the invoice workflow on the shelf if the quiet thread is actually a bill.",
      ],
      ne: [
        "पहिलो जवाफ आफैं लेख्नुहोस्।",
        "दोस्रोलाई सम्झनाले जोगाओस्।",
        "शान्त थ्रेड वास्तवमा बिल हो भने दराजको बिल वर्कफ्लो चलाउनुहोस्।",
      ],
    },
  },
  {
    number: 11,
    publishedAt: "2026-10-12",
    title: {
      en: "One page, then the proposal",
      ne: "एउटा पृष्ठ, अनि प्रस्ताव",
    },
    summary: {
      en: "A tired buyer will not tour your site. Give them one offer, one proof, and a proposal that repeats the same facts.",
      ne: "थाकेको किन्नेले तपाईंको साइट घुम्दैन। एउटा अफर, एउटा प्रमाण, र त्यही तथ्य दोहोर्याउने प्रस्ताव दिनुहोस्।",
    },
    points: {
      en: [
        "Cut any section that does not help the next step.",
        "Match the proposal language to the buyer.",
        "Steal the structure from the proposal prompt, then delete the lines you would not say.",
      ],
      ne: [
        "अर्को कदममा नसघाउने खण्ड काट्नुहोस्।",
        "प्रस्तावको भाषा किन्ने मान्छेसँग मिलाउनुहोस्।",
        "प्रस्ताव प्रम्प्टको बनावट लिनुहोस्, अनि मुखले नभन्ने हरफ मेट्नुहोस्।",
      ],
    },
  },
  {
    number: 10,
    publishedAt: "2026-10-05",
    title: {
      en: "Twelve minutes of news",
      ne: "बाह्र मिनेटको समाचार",
    },
    summary: {
      en: "A way to read the AI week without donating your morning. Keep one note. Ignore the rest on purpose.",
      ne: "बिहान नदिई एआईको हप्ता पढ्ने तरिका। एउटा नोट राख्नुहोस्। बाँकी जानी-जानी छाड्नुहोस्।",
    },
    points: {
      en: [
        "Skim headlines for jobs you already do.",
        "Open two pieces at most.",
        "Write the action, or close the tab.",
      ],
      ne: [
        "तपाईंले पहिले नै गर्ने कामका शीर्षक मात्र हेर्नुहोस्।",
        "बढीमा दुई सामग्री खोल्नुहोस्।",
        "काम लेख्नुहोस्, नत्र ट्याब बन्द गर्नुहोस्।",
      ],
    },
  },
];
