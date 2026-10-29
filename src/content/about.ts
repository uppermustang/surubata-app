import type { Localized } from "@/types/content";

/** Sample host profile. Replace the name and biography before launch. */
export const aboutPage = {
  meaning: {
    en: "BotDawn is named for the dawn of everyday AI — a new day for how small teams work.",
    ne: "BotDawn को अर्थ — दैनिक एआईको बिहानी, साना टोलीको कामका लागि नयाँ दिन।",
  },
  storyTitle: { en: "The story", ne: "कथा" },
  story: {
    en: [
      "Nepali creators and small businesses were being handed a global AI conversation that did not match the work. The advice assumed a large team, a Silicon Valley price list, and a customer who reads English at midnight. The actual work looked different: a WhatsApp thread, a diaspora client six time zones away, a shop that has to see the return this month.",
      "BotDawn is a bilingual desk for that work. We brief the news, write the deep guide, and leave the tool where you can copy it.",
    ],
    ne: [
      "नेपाली सिर्जनाकर्ता र साना व्यवसायलाई विश्वको एआई बहस त्यस्तो रूपमा आइरहेको थियो, जुन उनीहरूको कामसँग मिल्दैनथ्यो। सल्लाहले ठूलो टोली, सिलिकन भ्यालीको मूल्यसूची, र मध्यरातमा अङ्ग्रेजी पढ्ने ग्राहक कल्पना गर्थ्यो। वास्तविक काम अर्कै थियो: व्हाट्सएपको थ्रेड, छ समय क्षेत्र परको डायस्पोरा ग्राहक, र यही महिना प्रतिफल देख्नुपर्ने पसल।",
      "BotDawn त्यही कामका लागि द्विभाषिक डेस्क हो। हामी समाचार संक्षेप गर्छौं, गहिरो गाइड लेख्छौं, र औजार त्यहाँ छोड्छौं जहाँबाट तपाईं कपी गर्न सक्नुहुन्छ।",
    ],
  },
  missionTitle: { en: "Mission", ne: "उद्देश्य" },
  mission: {
    en: [
      "Save people time. Give them the next practical step. Treat Nepali and English as equal ways to do serious work.",
    ],
    ne: [
      "मानिसको समय जोगाउने। अर्को व्यावहारिक कदम दिने। नेपाली र अङ्ग्रेजी दुवैलाई गम्भीर कामको समान भाषा मान्ने।",
    ],
  },
  audienceTitle: { en: "Who it is for", ne: "कोका लागि" },
  audience: {
    en: [
      "Solopreneurs, freelancers, local shops, content creators, and Nepali operators in the United States and anywhere else the diaspora works. If you sell a skill or a service with a small team, this desk is for you.",
    ],
    ne: [
      "सोलोप्रेनर, फ्रिलान्सर, स्थानीय पसल, कन्टेन्ट सिर्जनाकर्ता, र अमेरिका लगायत जहाँसुकै काम गर्ने नेपाली सञ्चालकहरू। सानो टोलीले सीप वा सेवा बेच्नुहुन्छ भने यो डेस्क तपाईंका लागि हो।",
    ],
  },
  hostTitle: { en: "The host", ne: "होस्ट" },
  hostName: { en: "BotDawn Host", ne: "BotDawn होस्ट" },
  hostRole: { en: "Practitioner and editor", ne: "अभ्यासकर्ता र सम्पादक" },
  hostBio: {
    en: [
      "I spend my weeks inside client work: proposals, content systems, and the messy threads where a business actually closes. BotDawn is the briefing I wanted on a busy morning — sourced, short, and biased toward what you can ship this week.",
    ],
    ne: [
      "मेरो हप्ता ग्राहकको कामभित्र बित्छ: प्रस्ताव, कन्टेन्ट प्रणाली, र व्यवसाय वास्तवमा टुंगिने अलमलिएका थ्रेड। BotDawn त्यो ब्रिफिङ हो जुन व्यस्त बिहान म आफैं पढ्न चाहन्थें — स्रोतसहित, छोटो, र यही हप्ता पठाउन मिल्ने कुरातिर ढल्केको।",
    ],
  },
  hostNote: {
    en: "Sample profile. Replace the name and story in content/about.ts before launch.",
    ne: "यो नमुना परिचय हो। प्रकाशनअघि content/about.ts मा नाम र कथा बदल्नुहोस्।",
  },
  valuesTitle: { en: "How the desk edits", ne: "डेस्कले कसरी सम्पादन गर्छ" },
  values: [
    {
      title: { en: "Useful over novel", ne: "नयाँभन्दा काम लाग्ने" },
      body: {
        en: "If you cannot act on it this week, it does not lead.",
        ne: "यही हप्ता गर्न सकिँदैन भने त्यो मुख्य हुँदैन।",
      },
    },
    {
      title: { en: "Sources over rumors", ne: "हल्लाभन्दा स्रोत" },
      body: {
        en: "Briefs point outward. We do not republish someone else’s reporting.",
        ne: "ब्रिफले बाहिर देखाउँछ। अरूको रिपोर्टिङ जस्ताको तस्तै छाप्दैनौं।",
      },
    },
    {
      title: { en: "Both languages, same respect", ne: "दुवै भाषा, उही सम्मान" },
      body: {
        en: "Nepali is not a translation afterthought. English is not the only serious version.",
        ne: "नेपाली पछि थपिने अनुवाद होइन। अङ्ग्रेजी मात्र गम्भीर संस्करण होइन।",
      },
    },
  ] satisfies { title: Localized; body: Localized }[],
};
