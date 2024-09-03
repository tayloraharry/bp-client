import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";
import { ScreenerProvider } from "./context/Screener.context";
import "./index.css";
import ScreenerQuestion from "./pages/ScreenerQuestion";
import ScreenerResults from "./pages/ScreenerResults";
import StartScreen from "./pages/Start";
import theme from "./theme";

const Layout = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ScreenerProvider>
        <Outlet />
      </ScreenerProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StartScreen />,
      },
      {
        path: "/screener/:question",
        element: <ScreenerQuestion />,
      },
      {
        path: "/results",
        element: <ScreenerResults />,
      },
      {
        path: "*",
        element: <StartScreen />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
