"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, Copy, MapPin, Phone } from "lucide-react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const address = "서울 성동구 마장로 39길 36, 1층";
const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

const menuItems = [
  { name: "구운 피스타치오", description: "고소하고 진한 맛", image: "/images/pistachio.webp", smallImage: "/images/pistachio-sm.webp", alt: "고소한 구운 피스타치오 젤라또" },
  { name: "애플 시나몬", description: "사과의 산뜻함과 은은한 시나몬 향", image: "/images/apple.webp", smallImage: "/images/apple-sm.webp", alt: "사과와 시나몬 풍미를 담은 애플 시나몬 젤라또", note: "가장 많이 찾는 맛" },
  { name: "리조(쌀)", description: "쌀알 식감이 살아 있는 고소한 우유 젤라또", image: "/images/rice.webp", smallImage: "/images/rice-sm.webp", alt: "쌀알 식감이 보이는 리조 젤라또" },
  { name: "제철과일 소르베", description: "제철 과일로 만들어 신선하고 상큼한 맛", image: "/images/sorbet.webp", smallImage: "/images/sorbet-sm.webp", alt: "제철 과일로 만든 상큼한 소르베" },
];

const galleryItems = [
  { image: "/images/interior.webp", smallImage: "/images/interior-sm.webp", alt: "화이트 벽과 우드 테이블로 꾸민 젤라또 가게 내부", caption: "천천히 머물기 좋은 작은 매장" },
  { image: "/images/process.webp", smallImage: "/images/process-sm.webp", alt: "매장 카운터에서 젤라또를 컵에 담는 손", caption: "한 컵씩 정성스럽게" },
  { image: "/images/exterior.webp", smallImage: "/images/exterior-sm.webp", alt: "화이트와 우드로 꾸민 작은 동네 젤라또 가게 외관", caption: "마장동 골목의 편안한 가게" },
  { image: "/images/apple.webp", smallImage: "/images/apple-sm.webp", alt: "사과 조각과 시나몬을 곁들인 젤라또", caption: "산뜻한 애플 시나몬" },
  { image: "/images/pistachio.webp", smallImage: "/images/pistachio-sm.webp", alt: "다진 피스타치오를 올린 젤라또", caption: "고소한 구운 피스타치오" },
  { image: "/images/sorbet.webp", smallImage: "/images/sorbet-sm.webp", alt: "제철 딸기를 곁들인 붉은 소르베", caption: "계절을 담은 소르베" },
];

const visitDetails = [
  ["영업시간", "12:00~21:00"],
  ["휴무", "매주 월요일"],
  ["피크타임", "평일 15:00~17:00 · 주말 오후"],
  ["좌석", "테이블 5개 · 총 10석"],
  ["포장 / 배달", "포장 가능 · 배달 없음"],
  ["주차", "불가"],
  ["단체", "별도 기준 없음"],
  ["라스트오더", "별도 없음"],
];

// TODO: 대표 경력 확인
// TODO: 유기농 원재료 및 인증 여부 확인 후 표현 검토
// TODO: 주요 원산지 확인
// TODO: 메뉴별 전체 알레르기 정보 확인
// TODO: 실제 위도/경도 확인 후 JSON-LD geo 추가
// TODO: 실제 매장 사진 6장 수급 후 생성 이미지 교체 및 원본 장변 픽셀 확인
// TODO: IMG-01, IMG-06, IMG-08은 현재 2400px 미만 — 실제 운영 전 재촬영·원본 교체 필요

export default function Home() {
  const heroLocationRef = useRef<HTMLAnchorElement>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const target = heroLocationRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setShowMobileBar(!entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSlide = () => setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    updateSlide();
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);
    return () => {
      carouselApi.off("select", updateSlide);
      carouselApi.off("reInit", updateSlide);
    };
  }, [carouselApi]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">본문 바로가기</a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="애플 젤라또 맨 위로">애플 젤라또</a>
          <nav className="main-nav" aria-label="주요 메뉴">
            <a href="#story">이야기</a><a href="#menu">메뉴</a><a href="#space">공간</a><a href="#visit">방문</a>
          </nav>
          <a className="header-location" href="#visit" data-slot="header-location"><MapPin aria-hidden="true" size={17} />매장 위치 보기</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <picture className="hero-picture">
            <source media="(max-width: 767px)" srcSet="/images/hero-sm.webp" />
            <img src="/images/hero.webp" alt="우드 테이블 위에 놓인 애플 젤라또 컵" width="1586" height="992" loading="eager" fetchPriority="high" />
          </picture>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content content-shell">
            <p className="hero-kicker">서울 성동구 마장동 · 2025년부터</p>
            <h1 id="hero-title">동네에서 천천히 즐기는<br />한 컵의 젤라또</h1>
            <p className="hero-copy">애플 젤라또는 2025년 문을 연 작은 젤라또 가게입니다. 좋아하는 젤라또를 가까운 동네에서 나누고 싶어 시작했습니다.</p>
            <div className="hero-actions">
              <a ref={heroLocationRef} className="primary-action on-dark" href="#visit" data-slot="hero-location"><MapPin aria-hidden="true" size={19} />매장 위치 보기</a>
              <a className="secondary-action on-dark" href="tel:021112222"><Phone aria-hidden="true" size={18} />전화하기</a>
            </div>
          </div>
          <a className="hero-scroll" href="#story" aria-label="이야기 섹션으로 이동"><span>아래로</span><ArrowDown aria-hidden="true" size={17} /></a>
        </section>

        <section className="story section-space-md" id="story" aria-labelledby="story-title">
          <div className="content-shell story-grid">
            <div className="story-copy">
              <p className="eyebrow">2025년, 마장동에서</p>
              <h2 id="story-title">좋아하는 마음으로<br />문을 연 작은 가게</h2>
              <p className="lead-copy">젤라또를 좋아해서 동네에 작은 가게를 열었습니다. ‘애플’이라는 이름은 사과를 좋아하는 마음에서 시작됐습니다.</p>
              <div className="story-note"><span aria-hidden="true">01</span><p>매일 오가는 이웃이 편안히 머물 수 있는 동네 사랑방을 생각합니다.</p></div>
            </div>
            <figure className="story-image">
              <picture><source media="(max-width: 767px)" srcSet="/images/process-sm.webp" /><img src="/images/process.webp" alt="젤라또를 컵에 정성스럽게 담는 모습" width="1448" height="1086" loading="lazy" /></picture>
              <figcaption>한 컵씩 정성스럽게 담아냅니다.</figcaption>
            </figure>
          </div>
        </section>

        <section className="menu-section section-space-lg" id="menu" aria-labelledby="menu-title">
          <div className="content-shell">
            <div className="section-heading menu-heading">
              <div><p className="eyebrow">오늘의 선택</p><h2 id="menu-title">대표 젤라또와<br />제철 과일 소르베</h2></div>
              <div className="cup-price"><span>컵 / 콘</span><strong className="price">7,000원</strong></div>
            </div>
            <ol className="menu-list">
              {menuItems.map((item, index) => (
                <li key={item.name} className="menu-row">
                  <span className="menu-index tabular-nums" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <picture className="menu-image"><source media="(max-width: 767px)" srcSet={item.smallImage} /><img src={item.image} alt={item.alt} width="1448" height="1086" loading="lazy" /></picture>
                  <div className="menu-copy">{item.note && <span className="menu-note">{item.note}</span>}<h3>{item.name}</h3><p>{item.description}</p></div>
                  <span className="menu-price price">7,000원</span>
                </li>
              ))}
            </ol>
            <div className="menu-footer">
              <p className="allergy-notice"><strong>알레르기 안내</strong>견과류 알레르기가 있으신 경우 주문 시 꼭 알려주세요.</p>
              <a className="text-action" href="#visit" data-slot="menu-location">매장 위치 보기 <ArrowRight aria-hidden="true" size={18} /></a>
            </div>
          </div>
        </section>

        <section className="space-section section-space-md" id="space" aria-labelledby="space-title">
          <div className="content-shell space-grid">
            <figure className="space-image"><picture><source media="(max-width: 767px)" srcSet="/images/interior-sm.webp" /><img src="/images/interior.webp" alt="화이트 벽과 우드 가구로 꾸민 작은 젤라또 가게 내부" width="1448" height="1086" loading="lazy" /></picture></figure>
            <div className="space-copy">
              <p className="eyebrow">공간과 사람</p><h2 id="space-title">오후의 동네가<br />잠시 쉬어가는 곳</h2>
              <p className="lead-copy">학교가 끝난 오후에는 아이들이 들르고, 부모님과 함께 천천히 젤라또를 즐기기도 합니다. 마장동을 둘러본 중국 여행객도 쉬어가는 작은 디저트 가게입니다.</p>
              <blockquote><p>“사장님이 너무 친절하고 쫀득한 젤라또가 너무 맛있어요!”</p><footer>네이버 지도 리뷰 · 2026년 7월</footer></blockquote>
            </div>
          </div>
        </section>

        <section className="gallery-section section-space-lg" aria-labelledby="gallery-title">
          <div className="content-shell gallery-heading"><div><p className="eyebrow">가게의 장면들</p><h2 id="gallery-title">애플 젤라또에서</h2></div><span className="gallery-count tabular-nums" aria-live="polite">{currentSlide} / {galleryItems.length}</span></div>
          <div className="gallery-rail">
            <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: false }}>
              <CarouselContent className="gallery-track">
                {galleryItems.map((item, index) => (
                  <CarouselItem key={item.caption} className="gallery-item" aria-label={`${index + 1} / ${galleryItems.length}`}>
                    <figure><picture><source media="(max-width: 767px)" srcSet={item.smallImage} /><img src={item.image} alt={item.alt} width="1448" height="1086" loading="lazy" /></picture><figcaption>{item.caption}</figcaption></figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="gallery-controls"><CarouselPrevious aria-label="이전 사진" /><CarouselNext aria-label="다음 사진" /></div>
            </Carousel>
          </div>
        </section>

        <section className="visit-section section-space-xl" id="visit" aria-labelledby="visit-title">
          <div className="content-shell">
            <div className="section-heading visit-heading"><div><p className="eyebrow">방문 안내</p><h2 id="visit-title">언제, 어디로 오면 되는지<br />한눈에 확인하세요</h2></div><p>예약 없이 편하게 방문해 주세요.</p></div>
            <div className="visit-grid">
              <div className="visit-info">
                <div className="address-block"><p className="info-label">주소</p><address>{address}</address><button className="copy-button" type="button" onClick={copyAddress}>{copied ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}{copied ? "복사됨" : "주소 복사"}</button><span className="sr-only" aria-live="polite">{copied ? "주소가 클립보드에 복사되었습니다." : ""}{copyFailed ? "주소를 복사하지 못했습니다. 주소를 직접 선택해 주세요." : ""}</span></div>
                <div className="phone-block"><p className="info-label">전화</p><a href="tel:021112222">02-111-2222</a></div>
                <dl className="visit-list">{visitDetails.map(([term, description]) => <div key={term}><dt>{term}</dt><dd className={term === "영업시간" || term === "피크타임" ? "hours" : undefined}>{description}</dd></div>)}</dl>
              </div>
              <div className="destination-panel">
                <picture><source media="(max-width: 767px)" srcSet="/images/exterior-sm.webp" /><img src="/images/exterior.webp" alt="화이트 외벽과 우드 문이 있는 작은 젤라또 가게 외관" width="1448" height="1086" loading="lazy" /></picture>
                <div className="destination-copy"><MapPin aria-hidden="true" size={21} /><div><strong>애플 젤라또</strong><p>{address}</p></div></div>
                <a className="primary-action map-primary" href={naverMapUrl} target="_blank" rel="noreferrer" data-slot="visit-location"><MapPin aria-hidden="true" size={19} />매장 위치 보기</a>
                <div className="map-links" aria-label="지도 서비스 선택"><a href={naverMapUrl} target="_blank" rel="noreferrer">네이버지도 길찾기 <ArrowRight aria-hidden="true" size={16} /></a><a href={kakaoMapUrl} target="_blank" rel="noreferrer">카카오맵 길찾기 <ArrowRight aria-hidden="true" size={16} /></a></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="content-shell footer-inner"><strong>애플 젤라또</strong><div><address>{address}</address><a href="tel:021112222">02-111-2222</a></div><p className="hours">12:00~21:00 · 매주 월요일 휴무</p></div></footer>

      <div className={`mobile-action-bar ${showMobileBar ? "is-visible" : ""}`} aria-hidden={!showMobileBar}><a href="#visit" data-slot="mobile-location" tabIndex={showMobileBar ? 0 : -1}><MapPin aria-hidden="true" size={19} />매장 위치 보기</a></div>
    </>
  );
}
