import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GeneratorPage from './pages/GeneratorPage.jsx';
import ThemeSelector from './pages/ThemeSelector.jsx';
import UIViewer from './pages/UIViewer.jsx';

export const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export default function App() {
  const [industryData, setIndustryData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <AppContext.Provider value={{ industryData, setIndustryData, selectedTheme, setSelectedTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/themes" element={industryData ? <ThemeSelector /> : <Navigate to="/" />} />
          <Route path="/preview/:themeId/:pageId?" element={industryData && selectedTheme ? <UIViewer /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
