import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "flowbite-react";
import { useRouter } from "next/router";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);
  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category.toLowerCase() ===
          categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, active, productList]);

  const router = useRouter();

  return isIPhone ? (
    <>
      <div className="container mx-auto  mb-16">
        <br />
        <br />
        <br />
        <br />
        {
          // router.asPath === "/" ? <div className="font-mono uppercase text-center text-5xl text-black">
          //     MENU
          // </div> : ""
          router.asPath === "/" ? (
            <div className="font-extralight uppercase text-center text-2xl text-black">
              A Taste of Excellence
            </div>
          ) : (
            <div className="font-extralight -mt-5 uppercase text-center text-2xl text-black">
              MENU SELECTION
            </div>
          )
        }
        <div className="bg-amber-500 flex flex-col items-center w-full">
          {/*<Title addClass="text-[40px]">Menu</Title>*/}
          {/*<Image src="/menu.png" alt="Menu" width={500} height={200}/>*/}
          {/*<Image src="/yasha-main-picture.jpg" alt="Yasha Grill" layout="fill"*/}
          {/*       objectFit="contain"/>*/}
          <div className="mt-1 font-mono uppercase text-white">
            {categoryList &&
              categoryList.map((category, index) => (
                <button
                  className={`px-6 py-2 ${
                    index === active &&
                    "bg-secondary font-bold text-white uppercase "
                  } ml-4 rounded-3xl `}
                  key={category._id}
                  onClick={() => {
                    setActive(index);
                    setProductLimit(3);
                  }}
                >
                  {/*{category.title.toUpperCase()}*/}
                  {category.title}
                </button>
              ))}
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">
          {filter.length > 0 &&
            filter
              .slice(0, productLimit)
              .map((product) => (
                <MenuItem key={product._id} product={product} />
              ))}
        </div>
        <div className="flex items-center justify-center my-8">
          <button
            className="btn-primary"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
          <br />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="p-24 mx-auto max-w-screen-2l">
        <div className="uppercase flex flex-col items-center w-full ">
          {/*<Title addClass="text-[40px] bg-amber-500 font-bold ">MENU</Title>*/}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {/*<Image src="/menu.png" alt="Menu" width={500} height={200}/>*/}
          {/*<Image src="/new-menu-logo.png" alt="Menu" width={500} height={200}/>*/}

          {/*<div className="-mt-80 font-mono uppercase text-9xl text-black">*/}
          {/*    MENU*/}
          {/*</div>*/}
          {router.asPath === "/" ? (
            <>
              <div className="-mt-80 font-extralight uppercase text-6xl text-black">
                A Taste of Excellence
              </div>
              <br />
            </>
          ) : (
            <div className="-mt-96 font-extralight uppercase text-6xl text-black mb-8">
              MENU SELECTION
            </div>
          )}

          <div className="-mt-0.1 font-mono uppercase text-black">
            {categoryList &&
              categoryList.map((category, index) => (
                <button
                  className={`px-6 py-2 ${
                    index === active &&
                    "bg-amber-500 font-bold text-white uppercase "
                  } ml-4 rounded-3xl `}
                  key={category._id}
                  onClick={() => {
                    setActive(index);
                    setProductLimit(3);
                  }}
                >
                  {category.title}
                </button>
              ))}
          </div>
          <div></div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">
          {filter.length > 0 &&
            filter
              .slice(0, productLimit)
              .map((product) => (
                <MenuItem key={product._id} product={product} />
              ))}
        </div>
        <div className="flex items-center justify-center my-8">
          <button
            className="btn-primary"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuWrapper;

{
  /*{categoryList &&*/
}
{
  /*    categoryList.map((category, index) => (*/
}
{
  /*        <button*/
}
{
  /*            className={`px-6 py-2 ${*/
}
{
  /*                index === active && "bg-amber-500 font-bold text-white "*/
}
{
  /*            } ml-4 rounded-3xl `}*/
}
{
  /*            key={category._id}*/
}
{
  /*            onClick={() => {*/
}
{
  /*                setActive(index);*/
}
{
  /*                setProductLimit(3);*/
}
{
  /*            }}*/
}
{
  /*        >*/
}
{
  /*            {category.title}*/
}
{
  /*        </button>*/
}
{
  /*    ))}*/
}
