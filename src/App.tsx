import { useState, useCallback } from "react";
import { PAGES } from "./constants";
import HomePage from "./pages/homePage";
import EditorPage from "./pages/editorPage";

// Page to Component conversion

const ComponentVsPageMap = {
  [PAGES.HOME]: HomePage,
  [PAGES.EDITOR]: EditorPage,
};

const App = () => {
  const [page, setPage] = useState(PAGES.EDITOR);
  const PageComponent = ComponentVsPageMap[page];

  // To be used when there is a Home Page
  const handleAction = useCallback(
    (pageToRedirect: string) => setPage(pageToRedirect),
    [setPage]
  );

  return (
    <div className="h-screen w-screen">
      <PageComponent />
    </div>
  );
};

export default App;
