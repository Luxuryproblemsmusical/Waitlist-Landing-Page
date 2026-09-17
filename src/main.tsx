
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import SubscribePage from "./app/SubscribePage.tsx";
  import "./styles/index.css";

  const path = window.location.pathname.replace(/\/+$/, '');
  const Page = path === '/subscribe' ? SubscribePage : App;

  createRoot(document.getElementById("root")!).render(<Page />);
