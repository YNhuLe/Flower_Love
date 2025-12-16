import React from "react";
import Footer from "./common/Footer";
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
import GiftBoxOffer from "./components/GiftBoxOffer";
import PlantDetails from "./pages/PlantDetails";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import PlantQuizPage from "./pages/PlantQuizPage";
import PlantQuizResultPage from "./pages/PlantQuizResultPage";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient(
  {
    defaultOptions:{
      queries:{
        staleTime: 1000 * 60 * 6,
      }
    }
  }
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/giftbox/:id" element={<GiftBoxOffer />} />
        <Route path="/products/:id" element={<PlantDetailsPage />} />
        <Route path="/products/quiz" element={<PlantQuizPage />}/>
        <Route path="/products/quiz/quiz_result" element={<PlantQuizResultPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignInPage />} /> */}
      </Routes>
    </Router></QueryClientProvider>
  );
}
export default App;
