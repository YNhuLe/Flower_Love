import React from "react";
import BestProduct from "../components/BestProduct";
import GiftBoxOffer from "../components/GiftBoxOffer";
import NavBar from "../components/NavBar";
import CustomGiftBox from "../components/CustomGiftBox";
import CustomGiftCard from "../components/CustomGiftCard";

function ProductPage() {
  return (
    <>
      <NavBar />
      <BestProduct />
      <GiftBoxOffer />
      <CustomGiftBox />
      <CustomGiftCard />
    </>
  );
}

export default ProductPage;
