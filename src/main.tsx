import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScreenerProvider } from "./context/Screener.context";
import "./index.css";
import ScreenerQuestion from "./pages/ScreenerQuestion";
import ScreenerResults from "./pages/ScreenerResults";
import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/screener",
    element: <ScreenerQuestion />,
  },
  {
    path: "/results",
    element: <ScreenerResults />,
  },

  {
    path: "*",
    element: <ScreenerQuestion />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ScreenerProvider>
          <RouterProvider router={router} />
        </ScreenerProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
