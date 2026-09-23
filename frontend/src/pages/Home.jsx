import React from "react";
import Hero from "../components/Hero";
import LetestCollection from "../components/LetestCollection";
import Bestseller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import SearchBar from "../components/SearchBar";
function Home() {
  return (
    <div>
      <SearchBar />
      <Hero />
      <LetestCollection />
      <Bestseller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}

export default Home;
