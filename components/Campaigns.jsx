import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";
import React from "react";
import {useMediaQuery} from "react-responsive";

const CampaignItem = () => {

    const isIPhone = useMediaQuery({query: "(max-width: 600px)"});

    return (
      isIPhone ? (
          <>
              <div className="bg-amber-500 flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
                  {/*<div className="relative md:w-44 md:h-44 w-36 h-36 after:content-['']   border-[5px] border-primary rounded-full overflow-hidden">*/}
                  <div
                      className="relative md:w-49 md:h-49 w-48 h-48 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden">
                      <Image
                          // src="/philly-cheese.png"
                          src="/best-wraps.png"
                          alt=""
                          layout="fill"
                          className="hover:scale-105 transition-all"
                          objectFit="cover"
                          priority
                      />
                  </div>
                  <div className="text-white font-bold font-mono uppercase">
                      <Title addClass="text-2xl">Philly cheese steak </Title>
                      <div className="font-dancing my-1">
                          <span className="text-white font-bold font-mono uppercase">£6.99</span>
                          <span className="text-white inline-block ml-3 font-bold font-mono uppercase">Off</span>
                          {/*<span className="text-[40px]">20%</span>*/}
                          {/*<span className="text-sm inline-block ml-1">Off</span>*/}
                      </div>
                      <button className="btn-primary flex items-center gap-x-2">
                          Order Now <MdShoppingCart size={20}/>
                      </button>
                  </div>
              </div>
          </>
      ) : (
          // <div className="bg-vegetables rounded-md py-5 px-[45px] flex items-center gap-x-8">
          <div className="bg-vegetables mx-auto max-w-screen-2l rounded-md py-5 px-[45px] flex items-center gap-x-8 ">
              {/*<div className="relative md:w-44 md:h-44 w-36 h-36 after:content-['']   border-[5px] border-primary rounded-full overflow-hidden">*/}
              <div
                  className="relative md:w-44 md:h-44 w-50 h-70 after:content-[''] border-[3px] border-primary rounded-full overflow-hidden">
                  <Image
                      // src="/philly-cheese.png"
                      src="/best-wraps.png"
                      alt=""
                      layout="fill"
                      className="hover:scale-105 transition-all"
                      objectFit="cover"
                      priority
                  />
              </div>
              <div className="text-white font-bold font-mono uppercase">
                  <Title addClass="text-2xl">Philly cheese steak </Title>
                  <div className="font-dancing my-1">
                      <span className="text-white font-bold font-mono uppercase">£6.99</span>
                      <span className="text-white inline-block ml-3 font-bold font-mono uppercase">Off</span>
                      {/*<span className="text-[40px]">20%</span>*/}
                      {/*<span className="text-sm inline-block ml-1">Off</span>*/}
                  </div>
                  <br/>
                  <button className="btn-primary flex items-center gap-x-2">
                      Order Now <MdShoppingCart size={20}/>
                  </button>
              </div>
          </div>
      )
    );
};

const Campaigns = () => {
    const isIPhone = useMediaQuery({query: "(max-width: 600px)"});

    return (
        // <div className="bg-rose-950 flex justify-between container mx-auto py-20 gap-6 flex-wrap">
        isIPhone ? (
            <>
                <div
                    className="container mx-auto bg-freshIngredients flex flex-col items-center w-full mb-16 h-96 relative">
                    <p>Hello iphone</p>
                </div>
            </>
    ) : (
        <>
            <div
                className="container mx-auto max-w-screen-2l bg-freshIngredients flex flex-col items-center w-full mb-16 h-96 relative">
                <Image
                    src="/freshIngredientTwo.png"
                    alt="Menu"
                    layout="fill"
                    objectFit="contain"
                />
                {/*Space between fresh ingredients and campaign items}*/}
                <div className="mt-4">
                    <p>Hello</p>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
                    {/*Margin left and right for items*/}
                    <div className="ml-8">
                        <CampaignItem/>
                    </div>
                    <div className="mr-8">
                        <CampaignItem/>
                    </div>
                    <div className="ml-8 mt-4">
                        <CampaignItem/>
                    </div>
                    <div className="mr-8 mt-4">
                        <CampaignItem/>
                    </div>
                </div>
                <br/><br/>
            </div>

            {/*<div className="container mx-auto bg-freshIngredients flex flex-col items-center w-full mb-16">*/}
            {/*    <Image src="/freshIngredient.png" alt="Menu" width={500} height={500}/>*/}
            {/*</div>*/}
        </>
    )
    );
};

export default Campaigns;
