import React from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ShowCase from "./components/ShowCase";
import "./style.css";
import FlashCard from "./components/FlashCard";
import CardList from "./components/CardList";
import SigUpCard from "./components/SigUpCard";
import PriceList from "./components/PriceList";
import TestimonialsList from "./components/TestimonialsList";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignInPage />} /> */}
        {/* <Route path="/products/:id" element={<ProductDetailPage />} />   */}
      </Routes>
    </Router>
  );
}
export default App;
