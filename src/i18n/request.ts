import { getRequestConfig } from "next-intl/server";
import { isLocale, routing, type Locale } from "./routing";

async function messagesFor(locale: Locale) {
  switch (locale) {
    case "en":
      return (await import("../../messages/en.json")).default;
    case "ne":
      return (await import("../../messages/ne.json")).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await messagesFor(locale),
  };
});
