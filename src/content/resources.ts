import type { CategoryId, Localized, ResourceType } from "@/types/content";

export type Resource = {
  slug: string;
  title: Localized;
  description: Localized;
  howTo: Localized;
  body: Localized;
  category: CategoryId;
  type: ResourceType;
  tags: string[];
  usageCount: number;
  updatedAt: string;
};

/** Sample copy-ready tools. usageCount only ranks the “most used” shelf. */
export const resources: Resource[] = [
  {
    slug: "proposal-prompt",
    title: {
      en: "Proposal prompt that sounds like you",
      ne: "तपाईं जस्तै सुनिने प्रस्ताव प्रम्प्ट",
    },
    description: {
      en: "A brief you paste into a chat model before it drafts a client proposal. It asks for their words, your constraints, and a short page.",
      ne: "च्याट मोडेलले प्रस्ताव लेख्नुअघि टाँस्ने संक्षिप्त निर्देशन। यसले ग्राहकको शब्द, तपाईंको सीमा र छोटो पृष्ठ माग्छ।",
    },
    howTo: {
      en: "Replace the brackets with notes from the real conversation. Delete any sentence you would not say out loud.",
      ne: "कोष्ठकमा वास्तविक कुराकानीका नोट राख्नुहोस्। मुखले नभन्ने वाक्य मेट्नुहोस्।",
    },
    body: {
      en: `You are drafting a proposal for my one-person service business. Write in my voice: plain, specific, no hype.

Client: [name and where they are]
What they asked for, in their words: [paste]
What I will actually do: [3 bullets]
What I will not do: [2 bullets]
Price range I already decided: [amount and what it includes]
Proof I can mention: [one finished job]
My working hours: [both time zones if relevant]
Language of the proposal: [Nepali or English]

Structure:
1. Restate their problem in one short paragraph, using their words.
2. The work, in bullets.
3. What is not included.
4. Price and the single next step.
5. A two-sentence note on timing.

Keep it under 350 words. Do not invent testimonials, metrics, or guarantees. Mark any assumption with [check].`,
      ne: `तपाईं मेरो एकजनाको सेवा व्यवसायका लागि प्रस्ताव लेख्दै हुनुहुन्छ। मेरो लबजमा लेख्नुहोस्: सरल, ठोस, हाइप बिना।

ग्राहक: [नाम र कहाँ छन्]
उनीहरूले आफ्नै शब्दमा मागेको कुरा: [टाँस्नुहोस्]
म वास्तवमा के गर्छु: [३ बुँदा]
म के गर्दिन: [२ बुँदा]
मैले पहिले नै तोकेको मूल्य: [रकम र के पर्छ]
भन्न मिल्ने प्रमाण: [एउटा सकिएको काम]
मेरो काम गर्ने समय: [चाहिन्छ भने दुवै समय क्षेत्र]
प्रस्तावको भाषा: [नेपाली वा अङ्ग्रेजी]

बनावट:
1. उनीहरूको समस्या एउटा छोटो अनुच्छेदमा, उनीहरूकै शब्दमा।
2. काम, बुँदामा।
3. के पर्दैन।
4. मूल्य र एउटै अर्को कदम।
5. समयबारे दुई वाक्य।

३५० शब्दभन्दा कम राख्नुहोस्। सिफारिस, अंक वा ग्यारेन्टी नबनाउनुहोस्। अनुमानलाई [जाँच] ले चिन्नुहोस्।`,
    },
    category: "productivity",
    type: "prompt",
    tags: ["prompts", "proposals", "clients"],
    usageCount: 98,
    updatedAt: "2026-10-18",
  },
  {
    slug: "weekly-content-checklist",
    title: {
      en: "Weekly content checklist for a small offer",
      ne: "सानो अफरका लागि साप्ताहिक कन्टेन्ट चेकलिस्ट",
    },
    description: {
      en: "Four posts, one proof, one ask. Enough for a week if you sell a service and do not want content to become the job.",
      ne: "चार पोस्ट, एउटा प्रमाण, एउटा अनुरोध। सेवा बेच्नुहुन्छ र कन्टेन्ट नै पेशा बन्न दिनुहुन्न भने हप्तालाई यही पुग्छ।",
    },
    howTo: {
      en: "Print it or keep it in your notes. Do not add a fifth post until these four shipped.",
      ne: "प्रिन्ट गर्नुहोस् वा नोटमा राख्नुहोस्। यी चार नगएसम्म पाँचौं पोस्ट नथप्नुहोस्।",
    },
    body: {
      en: `Weekly content checklist

Before you write
[ ] One sentence: who this week’s posts are for
[ ] One finished job, question, or mistake you can show
[ ] The single next step a reader can take

The four posts
[ ] Teach: a checklist or script someone can save
[ ] Proof: what changed in a real job, without fake numbers
[ ] Objection: the reason people hesitate, answered plainly
[ ] Offer: who it is for, what it costs to start, how to reply

Before you publish
[ ] The first line works without the image
[ ] A stranger could forward it on WhatsApp
[ ] Nepali or English matches the buyer, not your habit
[ ] You removed any line that sounds like a slogan

Friday, ten minutes
[ ] Which post was saved or forwarded
[ ] Which sentence you will reuse next week
[ ] Which idea you will not repeat`,
      ne: `साप्ताहिक कन्टेन्ट चेकलिस्ट

लेख्नुअघि
[ ] एउटा वाक्य: यो हप्ताका पोस्ट कसका लागि
[ ] देखाउन मिल्ने एउटा सकिएको काम, प्रश्न वा गल्ती
[ ] पाठकले चाल्ने एउटै अर्को कदम

चार पोस्ट
[ ] सिकाउने: सेभ गर्न मिल्ने चेकलिस्ट वा स्क्रिप्ट
[ ] प्रमाण: वास्तविक काममा के बदलियो, नक्कली अंक बिना
[ ] आपत्ति: मानिस किन अल्मलिन्छन्, सरल जवाफ
[ ] अफर: कसका लागि, सुरु गर्न के लाग्छ, कसरी जवाफ दिने

प्रकाशनअघि
[ ] पहिलो हरफ तस्बिरबिना पनि चल्छ
[ ] अपरिचितले व्हाट्सएपमा फर्वार्ड गर्न सक्छ
[ ] नेपाली वा अङ्ग्रेजी किन्ने मान्छेसँग मिल्छ, बानीसँग होइन
[ ] नारा जस्तो लाग्ने हरफ हट्यो

शुक्रबार, दश मिनेट
[ ] कुन पोस्ट सेभ वा फर्वार्ड भयो
[ ] अर्को हप्ता दोहोर्याउने वाक्य कुन हो
[ ] कुन विचार दोहोर्याउने होइन`,
    },
    category: "social-media",
    type: "checklist",
    tags: ["content", "social-media", "offers"],
    usageCount: 86,
    updatedAt: "2026-10-12",
  },
  {
    slug: "invoice-follow-up-workflow",
    title: {
      en: "Invoice follow-up workflow",
      ne: "बिल फलोअप वर्कफ्लो",
    },
    description: {
      en: "A three-touch reminder that stays polite. The tool drafts. You send. Nothing goes out while you are asleep.",
      ne: "विनम्र रहने तीन पटकको सम्झना। औजारले मस्यौदा बनाउँछ। तपाईं पठाउनुहुन्छ। सुतेको बेला केही जाँदैन।",
    },
    howTo: {
      en: "Put the due date in your sheet. Set reminders for day 1, day 4, and day 8. Paste the matching note, edit the name, then send.",
      ne: "पाको मिति पानामा राख्नुहोस्। दिन १, ४ र ८ मा सम्झना राख्नुहोस्। मिल्दो नोट टाँसेर नाम मिलाउनुहोस्, अनि पठाउनुहोस्।",
    },
    body: {
      en: `Invoice follow-up workflow

Setup
- One row per invoice: name, amount, due date, status
- Reminders on day 1, day 4, and day 8 after the due date
- The automation creates a draft. It never sends.

Day 1 — assume they missed it
Subject: Invoice [number], due [date]
Hello [name] — sending this again in case it was buried. The amount is [amount] for [what]. You can reply here if the details look off.

Day 4 — make the next step tiny
Hello [name] — a short nudge on invoice [number]. If it is already on the way, ignore this. If something is blocking it, tell me which line and I will fix the invoice today.

Day 8 — a human decision
Hello [name] — I have not seen payment for [amount]. I can keep the work paused from [date], or we can split it into [two dates]. Tell me which you prefer this week.

Rules
- Do not add late fees in the draft unless your proposal already said so.
- Stop the sequence the hour the payment lands.
- If they reply with a problem, kill the sequence and answer the problem.`,
      ne: `बिल फलोअप वर्कफ्लो

सेटअप
- हरेक बिलको एउटा हरफ: नाम, रकम, पाको मिति, स्थिति
- पाको मितिपछि दिन १, ४ र ८ मा सम्झना
- अटोमेसनले मस्यौदा बनाउँछ। कहिल्यै आफैं पठाउँदैन।

दिन १ — छुट्यो होला भन्ने अनुमान
विषय: बिल [नम्बर], मिति [मिति]
नमस्ते [नाम] — पुरिएको होला भनेर फेरि पठाइरहेको छु। रकम [रकम] हो, [के का लागि]। विवरण नमिल्ले यहाँ लेख्नुहोस्।

दिन ४ — अर्को कदम सानो बनाउने
नमस्ते [नाम] — बिल [नम्बर] को छोटो सम्झना। बाटोमा छ भने बेवास्ता गर्नुहोस्। केही अड्काउँछ भने कुन हरफ हो भन्नुहोस्, आज बिल सच्याउँछु।

दिन ८ — मानवीय निर्णय
नमस्ते [नाम] — [रकम] को भुक्तानी देखेको छैन। [मिति] देखि काम रोक्न सक्छु, वा [दुई मिति] मा बाँड्न सक्छु। यो हप्ता कुन रोज्नुहुन्छ?

नियम
- प्रस्तावमा नभनिएको जरिवाना मस्यौदामा नथपाउनुहोस्।
- भुक्तानी परेको घण्टामै क्रम रोक्नुहोस्।
- समस्याको जवाफ आए क्रम मेटेर त्यही समस्याको जवाफ दिनुहोस्।`,
    },
    category: "automation",
    type: "workflow",
    tags: ["invoices", "automation", "clients"],
    usageCount: 91,
    updatedAt: "2026-10-15",
  },
  {
    slug: "bilingual-caption-template",
    title: {
      en: "Bilingual caption template",
      ne: "द्विभाषिक क्याप्सन टेम्प्लेट",
    },
    description: {
      en: "One job, two languages, a single next step. For posts that have to travel between Nepal and a client abroad.",
      ne: "एउटा काम, दुई भाषा, एउटै अर्को कदम। नेपाल र विदेशको ग्राहकबीच हिँड्नुपर्ने पोस्टका लागि।",
    },
    howTo: {
      en: "Write the fact first in the language you think in. Translate the meaning, not the slogan. Cut whichever version is longer than it needs to be.",
      ne: "तपाईं सोच्ने भाषामा तथ्य पहिले लेख्नुहोस्। नारा होइन, अर्थ अनुवाद गर्नुहोस्। नचाहिँदो लामो संस्करण काट्नुहोस्।",
    },
    body: {
      en: `Bilingual caption

Nepali
[एक वाक्य: कसको समस्या थियो]
[दुई वाक्य: के गर्नुभयो र के बदलियो]
[एक वाक्य: अर्को कदम — जवाफ, सेभ, वा सन्देश]

English
[One sentence: whose problem it was]
[Two sentences: what you did and what changed]
[One sentence: the next step — reply, save, or message]

Checks
[ ] Both versions mention the same fact
[ ] No fake metric in either language
[ ] The ask is identical
[ ] The first line makes sense if the other language is skipped
[ ] You would forward the Nepali version to a relative and the English version to the client`,
      ne: `द्विभाषिक क्याप्सन

नेपाली
[एक वाक्य: कसको समस्या थियो]
[दुई वाक्य: के गर्नुभयो र के बदलियो]
[एक वाक्य: अर्को कदम — जवाफ, सेभ, वा सन्देश]

अङ्ग्रेजी
[One sentence: whose problem it was]
[Two sentences: what you did and what changed]
[One sentence: the next step — reply, save, or message]

जाँच
[ ] दुवै संस्करणमा उही तथ्य छ
[ ] कुनै भाषामा नक्कली अंक छैन
[ ] अनुरोध उस्तै छ
[ ] अर्को भाषा नपढे पनि पहिलो हरफ बुझिन्छ
[ ] नेपाली संस्करण आफन्तलाई र अङ्ग्रेजी संस्करण ग्राहकलाई फर्वार्ड गर्न मिल्छ`,
    },
    category: "social-media",
    type: "template",
    tags: ["content", "social-media", "diaspora"],
    usageCount: 88,
    updatedAt: "2026-10-11",
  },
  {
    slug: "solopreneur-tool-stack",
    title: {
      en: "Solopreneur tool stack",
      ne: "एकजनाको औजार स्ट्याक",
    },
    description: {
      en: "The short list: one source doc, one memory sheet, one place to draft, one runner for reminders. Anything else has to earn the slot.",
      ne: "छोटो सूची: एउटा स्रोत कागज, एउटा स्मृति पाना, एउटा मस्यौदा ठाउँ, सम्झनाका लागि एउटा रनर। अरूले आफ्नो ठाउँ कमाउनुपर्छ।",
    },
    howTo: {
      en: "Circle what you already pay for. Add a tool only if it deletes a chore you did twice this week.",
      ne: "पहिले नै तिर्नुभएकोमा घेरा लगाउनुहोस्। यो हप्ता दुई पटक गरेको काम मेट्छ भने मात्र औजार थप्नुहोस्।",
    },
    body: {
      en: `Solopreneur stack

Keep
1. Source document — offers, prices, policies, answers you already give
2. Memory sheet — name, next step, date
3. Drafting model — proposals, captions, follow-ups, reading only from the source
4. Reminder runner — pings you, does not message the client
5. Folder of proof — three finished jobs, photos and plain words

Add only if it removes a repeated chore
[ ] Booking page
[ ] Invoice tool
[ ] Shared drive the client will actually open

Do not add this month
- A CRM you have not opened in 14 days
- A second social scheduler
- Any tool that wants to send the first reply for you

Monthly review, 20 minutes
[ ] Which price in the source doc is stale
[ ] Which reminder you ignored
[ ] Which subscription did not save an hour`,
      ne: `एकजनाको स्ट्याक

राख्ने
1. स्रोत कागज — अफर, मूल्य, नियम, पहिले नै दिने जवाफ
2. स्मृति पाना — नाम, अर्को कदम, मिति
3. मस्यौदा मोडेल — प्रस्ताव, क्याप्सन, फलोअप, स्रोत कागज मात्र पढेर
4. सम्झना रनर — तपाईंलाई सम्झाउँछ, ग्राहकलाई सन्देश गर्दैन
5. प्रमाणको फोल्डर — तीन सकिएका काम, फोटो र सरल शब्द

दोहोरिने काम मेट्छ भने मात्र थप्ने
[ ] बुकिङ पृष्ठ
[ ] बिल औजार
[ ] ग्राहकले साँच्चै खोल्ने साझा ड्राइभ

यो महिना नथप्ने
- १४ दिनदेखि नखोलेको सीआरएम
- दोस्रो सोसल सेड्युलर
- तपाईंको पहिलो जवाफ आफैं पठाउन चाहने औजार

मासिक समीक्षा, २० मिनेट
[ ] स्रोत कागजको कुन मूल्य पुरानो भयो
[ ] कुन सम्झना बेवास्ता भयो
[ ] कुन सदस्यताले एक घण्टा जोगाएन`,
    },
    category: "productivity",
    type: "tool",
    tags: ["productivity", "automation", "ai"],
    usageCount: 74,
    updatedAt: "2026-10-16",
  },
];
