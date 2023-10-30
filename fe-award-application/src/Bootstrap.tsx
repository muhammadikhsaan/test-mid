import { createRoot } from "react-dom/client";
import { MainRoutes } from "views";

import { SessionProvider } from "@shared/context/Session.context";
import styles from "./Bootstrap.module.css";

const bootstrap = async () => {
  const container = document.createElement("div");
  container.setAttribute("class", styles["zee-main-container"]);

  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    <SessionProvider>
      <MainRoutes />
    </SessionProvider>,
  );
};

bootstrap();
