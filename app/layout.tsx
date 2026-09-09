import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://apple-gelato-majang.anyes0106.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "애플 젤라또 | 서울 성동구 마장동 젤라또",
  description: "서울 성동구 마장로에 위치한 작은 젤라또 가게 애플 젤라또. 구운 피스타치오, 애플 시나몬, 리조, 제철과일 소르베를 만나보세요.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "애플 젤라또",
  description: "서울 성동구 마장로에 위치한 작은 젤라또 전문점",
  address: {
    "@type": "PostalAddress",
    streetAddress: "마장로 39길 36, 1층",
    addressLocality: "성동구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  telephone: "02-111-2222",
  priceRange: "₩₩",
  servesCuisine: ["젤라또", "아이스크림", "소르베"],
  acceptsReservations: false,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "21:00",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko-KR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
