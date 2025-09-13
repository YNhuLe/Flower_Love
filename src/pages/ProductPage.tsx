import React from "react";
import BestProduct from "../components/BestProduct";
import GiftBoxOffer from "../components/GiftBoxOffer";
import NavBar from "../components/NavBar";
import CustomGiftBox from "../components/CustomGiftBox";

function ProductPage() {
  return (
    <>
      <NavBar />
      <BestProduct />
      <GiftBoxOffer />
      <CustomGiftBox />
    </>
  );
}

export default ProductPage;
