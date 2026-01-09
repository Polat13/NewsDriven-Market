import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Spinner from "../shared/ui/Spinner";
import { requireAuth } from "../features/auth/hooks/useAuthGuard";
import ErrorPage from "../shared/ui/ErrorPage";

// Auth pages - lazy load
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));

// Dashboard & main pages - lazy load
const DashboardPage = lazy(() => import("../features/dashboard/pages/DashboardPage"));
const StocksPage = lazy(() => import("../features/stocks/pages/StocksPage"));
const StockDetailPage = lazy(() => import("../features/stocks/pages/StockDetailPage"));
const NewsPage = lazy(() => import("../features/news/pages/NewsPage"));
const NewsDetailPage = lazy(() => import("../features/news/pages/NewsDetailPage"));
const AnalysisPage = lazy(() => import("../features/analysis/pages/AnalysisPage"));
const AnalysisDetailPage = lazy(() => import("../features/analysis/pages/AnalysisDetailPage"));
const SettingsPage = lazy(() => import("../features/settings/pages/SettingsPage"));

// Legal pages - lazy load
const PrivacyPage = lazy(() => import("../shared/pages/PrivacyPage"));
const TermsPage = lazy(() => import("../shared/pages/TermsPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    path: "/",
    element: (<MainLayout />),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "stocks",
        element: (
          <Suspense fallback={<PageLoader />}>
            <StocksPage />
          </Suspense>
        ),
      },
      {
        path: "stocks/:symbol",
        element: (
          <Suspense fallback={<PageLoader />}>
            <StockDetailPage />
          </Suspense>
        ),
      },
      {
        path: "news",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewsPage />
          </Suspense>
        ),
      },
      {
        path: "news/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewsDetailPage />
          </Suspense>
        ),
      },
      {
        path: "analysis",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnalysisPage />
          </Suspense>
        ),
      },
      {
        path: "analysis/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnalysisDetailPage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
