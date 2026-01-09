import { Outlet, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../../shared/ui/Navbar";
import Sidebar from "../../shared/ui/Sidebar";
import BottomNav from "../../shared/ui/BottomNav";
import SlidePanel from "../../shared/ui/SlidePanel";
import Footer from "../../shared/ui/Footer";

import StocksPanelContent from "../../features/stocks/ui/StocksPanelContent";
import NewsPanelContent from "../../features/news/ui/NewsPanelContent";
import AnalysisPanelContent from "../../features/analysis/ui/AnalysisPanelContent";

function getModeFromPath(pathname) {
  if (pathname.startsWith("/stocks")) return "stocks";
  if (pathname.startsWith("/news")) return "news";
  if (pathname.startsWith("/analysis")) return "analysis";
  if (pathname.startsWith("/settings")) return "settings";
  return null;
}

function isDetailPage(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 1 && (segments[0] === "stocks" || segments[0] === "news" || segments[0] === "analysis");
}

function isListPage(pathname) {
  return pathname === "/stocks" || pathname === "/news" || pathname === "/analysis";
}

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const mode = useMemo(() => getModeFromPath(location.pathname), [location.pathname]);

  const [panelOpen, setPanelOpen] = useState(false);

  const [mobileMode, setMobileMode] = useState({ tab: null, view: "detail" });

  useEffect(() => {
    if (navigationType === "POP") {
      setPanelOpen(false);
    } else if (isListPage(location.pathname)) {
      setPanelOpen(true);
    } else if (isDetailPage(location.pathname) || mode === "settings" || mode === null) {
      setPanelOpen(false);
    }
  }, [location.pathname, navigationType, mode]);

  useEffect(() => {
    if (isListPage(location.pathname)) {
      const tab = mode; 
      setMobileMode({ tab, view: "list" });
    } else if (isDetailPage(location.pathname)) {
      setMobileMode((prev) => ({ ...prev, view: "detail" }));
    } else if (mode === "settings") {
      setMobileMode({ tab: "settings", view: "detail" });
    } else if (mode === null) {
      setMobileMode({ tab: null, view: "detail" });
    }
  }, [location.pathname, mode]);

  function handleSidebarClick(next) {
    if (next === "settings") {
      setPanelOpen(false);
      navigate("/settings");
      return;
    }

    if (mode === next) {
      setPanelOpen((v) => !v);
      return;
    }

    if (next === "stocks") navigate("/stocks");
    if (next === "news") navigate("/news");
    if (next === "analysis") navigate("/analysis");

    setPanelOpen(true);
  }

  function handleMobileBottomNav(tab) {
    if (tab === "settings") {
      navigate("/settings");
    } else {
      navigate(`/${tab}`);
    }
  }

  function handleMobileListSelect(tab, route) {
    setMobileMode({ tab, view: "detail" });
    navigate(route);
  }

  const isPanelMode = mode === "stocks" || mode === "news" || mode === "analysis";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="sm:hidden flex-1 bg-gray-50 overflow-y-auto pb-16">
        {mobileMode.view === "list" && mobileMode.tab && (
          <div className="w-full">
            {mobileMode.tab === "stocks" && (
              <StocksPanelContent
                onSelect={(symbol) => handleMobileListSelect("stocks", `/stocks/${symbol}`)}
              />
            )}
            {mobileMode.tab === "news" && (
              <NewsPanelContent
                onSelect={(id) => handleMobileListSelect("news", `/news/${id}`)}
              />
            )}
            {mobileMode.tab === "analysis" && (
              <AnalysisPanelContent
                onSelect={(id) => handleMobileListSelect("analysis", `/analysis/${id}`)}
              />
            )}
          </div>
        )}
        {mobileMode.view === "detail" && (
          <div className="max-w-screen mx-auto p-4">
            <Outlet />
          </div>
        )}
      </div>

      <div className="hidden sm:flex flex-1 bg-gray-50 relative pr-24 pb-0">
        <div className="flex-1 max-w-screen mx-auto p-4 sm:p-6">
          <Outlet />
        </div>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>

      <div className="hidden sm:block">
        <Sidebar activeMode={mode} onChange={handleSidebarClick} />
      </div>

      <BottomNav value={mobileMode.tab} onChange={handleMobileBottomNav} />

      <div className="hidden sm:block">
        <SlidePanel open={panelOpen && isPanelMode} onClose={() => setPanelOpen(false)}>
          
          {mode === "stocks" && (
            <StocksPanelContent
              onClose={() => setPanelOpen(false)}
              onSelect={(symbol) => {
                navigate(`/stocks/${symbol}`);
              }}
            />
          )}
          {mode === "news" && (
            <NewsPanelContent
              onClose={() => setPanelOpen(false)}
              onSelect={(id) => navigate(`/news/${id}`)}
            />
          )}

          {mode === "analysis" && (
            <AnalysisPanelContent
              onClose={() => setPanelOpen(false)}
              onSelect={(id) => navigate(`/analysis/${id}`)}
            />
          )}
        </SlidePanel>
      </div>
    </div>
  );
}

export default MainLayout;