import type { CategoryId, Localized, RegionId } from "@/types/content";

export type NewsItem = {
  slug: string;
  title: Localized;
  summary: Localized;
  tldr: Localized;
  whyItMatters?: Localized;
  sourceName: string;
  sourceUrl: string;
  category: CategoryId;
  region: RegionId;
  publishedAt: string;
  tags: string[];
};

/** Original sample briefs. They are not republished articles. */
export const news: NewsItem[] = [
  {
    slug: "starlink-puts-carriers-on-notice",
    title: {
      en: "Starlink just put AT&T, T-Mobile, and Verizon on notice",
      ne: "स्टारलिंकले एटी एन्ड टी, टी-मोबाइल र भेरिजोनलाई सीधै चुनौती दियो",
    },
    summary: {
      en: "Elon Musk’s SpaceX says Starlink Mobile can become a major US carrier. It bought low-band airwaves that reach through walls, and regulators cleared a plan for 15,000 satellites that talk to ordinary phones. That is a bid for the customers AT&T, T-Mobile, and Verizon already have — in the city, indoors, and on the road with no tower.",
      ne: "एलन मस्कको स्पेसएक्स भन्छ, स्टारलिंक मोबाइल अमेरिकाको ठूलो फोन कम्पनी बन्न सक्छ। उसले भित्ता छेडिने तल्लो ब्याण्डको तरंग किन्यो, र नियामकले सामान्य फोनसँग बोल्ने १५ हजार उपग्रहको योजना स्वीकृत गर्‍यो। यो एटी एन्ड टी, टी-मोबाइल र भेरिजोनका ग्राहककै लागि हो — सहरमा, घरभित्र, र टावर नभएको सडकमा।",
    },
    tldr: {
      en: "The satellite company wants the phone plan, not only the dead zone.",
      ne: "स्याटेलाइट कम्पनीले मृत क्षेत्र होइन, फोन योजना नै चाहेको छ।",
    },
    whyItMatters: {
      en: "The three carriers already stood up a satellite project of their own, and their shares moved when the airwaves deal landed. They still hold far more spectrum, plus the towers and the plans people pay for, so a true rival is years off. If your number or your clients sit on a US line, wait for a Starlink plan on a phone you already own — no dish on the roof — before you switch anything.",
      ne: "ती तीन कम्पनीले आफ्नै स्याटेलाइट आयोजना खडा गरिसकेका छन्, र तरंगको सम्झौता आउँदा उनीहरूको सेयर हल्लियो। उनीहरूसँग अझै धेरै स्पेक्ट्रम, टावर र मानिसले तिरिरहेको योजना छ, त्यसैले साँचो प्रतिद्वन्द्वी बन्न वर्षौं लाग्छ। तपाईंको नम्बर वा ग्राहक अमेरिकी लाइनमा छन् भने, छानामुनि डिस नराखी आफ्नै फोनमा चल्ने स्टारलिंक योजना नआउन्जेल अहिलेको लाइन नै राख्नुहोस्।",
    },
    sourceName: "The Verge",
    sourceUrl: "https://www.theverge.com/science/1008467/spacex-announces-plan-to-become-a-major-mobile-carrier",
    category: "startups",
    region: "silicon-valley",
    publishedAt: "2026-10-23",
    tags: ["mobile"],
  },
  {
    slug: "small-models-for-solo-businesses",
    title: {
      en: "Small models are finally cheap enough for a one-person desk",
      ne: "सानो मोडेल अब एकजनाको डेस्कले धान्न सक्ने सस्तो भयो",
    },
    summary: {
      en: "The useful shift is not a smarter chatbot. It is a model you can afford to run on questions you already answer: prices, delivery windows, booking rules. If those answers live in one document, a small model can recite them without a premium seat for every person on the team.",
      ne: "काम लाग्ने परिवर्तन अझ चलाख च्याटबट होइन। मूल्य, डेलिभरी समय र बुकिङ नियम जस्ता तपाईंले पहिले नै दिने जवाफमा चलाउन सक्ने सस्तो मोडेल हो। ती जवाफ एउटै कागजमा छन् भने सानो मोडेलले टोलीको हरेकलाई महँगो सिट नकिनी दोहोर्याउन सक्छ।",
    },
    tldr: {
      en: "Buy memory and a source document before you buy a premium assistant.",
      ne: "महँगो सहायक किन्नुअघि स्मृति र स्रोत कागज बनाउनुहोस्।",
    },
    whyItMatters: {
      en: "Nepali service businesses often share one login or skip tools because per-seat prices do not fit the margin. A small model plus a tight FAQ beats an assistant you open twice a month.",
      ne: "नेपाली सेवा व्यवसायले प्रायः एउटै लगइन बाँड्छन् वा प्रति सिट मूल्य नमिल्दा औजारै छाड्छन्। कसेको प्रश्नोत्तरसहितको सानो मोडेल महिनामा दुई पटक खोल्ने सहायकभन्दा राम्रो हो।",
    },
    sourceName: "OpenAI newsroom",
    sourceUrl: "https://openai.com/news/",
    category: "ai-tools",
    region: "silicon-valley",
    publishedAt: "2026-10-23",
    tags: ["ai", "productivity"],
  },
  {
    slug: "saves-and-sends-beat-likes",
    title: {
      en: "Write for saves and sends, not for likes",
      ne: "लाइकका लागि होइन, सेभ र पठाउनका लागि लेख्नुहोस्",
    },
    summary: {
      en: "A like is a nod. A save means someone kept the post for later. A send means they passed it to a person who might buy. Captions that earn those actions are checklists, scripts, and before-and-after notes from a real job — not a slogan about hustle.",
      ne: "लाइक टाउको हल्लाउनु हो। सेभ भनेको पछिका लागि राख्नु हो। सेन्ड भनेको किन्न सक्ने मान्छेकहाँ पठाउनु हो। ती काम कमाउने क्याप्सन चेकलिस्ट, स्क्रिप्ट र वास्तविक कामको अघि-पछि हुन् — मिहिनेतको नारा होइनन्।",
    },
    tldr: {
      en: "If a post cannot be forwarded, it is not doing sales work.",
      ne: "पठाउन नमिल्ने पोस्टले बिक्रीको काम गरिरहेको छैन।",
    },
    whyItMatters: {
      en: "Diaspora clients and local customers both discover Nepali businesses in an inbox. A post that gets forwarded on WhatsApp is the metric that matches how the sale actually happens.",
      ne: "डायस्पोरा ग्राहक र स्थानीय ग्राहक दुवैले नेपाली व्यवसाय इनबक्समा भेट्छन्। व्हाट्सएपमा फर्वार्ड हुने पोस्ट नै बिक्रीको वास्तविक मापन हो।",
    },
    sourceName: "Instagram for creators",
    sourceUrl: "https://creators.instagram.com/",
    category: "social-media",
    region: "global",
    publishedAt: "2026-10-22",
    tags: ["social-media", "content"],
  },
  {
    slug: "whatsapp-is-the-shop",
    title: {
      en: "The shop is still the WhatsApp thread",
      ne: "पसल अझै व्हाट्सएपको थ्रेड नै हो",
    },
    summary: {
      en: "New storefronts keep launching. Most Nepali sales conversations still start and stall in chat: a photo, a price, “I will think,” then silence. Another catalog does not fix that. A follow-up you actually send tomorrow does.",
      ne: "नयाँ स्टोरफ्रन्ट आइरहन्छन्। धेरै नेपाली बिक्री अझै च्याटमै सुरु भएर अड्किन्छ: फोटो, मूल्य, “सोच्छु,” अनि चुप। अर्को क्याटलगले त्यो ठीक गर्दैन। भोलि साँच्चै पठाइने फलोअपले गर्छ।",
    },
    tldr: {
      en: "Automate the second message before you automate the storefront.",
      ne: "स्टोरफ्रन्ट स्वचालित बनाउनुअघि दोस्रो सन्देश मिलाउनुहोस्।",
    },
    whyItMatters: {
      en: "If you only fix one leak this month, fix the forgotten follow-up. The first message should stay human. The silence after it is where the money sits.",
      ne: "यो महिना एउटा चुहावट मात्र टाल्ने हो भने बिर्सिएको फलोअप टाल्नुहोस्। पहिलो सन्देश मानवीय रहोस्। त्यसपछिको चुपमा पैसा बसेको हुन्छ।",
    },
    sourceName: "Online Khabar",
    sourceUrl: "https://english.onlinekhabar.com/",
    category: "nepal-tech",
    region: "nepal",
    publishedAt: "2026-10-21",
    tags: ["whatsapp", "nepal", "clients"],
  },
  {
    slug: "automate-the-second-step",
    title: {
      en: "Automate the second step, not the messy first one",
      ne: "अलमलिएको पहिलो होइन, दोस्रो कदम स्वचालित बनाउनुहोस्",
    },
    summary: {
      en: "The first step of a job is usually judgment: is this lead real, is the tone right, is the price fair. The second step is clerical: file the note, set the reminder, drop in the template. Tools fail when they are asked to do step one. They pay for themselves on step two.",
      ne: "कामको पहिलो कदम प्रायः निर्णय हो: लिड साँचो हो कि होइन, लबज मिल्छ कि मिल्दैन, मूल्य ठिक छ कि छैन। दोस्रो कदम लिपिकीय हो: नोट राख्ने, सम्झना सेट गर्ने, टेम्प्लेट हाल्ने। पहिलो कदम माग्दा औजार चुक्छन्। दोस्रो कदममा तिनीहरूले आफ्नो खर्च उठाउँछन्।",
    },
    tldr: {
      en: "Judgment stays with you. Filing and reminding can leave.",
      ne: "निर्णय तपाईंसँग रहोस्। फाइल र सम्झना जान सक्छन्।",
    },
    whyItMatters: {
      en: "Small teams do not have an operations hire. They do have an evening lost to copy-paste. Move only the copy-paste.",
      ne: "सानो टोलीसँग अपरेसन कर्मचारी हुँदैन। कपी-पेस्टमा हराएको बेलुका हुन्छ। कपी-पेस्ट मात्र सार्नुहोस्।",
    },
    sourceName: "The Verge AI",
    sourceUrl: "https://www.theverge.com/ai-artificial-intelligence",
    category: "automation",
    region: "global",
    publishedAt: "2026-10-20",
    tags: ["automation", "productivity"],
  },
  {
    slug: "one-offer-one-page",
    title: {
      en: "The page that sells is still one offer, one proof, one next step",
      ne: "बेच्ने पृष्ठ अझै एउटा अफर, एउटा प्रमाण, एउटा अर्को कदम हो",
    },
    summary: {
      en: "A pattern that keeps surviving new tools: a single page that says who it is for, what changes after they buy, proof from a finished job, and one way to start. Extra sections rarely repair a fuzzy offer. They only give the reader more places to leave.",
      ne: "नयाँ औजारपछि पनि बाँच्ने ढाँचा: कसका लागि हो, किनेपछि के बदलिन्छ, सकिएको कामको प्रमाण, र सुरु गर्ने एउटा बाटो भन्ने एउटै पृष्ठ। थप खण्डले धमिलो अफर कमै ठीक गर्छ। पाठकलाई निस्किने थप ढोका मात्र दिन्छ।",
    },
    tldr: {
      en: "Clarify the offer before you redesign the site.",
      ne: "साइट फेर्नुअघि अफर प्रस्ट पार्नुहोस्।",
    },
    whyItMatters: {
      en: "A freelancer serving US clients from Nepal does not need a bigger website. They need a page a tired buyer can finish on a phone, then a proposal that matches it.",
      ne: "नेपालबाट अमेरिकी ग्राहकलाई सेवा दिने फ्रिलान्सरलाई ठूलो वेबसाइट चाहिँदैन। थाकेको किन्नेले फोनमा सक्ने पृष्ठ, अनि त्यसैसित मिल्ने प्रस्ताव चाहिन्छ।",
    },
    sourceName: "TechCrunch",
    sourceUrl: "https://techcrunch.com/category/startups/",
    category: "startups",
    region: "silicon-valley",
    publishedAt: "2026-10-18",
    tags: ["offers", "clients", "content"],
  },
];
