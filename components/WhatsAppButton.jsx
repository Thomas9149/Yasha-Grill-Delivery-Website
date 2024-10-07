import React from 'react';
import {useMediaQuery} from "react-responsive";

// icons: https://www.flaticon.com/free-icons/whatsapp
const WhatsAppButton = () => {

    const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

    return (
        isIPhone ? (
            <>
                <a
                    href="https://wa.me/+447305336758"
                    className="fixed bottom-8 right-4 w-15 h-15 bg-[#25d366] text-white flex items-center justify-center rounded-full shadow-md z-50 transition-transform transform hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/whatsapp.png" // Update this with the correct path to your image
                        alt="WhatsApp"
                        className="w-14 h-14"
                    />
                </a>
            </>
        ) : (
            <>
                <a
                    href="https://wa.me/+447305336758"
                    className="fixed bottom-10 right-10 w-15 h-15 bg-[#25d366] text-white flex items-center justify-center rounded-full shadow-md z-50 transition-transform transform hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/whatsapp.png" // Update this with the correct path to your image
                        alt="WhatsApp"
                        className="w-16 h-16"
                    />
                </a>
            </>
        )
    );
};

export default WhatsAppButton;
