import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Client from "./data/connection";
import NavMenu from './Components/NavMenu/NavMenu';
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import GamePage from "./Pages/Games/GamePage";
import GameSlugContent from "./Pages/Games/GameSlugContent";
import NewsPage from "./Pages/News/NewsPage";
import PostPage from "./Pages/PostPage";
import FooterComponent from "./Components/Footer/FooterComponent";


function App() {
  return (
    <ApolloProvider client={Client}>
      <header className="header-wrap">
        <NavMenu component={NavMenu} />
      </header>
      <main className="main-wrap">
        <Routes>
          <Route path="/vivatest" element={<HomePage />} />
          <Route path="/vivatest/about-page" element={<AboutPage />} />
          <Route path="/vivatest/games" element={<GamePage />} />
          <Route path="/vivatest/games/:slug" element={<GameSlugContent />} />
          <Route path="/vivatest/news" element={<NewsPage/>} />
          <Route path="/vivatest/news/:slug" element={<PostPage />} />
        </Routes>
      </main>
      <footer className="footer-wrap">
        <FooterComponent />
      </footer>
    </ApolloProvider>
  );
}

export default App;
