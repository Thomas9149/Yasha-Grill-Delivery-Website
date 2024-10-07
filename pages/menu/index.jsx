import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";
import WhatsAppButton from "../../components/WhatsAppButton";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10 mt-[105px]">
      <WhatsAppButton></WhatsAppButton>
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
