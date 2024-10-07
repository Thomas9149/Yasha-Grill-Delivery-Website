import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useMediaQuery } from "react-responsive";

const CookieJSX = ({ onAccept, onReject }) => {

    const isIPhone = useMediaQuery({query: "(max-width: 600px)"});


    return (
        <div></div>
        // isIPhone ? (
        //     <>
        //         <div className="fixed bottom-0 inset-x-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        //             <section
        //                 className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl max-w-md mx-auto p-4">
        //                 <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>
        //                 <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        //                     We use cookies to ensure that we give you the best experience on our website.{' '}
        //                     <a href="/about/privacy-policy" target="_blank" rel="noopener noreferrer"
        //                        className="text-blue-500 hover:underline">
        //                         Read cookies policies
        //                     </a>.
        //                 </p>
        //                 <div className="flex items-center justify-between mt-4 gap-x-4">
        //                     <button
        //                         className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none"
        //                         onClick={onReject}>
        //                         Reject All
        //                     </button>
        //                     <button
        //                         className="text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
        //                         onClick={onAccept}>
        //                         Accept
        //                     </button>
        //                 </div>
        //             </section>
        //         </div>
        //     </>
        // ) : (
        //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        //         <section
        //             className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl max-w-md mx-auto p-4">
        //             <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>
        //             <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        //                 We use cookies to ensure that we give you the best experience on our website.{' '}
        //                 <a href="/about/privacy-policy" target="_blank" rel="noopener noreferrer"
        //                    className="text-blue-500 hover:underline">
        //                     Read cookies policies
        //                 </a>.
        //             </p>
        //             <div className="flex items-center justify-between mt-4 gap-x-4">
        //                 <button
        //                     className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none"
        //                     onClick={onReject}
        //                 >
        //                 Reject All
        //                 </button>
        //                 <button
        //                     className="text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
        //                     onClick={onAccept}
        //                 >
        //                     Accept
        //                 </button>
        //             </div>
        //         </section>
        //     </div>
        // )
    );
};

const Layout = ({children}) => {
    const isIPhone = useMediaQuery({query: "(max-width: 600px)"});
    const [isUnsupportedBrowser, setIsUnsupportedBrowser] = useState(false);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [cookiesRejected, setCookiesRejected] = useState(false);

    useEffect(() => {
        const detectBrowser = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isFirefox = userAgent.includes('firefox');
            const isTor = userAgent.includes('tor');

            // Unsupported: Desktop version of Firefox or Tor.
            if (!isIPhone && (isFirefox || isTor)) {
                setIsUnsupportedBrowser(true);
            }
        };

        detectBrowser();

        // Check for stored cookie preference
        const accepted = sessionStorage.getItem('cookiesAccepted');
        const rejected = sessionStorage.getItem('cookiesRejected');
        setCookiesAccepted(accepted === 'true');
        setCookiesRejected(rejected === 'true');
    }, [isIPhone]);

    const handleAcceptCookies = () => {
        sessionStorage.setItem('cookiesAccepted', 'true');
        setCookiesAccepted(true);
    };

    const handleRejectCookies = () => {
        sessionStorage.setItem('cookiesRejected', 'true');
        setCookiesRejected(true);
    };

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
        <div className={cookiesAccepted ? '' : 'opacity-30'}>
            <React.Fragment>
                <Header />
                {!cookiesAccepted && !cookiesRejected && (
                    <CookieJSX onAccept={handleAcceptCookies} onReject={handleRejectCookies} />
                )}
                {children}
                <Footer />
            </React.Fragment>
        </div>
    );
};

export default Layout;