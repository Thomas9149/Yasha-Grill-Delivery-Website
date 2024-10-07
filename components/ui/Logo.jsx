import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

const Logo = () => {
    const router = useRouter();
    const { pathname } = router;
  return (
      // <Link href="/">
      //     {/*font-bold*/}
      //   <span className="text-[2rem] merriweather-regular cursor-pointer">
      //     YASHA GRILL PIZZA & BURGERS
      //   </span>
      // </Link>
      <header>
          {/* Conditionally render the logo if the current path is not '/about/terms' */}
          {(pathname !== '/about/terms' && pathname !== '/about/privacy-policy') && (
              <Link href="/">
                  <a className="logo" style={{position: 'relative', top: '-10px', left: '15px'}}>
                      <div
                          className="relative md:w-72 md:h-72 w-48 h-48 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden">
                          <Image
                              src="/logoOne.png"
                              alt="Logo"
                              layout="fill"
                              className="hover:scale-105 transition-all"
                              objectFit="cover"
                              priority
                          />
                      </div>
                  </a>
              </Link>
          )}
      </header>
  );
};

export default Logo;
