import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import About from "./about.page";
import RadioButtonsGroup from "./routes/Question.route";
import { QueryClient, QueryClientProvider } from "react-query";
import { ScreenerProvider } from "./context/Screener.context";
import { CssBaseline, useTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./theme";
import Results from "./routes/Results.route";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/screener",
    element: <RadioButtonsGroup />,
  },
  {
    path: "/results",
    element: <Results />,
  },

  {
    path: "*",
    element: <RadioButtonsGroup />,
    
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <ScreenerProvider>
          <RouterProvider router={router} />
        </ScreenerProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
