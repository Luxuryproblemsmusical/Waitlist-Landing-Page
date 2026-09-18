
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import SubscribePage from "./app/SubscribePage.tsx";
  import AboutPage from "./app/AboutPage.tsx";
  import FaqPage from "./app/FaqPage.tsx";
  import AdvisorsPage from "./app/AdvisorsPage.tsx";
  import "./styles/index.css";

  const ROUTES: Record<string, () => JSX.Element> = {
    '/': App,
    '/subscribe': SubscribePage,
    '/about': AboutPage,
    '/faq': FaqPage,
    '/advisors': AdvisorsPage,
  };

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page = ROUTES[path] ?? App;

  createRoot(document.getElementById("root")!).render(<Page />);
