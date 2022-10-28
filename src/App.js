import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import NavMenu from './Components/NavMenu/NavMenu';
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import GamePage from "./Pages/Games/GamePage";
import NewsPage from "./Pages/News/NewsPage";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://www.sandbox.wpviva.com:8080/graphql',
  // uri: 'https://clubthreesix.com/jemson/external/vivastudios/graphql',
  defaultOptions: {
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'ignore'
    }
  }
});



function App() {
  return (
    <ApolloProvider client={client}>
      <header>
        <NavMenu component={NavMenu} />
      </header>
      <main className="Wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/news-page" element={<NewsPage />} />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
