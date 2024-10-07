import React, { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import About from "../About";
import {getSession, useSession} from "next-auth/react";
import axios from "axios";


const Header = () => {
  const { data: session, status } = useSession();

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleOrderNow = () => {
    // Redirect to the menu page wrapper
    router.push('/menu');
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = async () => {
    if (session) {
      try {
        const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const user = userRes.data?.find((user) => user.email === session.user.email);
        if (user) {
          await router.push(`/profile/${user._id}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      await router.push("/auth/login");
    }
  };



  return (
      <div
          className={`h-[5.5rem] z-50 relative w-full ${
              // Colour header
              //router.asPath === "/" ? "bg-red-500 fixed" : "bg-secondary"
              router.asPath === "/" ? "bg-black fixed" : "bg-black fixed"
          }`}
      >
        <div className="container mx-auto text-white flex justify-between items-center h-full">
          <div
              className="flex items-center mt-[320px] ml-[-15px]"> {/* Adjusted margin-left for more left positioning */}
            <Logo/> {/* Logo component positioned on the left */}
          </div>
          <nav
              className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${
                  isMenuModal === true && "!grid place-content-center"
              }`}
          >
            <ul className="flex gap-x-2 sm:flex-row flex-col items-center ml-[-230px]"> {/* Added ml-[-10px] for left margin */}
              <li
                  className={`px-[5px] py-[10px] font-bold uppercase hover:text-primary cursor-pointer ${
                      router.asPath === "/" && "text-primary"
                  }}`}
                  onClick={() => setIsMenuModal(false)}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                  className={`px-[5px] py-[10px] font-bold uppercase hover:text-primary cursor-pointer ${
                      router.asPath === "/menu" && "text-primary"
                  }`}
                  onClick={() => setIsMenuModal(false)}
              >
                <Link href="/menu">Menu</Link>
              </li>
              <li
                  className={`px-[5px] py-[10px] font-bold uppercase hover:text-primary cursor-pointer ${
                      router.asPath === "/auth/login" && "text-primary"
                  }`}
                  onClick={() => setIsMenuModal(false)}
              >
                {/*<Link href={session ? "/auth/login" : "/auth/login"}>*/}
                {/*  {session ? "Profile" : "Sign In"}*/}
                {/*</Link>*/}
                <div onClick={handleProfileClick} className="cursor-pointer">
                  {session ? "Profile" : "Sign In"}
                </div>
                {/*<Link href={session ? `/profile/${session.user.id}` : "/auth/login"}>*/}
                {/*  {session ? "Profile" : "Login"}*/}
                {/*</Link>*/}
              </li>
              {/*<li*/}
              {/*    className={`px-[5px] py-[10px] font-bold uppercase hover:text-primary cursor-pointer ${*/}
              {/*        router.asPath === "/about" && "text-primary"*/}
              {/*    }`}*/}
              {/*    onClick={() => setIsMenuModal(false)}*/}
              {/*>*/}
              {/*  <Link href="/about">About</Link>*/}
              {/*</li>*/}
              {/*<li*/}
              {/*  className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${*/}
              {/*    router.asPath === "/reservation" && "text-primary"*/}
              {/*  }`}*/}
              {/*  onClick={() => setIsMenuModal(false)}*/}
              {/*>*/}
              {/*  <Link href="/reservation">Book Table</Link>*/}
              {/*</li>*/}
            </ul>
            {isMenuModal && (
                <button
                    className="absolute  top-4 right-4 z-50"
                    onClick={() => setIsMenuModal(false)}
                >
                  <GiCancel size={25} className=" transition-all"/>
                </button>
            )}
          </nav>
          <div className="flex gap-x-4 items-center">
            {/*<Link href="/auth/login">*/}
            {/*<span>*/}
            {/*  {router.asPath.includes("auth") ? (*/}
            {/*      <i*/}
            {/*          className={`fa-solid fa-right-to-bracket ${*/}
            {/*              router.asPath.includes("login") && "text-primary"*/}
            {/*          } `}*/}
            {/*      ></i>*/}
            {/*  ) : (*/}
            {/*      <FaUserAlt*/}
            {/*          className={`hover:text-primary transition-all cursor-pointer ${*/}
            {/*              (router.asPath.includes("auth") ||*/}
            {/*                  router.asPath.includes("profile")) &&*/}
            {/*              "text-primary"*/}
            {/*          }`}*/}
            {/*      />*/}
            {/*  )}*/}
            {/*</span>*/}
            {/*</Link>*/}


            <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                  className={`hover:text-primary transition-all cursor-pointer`}
              />
              <span
                  className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
            </Link>
            {/*<button onClick={() => setIsSearchModal(true)}>*/}
            {/*  <FaSearch className="hover:text-primary transition-all cursor-pointer" />*/}
            {/*</button>*/}



            <a href="#"
               className="md:inline-block hidden sm px-[5px] py-[10px] font-bold uppercase hover:text-primary cursor-pointer">
              <button className="btn-primary flex items-center gap-2" onClick={handleOrderNow}>
                Order Online <img src="/burger.png" alt="Burger Icon" className="w-6 h-6"/>
              </button>
            </a>


            {/*<button*/}
            {/*    className="sm:hidden inline-block"*/}
            {/*    onClick={() => setIsMenuModal(true)}*/}
            {/*>*/}
            {/*  <GiHamburgerMenu className="text-xl hover:text-primary transition-all"/>*/}
            {/*</button>*/}

            <div className="sm:hidden relative">
              <button
                  onClick={handleClick}
                  className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg transition-all hover:bg-gray-700 focus:outline-none"
              >
                {/* Top bar, transforms to the first part of 'X' */}
                <span
                    className={`bg-white block transition-all duration-300 ease-in-out h-0.5 w-6 rounded-sm ${
                        isOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                ></span>
                {/* Middle bar, fades out */}
                <span
                    className={`bg-white block transition-all duration-300 ease-in-out h-0.5 w-6 rounded-sm my-1 ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                ></span>
                {/* Bottom bar, transforms to the second part of 'X' */}
                <span
                    className={`bg-white block transition-all duration-300 ease-in-out h-0.5 w-6 rounded-sm ${
                        isOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                ></span>
              </button>
              {isOpen && (
                  <div
                      className="absolute top-12 right-0 max-w-xs bg-yellow-400 border border-gray-400 rounded-b-lg shadow-lg"
                      style={{right: '0px'}} // Ensure the menu is aligned to the right
                  >
                    <ul className="py-4">
                      {/* Menu items */}
                      <li className="px-4 py-2.5 text-sm font-bold text-black border-b">
                        <a href="/">Home</a>
                      </li>
                      {/*border-gray-300*/}
                      <li className="px-4 py-2.5 text-sm font-bold text-black border-b">
                        <a href="/menu">Menu</a>
                      </li>
                      <li
                          className={`px-4 py-2.5 text-sm font-bold text-black border-b${
                              router.asPath === "/auth/login" && "text-primary"
                          }`}
                          onClick={() => setIsMenuModal(false)}
                      >
                        {/*<Link href={session ? "/auth/login" : "/auth/login"}>*/}
                        {/*  {session ? "Profile" : "Login"}*/}
                        {/*</Link>*/}
                        <div onClick={handleProfileClick} className="cursor-pointer">
                          {session ? "Profile" : "Sign In"}
                        </div>
                      </li>
                      {/*<li className="px-4 py-2.5 text-sm font-bold text-black border-b">*/}
                      {/*  <a href="/about">About</a>*/}
                      {/*</li>*/}
                    </ul>
                  </div>

              )}
            </div>


          </div>
        </div>
        {/*{isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}*/}
      </div>
  );
};

export default Header;
