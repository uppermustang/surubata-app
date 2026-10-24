import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { getPrisma } from "@/lib/db";

type Store = {
  subscribers: { email: string; locale: string; createdAt: string }[];
  requests: {
    kind: string;
    name?: string;
    email?: string;
    message: string;
    locale: string;
    createdAt: string;
  }[];
};

const filePath = path.join(process.cwd(), "data", "submissions.json");

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    return { subscribers: [], requests: [] };
  }
}

async function writeStore(store: Store) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(store, null, 2), "utf8");
}

export type PersistResult = "database" | "file" | "none";

export async function saveSubscriber(email: string, locale: string): Promise<PersistResult> {
  const prisma = getPrisma();
  if (prisma) {
    await prisma.subscriber.upsert({
      where: { email },
      update: { locale },
      create: { email, locale },
    });
    return "database";
  }

  if (process.env.NODE_ENV !== "production") {
    const store = await readStore();
    const existing = store.subscribers.find((item) => item.email === email);
    if (existing) existing.locale = locale;
    else store.subscribers.push({ email, locale, createdAt: new Date().toISOString() });
    await writeStore(store);
    return "file";
  }

  return "none";
}

export async function saveRequest(input: {
  kind: string;
  name?: string;
  email?: string;
  message: string;
  locale: string;
}): Promise<PersistResult> {
  const prisma = getPrisma();
  if (prisma) {
    await prisma.audienceRequest.create({ data: input });
    return "database";
  }

  if (process.env.NODE_ENV !== "production") {
    const store = await readStore();
    store.requests.push({ ...input, createdAt: new Date().toISOString() });
    await writeStore(store);
    return "file";
  }

  return "none";
}
