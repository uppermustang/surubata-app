import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const brandMarkSize = { width: 384, height: 544 };

/** The logo as a data URI, for ImageResponse renders that cannot fetch from /public. */
export async function brandMarkDataUri() {
  const file = await readFile(join(process.cwd(), "public/brand/botdawn-mark.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}
