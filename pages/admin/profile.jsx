import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router";

import React, {useEffect, useState} from "react";
import Category from "../../components/admin/Category";
import Footer from "../../components/admin/Footer";
import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import {toast} from "react-toastify";
import Title from "../../components/ui/Title";
import {useMediaQuery} from "react-responsive";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const {push} = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});

  const [isUnsupportedBrowser, setIsUnsupportedBrowser] = useState(false);

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isFirefox = userAgent.includes('firefox');
      const isTor = userAgent.includes('tor');
      const isChrome = userAgent.includes('chrome');


      // Unsupported: Desktop version of Firefox or Tor.
      //if (!isIPhone && (isFirefox || isTor || isChrome)) {
      if (!isIPhone && (isFirefox || isTor)) {
        setIsUnsupportedBrowser(true);
      }
    };

    detectBrowser();
  }, [isIPhone]);

  if (isUnsupportedBrowser) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-red-100 text-center p-4">
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <h1 className="text-xl font-bold">Incompatible Browser</h1>
            <p className="mt-2">
              Our website is currently not compatible with your browser. Please use a different browser such as Google Chrome, Safari, Opera, Microsoft Edge, Brave, or similar to access our site. We apologize for any inconvenience this may cause.
            </p>
          </div>
        </div>
    );
  }

  return (
      <div className="flex px-10 bg-white lg:flex-row flex-col h-full w-full lg:mb-0 mb-10">
        <div className="lg:w-80 w-150 flex flex-col ">
          <div className="items-center mt-10 text-white font-bold text-3xl">
            <div className="text-gray-900">
              <Title>Admin</Title>
            </div>
          </div>
          <ul className="text-center bg-white mt-10 font-semibold">
            <li
                className={`w-full border p-3 hover:text-black text-black cursor-pointer hover:bg-white transition-all ${
                    tabs === 0 && ""
                }`}
                onClick={() => setTabs(0)}
            >
              <i className="fa fa-cutlery a"></i>
              <button className="ml-4">Products</button>
            </li>
            <li
                className={`w-full border p-3 hover:text-black text-black cursor-pointer hover:bg-white transition-all ${
                    tabs === 0 && ""
                }`}
                onClick={() => setTabs(1)}
            >
              <i className="fa fa-motorcycle"></i>
              <button className="ml-1">Orders</button>
            </li>
            <li
                className={`w-full border p-3 hover:text-black text-black cursor-pointer hover:bg-white transition-all ${
                    tabs === 0 && ""
                }`}
                onClick={() => setTabs(2)}
            >
              <i className="fa fa-motorcycle"></i>
              <button className="ml-1">Categories</button>
            </li>
            {/*<li*/}
            {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${*/}
            {/*    tabs === 3 && "bg-primary text-white"*/}
            {/*  }`}*/}
            {/*  onClick={() => setTabs(3)}*/}
            {/*>*/}
            {/*  <i className="fa fa-window-maximize"></i>*/}
            {/*  <button className="ml-1">Footer</button>*/}
            {/*</li>*/}
            {/*<li*/}
            {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}*/}
            {/*  onClick={() => window.open("/", "_blank")}*/}
            {/*>*/}
            {/*  <i className="fa-solid fa-house"></i>*/}
            {/*  <button className="ml-1">*/}
            {/*    Go to the site <br /> (New Tab)*/}
            {/*  </button>*/}
            {/*</li>*/}
            {/*<li*/}
            {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}*/}
            {/*  onClick={() => push("/")}*/}
            {/*>*/}
            {/*  <i className="fa-solid fa-house"></i>*/}
            {/*  <button className="ml-1">*/}
            {/*    Go to the site <br /> (current tab)*/}
            {/*  </button>*/}
            {/*</li>*/}
            <li
                className={`w-full border p-3 hover:text-black text-black cursor-pointer hover:bg-white transition-all ${
                    tabs === 0 && ""
                }`}
                onClick={closeAdminAccount}
            >
              <i className="fa fa-sign-out"></i>
              <button className="ml-1">Exit</button>
            </li>
          </ul>
        </div>
        <div className="w-full items-center ml-16 h-full">
          {tabs === 0 && <Products/>}
          {tabs === 1 && <Order/>}
          {tabs === 2 && <Category/>}
          {tabs === 3 && <Footer/>}
        </div>
      </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;


// <div className="flex px-10 bg-white lg:flex-row flex-col h-full w-full lg:mb-0 mb-10">
//   <div className="lg:w-80 w-150 flex flex-col ">
//     <div className="items-center mt-10 text-white font-bold text-3xl">
//       <div className="text-gray-900">
//         <Title>Admin</Title>
//       </div>
//     </div>
//     <ul className="text-center mt-10 font-semibold">
//       <li
//           className={`w-full border p-3 hover:text-black text-white cursor-pointer hover:bg-freshIngredients transition-all ${
//               tabs === 0 && ""
//           }`}
//           onClick={() => setTabs(0)}
//       >
//         <i className="fa fa-cutlery a"></i>
//         <button className="ml-4">Products</button>
//       </li>
//       <li
//           className={`w-full border p-3 hover:text-black cursor-pointer hover:bg-freshIngredients text-white transition-all ${
//               tabs === 0 && " text-white font-bold"
//           }`}
//           onClick={() => setTabs(1)}
//       >
//         <i className="fa fa-motorcycle"></i>
//         <button className="ml-1">Orders</button>
//       </li>
//       <li
//           className={`w-full border p-3 cursor-pointer hover:text-black hover:bg-freshIngredients text-white transition-all ${
//               tabs === 0 && "bg-freshIngredients text-white font-bold"
//           }`}
//           onClick={() => setTabs(2)}
//       >
//         <i className="fa fa-ellipsis-h"></i>
//         <button className="ml-1">Categories</button>
//       </li>
//       {/*<li*/}
//       {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${*/}
//       {/*    tabs === 3 && "bg-primary text-white"*/}
//       {/*  }`}*/}
//       {/*  onClick={() => setTabs(3)}*/}
//       {/*>*/}
//       {/*  <i className="fa fa-window-maximize"></i>*/}
//       {/*  <button className="ml-1">Footer</button>*/}
//       {/*</li>*/}
//       {/*<li*/}
//       {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}*/}
//       {/*  onClick={() => window.open("/", "_blank")}*/}
//       {/*>*/}
//       {/*  <i className="fa-solid fa-house"></i>*/}
//       {/*  <button className="ml-1">*/}
//       {/*    Go to the site <br /> (New Tab)*/}
//       {/*  </button>*/}
//       {/*</li>*/}
//       {/*<li*/}
//       {/*  className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}*/}
//       {/*  onClick={() => push("/")}*/}
//       {/*>*/}
//       {/*  <i className="fa-solid fa-house"></i>*/}
//       {/*  <button className="ml-1">*/}
//       {/*    Go to the site <br /> (current tab)*/}
//       {/*  </button>*/}
//       {/*</li>*/}
//       <li
//           className={`w-full p-3 border cursor-pointer text-white hover:bg-freshIngredients hover:text-black transition-all ${
//               tabs === 0 && "bg-freshIngredients text-white font-bold"
//           }`}
//           onClick={closeAdminAccount}
//       >
//         <i className="fa fa-sign-out"></i>
//         <button className="ml-1">Exit</button>
//       </li>
//     </ul>
//   </div>
//   <div className="w-full h-full">
//     {tabs === 0 && <Products/>}
//     {tabs === 1 && <Order/>}
//     {tabs === 2 && <Category/>}
//     {tabs === 3 && <Footer/>}
//   </div>
// </div>