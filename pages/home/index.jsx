import React from "react";
import About from "../../components/About";
import Campaigns from "../../components/Campaigns";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";
import Reservation from "../../components/Reservation";
import Image from "next/image";
import MyCarousel from "../../components/MyCarousel";
import {useMediaQuery} from "react-responsive";
import {Carousel} from "flowbite-react";
import WhatsAppButton from "../../components/WhatsAppButton";


const Index = ({ categoryList, productList }) => {
    const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });
  return (
      isIPhone ? (
          <>
              {/*<MyCarousel></MyCarousel>*/}
              <br/><br/><br/><br/><br/>
              <WhatsAppButton></WhatsAppButton>
              {/*<div className="font-mono uppercase text-5xl text-black">*/}
              {/*    MENU*/}
              {/*</div>*/}
              <MenuWrapper categoryList={categoryList} productList={productList}/>
              {/*<Campaigns/>*/}
              {/*<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>*/}
              <About/>
              <Reservation/>
              {/*<Customers />*/}
          </>

      ) : (
          <>
              <MyCarousel></MyCarousel>
              <WhatsAppButton></WhatsAppButton>
              {/*<Image src="/yasha-main-picture.jpg" alt="Yasha Grill" layout="fill"*/}
              {/*       objectFit="cover"/>*/}
              <div>
              </div>
              {/*<div className="max-w bg-secondary">*/}
              {/*    <MenuWrapper categoryList={categoryList} productList={productList}/>*/}
              {/*    <About/>*/}
              {/*</div>*/}
              <div className="max-w">
                  <MenuWrapper categoryList={categoryList} productList={productList}/>
                  <About/>
              </div>
              {/*<Campaigns/>*/}
              {/*<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>*/}
              <Reservation/>
              {/*<Customers />*/}
          </>
      )

  );
};

export default Index;
