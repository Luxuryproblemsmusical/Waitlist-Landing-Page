
  import { useEffect, useState } from "react";
  import { flushSync } from "react-dom";
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import SubscribePage from "./app/SubscribePage.tsx";
  import AboutPage from "./app/AboutPage.tsx";
  import FaqPage from "./app/FaqPage.tsx";
  import "./styles/index.css";

  const ROUTES: Record<string, () => JSX.Element> = {
    '/': App,
    '/subscribe': SubscribePage,
    '/about': AboutPage,
    '/faq': FaqPage,
  };

  const routeOf = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

  /**
   * Links between these pages swap the page in place instead of reloading it,
   * with a soft crossfade where the browser has view transitions, so there's
   * no blank flash between pages. Anything else (privacy.html, mailto, other
   * sites, new-tab clicks) navigates normally. Back/forward return to where
   * you were on the page.
   */
  function Site() {
    const [path, setPath] = useState(() => routeOf(window.location.pathname));

    useEffect(() => {
      history.scrollRestoration = 'manual';
      const scrollFor = new Map<number, number>();
      let key = history.state?.key ?? 0;
      let nextKey = key + 1;
      history.replaceState({ ...history.state, key }, '');

      const onScroll = () => scrollFor.set(key, window.scrollY);

      const show = (url: URL, scrollY: number) => {
        const swap = () => {
          flushSync(() => setPath(routeOf(url.pathname)));
          const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
          if (target) target.scrollIntoView();
          else window.scrollTo(0, scrollY);
        };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          doc.startViewTransition(swap);
        } else {
          swap();
        }
      };

      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = (e.target as Element | null)?.closest?.('a');
        if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin || !(routeOf(url.pathname) in ROUTES)) return;
        // A #link on the page you're already on is a plain in-page jump.
        if (routeOf(url.pathname) === routeOf(window.location.pathname) && url.hash) return;
        e.preventDefault();
        key = nextKey++;
        history.pushState({ key }, '', url);
        show(url, 0);
      };

      const onPop = (e: PopStateEvent) => {
        key = e.state?.key ?? 0;
        show(new URL(window.location.href), scrollFor.get(key) ?? 0);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('click', onClick);
      window.addEventListener('popstate', onPop);
      return () => {
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('click', onClick);
        window.removeEventListener('popstate', onPop);
      };
    }, []);

    const Page = ROUTES[path] ?? App;
    return <Page />;
  }

  createRoot(document.getElementById("root")!).render(<Site />);
