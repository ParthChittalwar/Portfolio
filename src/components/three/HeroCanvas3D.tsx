import { lazy, Suspense, useEffect } from "react";
import HeroCanvas from "@/components/common/HeroCanvas";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TechSphere = lazy(() => {
  console.log("[HeroCanvas3D] Starting lazy import of TechSphere chunk");
  return import("./TechSphere").then((mod) => {
    console.log("[HeroCanvas3D] TechSphere chunk loaded successfully");
    return mod;
  });
});

function SphereWrapper() {
  useEffect(() => {
    console.log("[HeroCanvas3D] SphereWrapper mounted — TechSphere rendering");
  }, []);

  return (
    <div className="absolute inset-y-0 right-0 w-[58%] pointer-events-none" aria-hidden="true">
      <TechSphere />
    </div>
  );
}

/**
 * Hero background compositor.
 *
 * Mobile / touch / reduced-motion → 2D canvas only (cheap, always correct).
 *
 * Desktop capable:
 *   Layer 1 — HeroCanvas (2D particles, full-width, immediate)
 *   Layer 2 — TechSphere (3D, lazy, confined to right 58%)
 *
 * The 3D sphere is confined to the right 58% so it never overlaps the
 * hero title / description / CTAs on the left. The 2D canvas below it
 * fills the full background immediately with no layout shift.
 *
 * Label text is rendered via THREE.CanvasTexture (HTML5 Canvas 2D) —
 * NOT Drei's <Text> component. Drei's Text uses troika-three-text which
 * fetches unicode-font-resolver metadata from cdn.jsdelivr.net — that
 * origin is not in connect-src CSP and causes a silent crash in production.
 * CanvasTexture draws text entirely on-device with no network requests.
 */
export default function HeroCanvas3D() {
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const use3D = !isMobile && !isTouch && !reducedMotion;

  useEffect(() => {
    console.log("[HeroCanvas3D] Mounted —", {
      isMobile,
      isTouch,
      reducedMotion,
      use3D,
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
    });
  }, [isMobile, isTouch, reducedMotion, use3D]);

  if (!use3D) {
    console.log("[HeroCanvas3D] 3D disabled — rendering 2D canvas only");
    return <HeroCanvas />;
  }

  return (
    <>
      <HeroCanvas />
      <Suspense fallback={null}>
        <SphereWrapper />
      </Suspense>
    </>
  );
}
