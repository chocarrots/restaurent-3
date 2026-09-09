import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://apple-gelato-majang.anyes0106.chatgpt.site/sitemap.xml",
  };
}
