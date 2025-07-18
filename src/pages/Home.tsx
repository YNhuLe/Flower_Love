import React from "react";
import Hero from "../components/Hero";
import ShowCase from "../components/ShowCase";
import CardList from "../components/CardList";
import SigUpCard from "../components/SigUpCard";
import PriceList from "../components/PriceList";
import ProductList from "../components/ProductList";
import TestimonialsList from "../components/TestimonialsList";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
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
    </>
  );
}

export default Home;
