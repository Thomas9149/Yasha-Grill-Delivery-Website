"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';

const StripeElements = dynamic(() =>
        import('../../components/StripeElements').then((mod) => mod.StripeElements),
    { ssr: false }
);

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState("");
    const [total, setTotal] = useState(0);
    const [adjustedTotal, setAdjustedTotal] = useState(0);
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deliveryOption, setDeliveryOption] = useState("");
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (typeof window !== 'undefined' && id) {
            const storedClientSecret = sessionStorage.getItem(`${id}_clientSecret`);
            const storedTotal = sessionStorage.getItem(`${id}_formattedTotal`);
            const storedOrder = sessionStorage.getItem(`${id}_newOrder`);
            const storedDeliveryOption = sessionStorage.getItem('selectedOption');

            if (storedClientSecret) {
                setClientSecret(storedClientSecret);
            }
            if (storedDeliveryOption) {
                setDeliveryOption(storedDeliveryOption);
                console.log("Received Delivery Option: ", storedDeliveryOption);
            }
            if (storedTotal) {
                const totalValue = parseInt(storedTotal, 10);
                setTotal(totalValue);

                const adjustedValue = storedDeliveryOption === 'collection' ? 100 : totalValue;
                setAdjustedTotal(adjustedValue);

                console.log("Adjusted total: ", adjustedValue);
            }

            if (storedOrder) {
                const parsedOrder = JSON.parse(storedOrder);
                setOrder(parsedOrder);
            }

            if (!storedClientSecret && !storedTotal && !storedOrder) {
                console.error("Total amount or order not found. Please try again.");
            }

            setIsLoading(false);
        }
    }, [id, total]);  // Adding `total` as a dependency ensures `adjustedTotal` updates correctly

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            {clientSecret ? (
                <>
                    <StripeElements
                        clientSecret={clientSecret}
                        adjustedTotal={adjustedTotal}
                        order={order}
                    />
                </>
            ) : (
                <p>Unable to load checkout. Please try again.</p>
            )}
        </div>
    );
}
