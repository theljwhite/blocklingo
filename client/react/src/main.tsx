import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "./configs/wagmi/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { customRainbowTheme } from "./configs/rainbowkit/index.ts";
import { ToastContainer, Bounce } from "react-toastify";
import tailwindConfig from "../tailwind.config.ts";
import resolveConfig from "tailwindcss/resolveConfig";
import App from "./App.tsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();
const tailwindTheme = resolveConfig(tailwindConfig).theme;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={customRainbowTheme} modalSize="wide">
            <App />
            <ToastContainer
              autoClose={4000}
              position="bottom-center"
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              draggable
              theme="light"
              bodyClassName={() => "flex items-center text-base text-zinc-800"}
              transition={Bounce}
              progressStyle={{ background: tailwindTheme.colors.primary[1] }}
            />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </StrictMode>
);
