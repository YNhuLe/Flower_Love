import React from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import ShowCase from "./components/ShowCase";
import "./style.css";
import FlashCard from "./components/FlashCard";
import CardList from "./components/CardList";
import SigUpCard from "./components/SigUpCard";
import PriceList from "./components/PriceList";
import TestimonialsList from "./components/TestimonialsList";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Hero />
      {/* <EntryList /> */}
      <ShowCase />

      {/* <FlashCard /> */}
      <CardList type="card" />
      <SigUpCard />
      <CardList type="com" />
      <PriceList />
      <ProductList />
      <TestimonialsList />
      <ContactUs />
      <Footer />
    </BrowserRouter>
  );
}
export default App;
