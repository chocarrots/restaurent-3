import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://apple-gelato-majang.anyes0106.chatgpt.site", changeFrequency: "monthly", priority: 1 }];
}
