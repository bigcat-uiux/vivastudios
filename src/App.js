import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Client from "./data/connection";
import NavMenu from './Components/NavMenu/NavMenu';
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import GamePage from "./Pages/Games/GamePage";
import NewsPage from "./Pages/News/NewsPage";
import PostPage from "./Pages/PostPage";

function App() {
  return (
    <ApolloProvider client={Client}>
      <header>
        <NavMenu component={NavMenu} />
      </header>
      <main className="Wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/news" element={<NewsPage/>} />
          <Route path="/news/:slug" element={<PostPage />} />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
