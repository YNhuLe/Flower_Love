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
import PlantDetailsPage from "./pages/PlantDetailsPage";
import PlantQuizPage from "./pages/PlantQuizPage";
import PlantQuizResultPage from "./pages/PlantQuizResultPage";
import { QuizProvider } from "./context/QuizContext";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import PaymentPage from "./pages/PaymentPage";
import { CartContextProvider } from "./context/CartContext";
import { Toaster } from "sonner";
import CheckoutPage from "./pages/CheckoutPage";
import DashBoardPage from "./pages/DashBoardPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import SigninFormPage from "./pages/SigninFormPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import AuthCallback from "../src/features/Authentication/AuthCallback"
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

    <>
      <Toaster richColors position="top-right"/>
      <AuthProvider>
    <CartContextProvider>
    <QuizProvider>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/giftbox/:id" element={<GiftBoxOffer />} />
        <Route path="/products/:plant_id" element={<PlantDetailsPage />} />
        <Route path="/products/quiz" element={<PlantQuizPage />}/>
        <Route path="/products/quiz/quiz_result" element={<PlantQuizResultPage />} />
        <Route path="/products/cart" element={<PaymentPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignInPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />

        {/* routes for user authentication( signup, login, ) */}

        {/* Authentication */}
        <Route path="/signup" element={<AuthenticationPage/>} />
        <Route path="/callback" element={<AuthCallback />} />
            <Route path="/signup/profile" element={<ProfilePage/>} />
        <Route path="/signin" element={<SigninFormPage />} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </QuizProvider>
    </CartContextProvider></AuthProvider></>
        );
}
export default App;
