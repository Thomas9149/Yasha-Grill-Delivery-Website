import React, { useCallback, useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import {reset} from "../redux/cartSlice";
import {toast} from "react-toastify";
import {router} from "next/client";
import {useRouter} from "next/router";

function sleep(seconds){
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

async function refreshPage() {
     await sleep(2);
    window.location.reload(true);
}

export default function CheckoutForm({ total, order, clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = router.query;
    const [basketTotal, setBasketTotal] = useState(0);


    const [deliveryOption, setDeliveryOption] = useState("");

    useEffect(() => {
        if (id) {  // Check if 'id' is available
            const storedDeliveryOption = sessionStorage.getItem('selectedOption');
            const storedTotal = sessionStorage.getItem(`${id}_formattedTotal`);
            if (storedDeliveryOption) {
                setDeliveryOption(storedDeliveryOption);
            }
            if (storedTotal){
                const totalValue = parseInt(storedTotal, 10);
                setBasketTotal(totalValue);
            }
        }
    }, [id]);  // Use 'id' as a dependency to ensure this runs when 'id' changes


    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Memoize createOrder to ensure stability across renders
    const createOrder = useCallback(async () => {
        try {
            console.log("ORDER: ", order);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/orders`,
                order
            );
            await router.push(`/order/${res.data._id}`);
            toast.success("Order created successfully");
            await refreshPage();
            //console.log("Order created:", res.data);
        } catch (error) {
            //toast.error("An error occurred when creating your order")
            //console.error("Error creating order:", error);
            setMessage("Error creating order. Please try again.");
        }
    }, [order]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
            });
            if (error) {
                toast.error("Payment failed. Please check your payment details and try again. If the issue persists, contact support.");
                console.error("Error confirming payment:", error);
                // Handle error (e.g., display a message to the user)
            }else{ // Create order
                await createOrder();
            }
        } catch (error) {
            console.error("Error handling payment:", error);
            // Optionally display an error message to the user
        } finally {
            setIsLoading(false);
        }
    };
    const paymentElementOptions = {
        layout: "tabs",
    };

    const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

    return (
        isIPhone ? (
            <>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <form
                    id="payment-form"
                    onSubmit={handleSubmit}
                    className="w-[90%] ml-5 max-w-[500px] min-w-[300px] contain-layout self-center shadow-[0_0_0_0.5px_rgba(50,50,93,0.1),0_2px_5px_0_rgba(50,50,93,0.1),0_1px_1.5px_0_rgba(0,0,0,0.07)] rounded-[7px] p-[20px] sm:w-[80%] md:w-[60%] lg:w-[40%]"
                >
                    <PaymentElement id="payment-element" options={paymentElementOptions} className="mb-[24px]"/>

                    <div className="text-center text-[18px] font-semibold mb-[24px]">
                        Total Payment Online: £{total / 100}
                    </div>

                    {deliveryOption === 'collection' && (
                        <div className="text-center text-[18px] font-semibold mb-[24px]">
                            Total Payment in Store: £{((basketTotal / 100) - 1).toFixed(2)}
                        </div>
                    )}
                    {deliveryOption === 'collection' && (
                        <p className="text-[14px] text-center text-[#69738A] mb-[24px]">
                            This £1 fee is required to process your order. You will need to pay the remaining balance of
                            £{((basketTotal / 100) - 1).toFixed(2)} in person when you collect your order.
                        </p>
                    )}

                    <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        className={`bg-[#5469d4] font-sans text-white rounded-[4px] border-0 px-[16px] py-[12px] text-[16px] font-semibold cursor-pointer block transition-all ease-[0.2s] shadow-[0_4px_5.5px_rgba(0,0,0,0.07)] w-full ${isLoading || !stripe || !elements ? 'opacity-50 cursor-default' : ''} hover:contrast-115`}
                    >
    <span id="button-text">
        {isLoading ? (
            <div
                className="spinner w-[20px] h-[20px] relative m-auto text-indent-[-99999px] text-white border-[2px] rounded-full"
                id="spinner"
            ></div>
        ) : (
            `Pay now £${(deliveryOption === 'collection' ? (1).toFixed(2) : (total / 100).toFixed(2))}`
        )}
    </span>
                    </button>


                    {message && <div id="payment-message"
                                     className="text-[#69738A] text-[16px] leading-[20px] pt-[12px] text-center">{message}</div>}
                </form>
                <br/>
            </>
        ) : (
            <>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <form
                    id="payment-form"
                    onSubmit={handleSubmit}
                    className="w-[30vw] ml-28 -mt-5 min-w-[500px] self-center shadow-[0_0_0_0.5px_rgba(50,50,93,0.1),0_2px_5px_0_rgba(50,50,93,0.1),0_1px_1.5px_0_rgba(0,0,0,0.07)] rounded-[7px] p-[40px] md:w-[80vw] md:min-w-0"
                >
                    <PaymentElement id="payment-element" options={paymentElementOptions} className="mb-[24px]"/>

                    <div className="text-center text-[18px] font-semibold mb-[24px]">
                        Total Payment Online: £{total / 100}
                    </div>

                    {deliveryOption === 'collection' && (
                        <div className="text-center text-[18px] font-semibold mb-[24px]">
                            Total Payment in Store: £{((basketTotal / 100) - 1).toFixed(2)}
                        </div>
                    )}
                    {deliveryOption === 'collection' && (
                        <p className="text-[14px] text-center text-[#69738A] mb-[24px]">
                            This £1 fee is required to process your order. You will need to pay the remaining balance of
                            £{((basketTotal / 100) - 1).toFixed(2)} in person when you collect your order.
                        </p>
                    )}

                    <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        className={`bg-[#5469d4] font-sans text-white rounded-[4px] border-0 px-[16px] py-[12px] text-[16px] font-semibold cursor-pointer block transition-all ease-[0.2s] shadow-[0_4px_5.5px_rgba(0,0,0,0.07)] w-full ${isLoading || !stripe || !elements ? 'opacity-50 cursor-default' : ''} hover:contrast-115`}
                    >
    <span id="button-text">
        {isLoading ? (
            <div
                className="spinner w-[20px] h-[20px] relative m-auto text-indent-[-99999px] text-white border-[2px] rounded-full"
                id="spinner"
            ></div>
        ) : (
            `Pay now £${(deliveryOption === 'collection' ? (1).toFixed(2) : (total / 100).toFixed(2))}`
        )}
    </span>
                    </button>


                    {message && <div id="payment-message"
                                     className="text-[#69738A] text-[16px] leading-[20px] pt-[12px] text-center">{message}</div>}
                </form>
                <br/>
            </>
        )
    );
}
