import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import {
  quantityDecrease,
  quantityIncrease,
  reset,
} from "../../redux/cartSlice";
import axios from "axios";
import {getSession, useSession} from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

const Cart = ({ userList }) => {
  const { data: session } = useSession();


  const [selectedOption, setSelectedOption] = useState('delivery');


  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  // Calculate original price
  const originalPrice = cart.products.reduce((total, product) => {
    {
      return total + product.price * product.foodQuantity;
    }
  }, 0);

  // Calculate total price
  let total = originalPrice;

  if (selectedOption === "delivery") {
    if (cart.products.length === 0){
      total = 0;
    }else{
      total += 2.00; // Add delivery fee
    }
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const dispatch = useDispatch();

  const user = userList?.find((user) => user.email === session?.user?.email);

  const [productState, setProductState] = useState([]);

  useEffect(() => {
    const productTitles = cart.products.map((product) => {
      return {
        title: product.title,
        foodQuantity: product.foodQuantity,
        extras: product.extras,
      };
    });
    setProductState(productTitles);
  }, [cart.products]);
  // console.log(productState);

  const [voucherCode, setVoucherCode] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Set invalidCode to true to indicate that the code is invalid
    setInvalidCode(true);
  };

  const handleCheckout = async () => {
    if (cart.products.length === 0) {
      toast.warn("Cart is empty. Please add items to proceed to checkout.");
    }
    else if (session){
      const formattedTotal = Math.round(total * 100); // Convert total to cents
      if (cart.products.length === 0) {
        toast.warn("Cart is empty. Please add items to proceed to checkout.");
      }
      else if (cart.products.length === 0) {
        toast.warn("Cart is empty. Please add items to proceed to checkout.");
      } else {
        try {
          const selectedOption = sessionStorage.getItem('selectedOption'); // Retrieve the selected option

          const amountToSend = selectedOption === 'collection' ? 100 : formattedTotal;

          let newOrder = {
            customer: user?.fullName,
            address: user?.address ? user?.address : "No address",
            postcode: user?.postcode ? user?.postcode : "No postcode",
            total: cart.total + 2, // Default total (including $2 delivery fee)
            basketValueTotal: cart.total,
            products: productState,
            method: 0,
            payAtCollect: 0,
            delivery: 1,
          };
          // Update the newOrder total only if the selected option is 'collection'
          if (selectedOption === 'collection') {
            newOrder.total = 1; // Set to £1 (100 pence)
            newOrder.payAtCollect=1; // Yes (Pay at collection)
            newOrder.delivery=0;
          }
          else {
            // Check if phone, email, or address is missing
            if (!user?.phoneNumber || !user?.email || !user?.address || !user?.postcode) {
              toast.warn("Please update your profile with a valid phone number, email, postal code, and address before checking out.");
              return;
            }
          }

          const response = await axios.post("/api/create-payment-intent", {
            amount: amountToSend
          });

          // Extract clientSecret from the response
          const { clientSecret } = response.data;

          // Generate a random ID to reference the clientSecret and the total price
          const clientSecretId = uuidv4();


          // Store the clientSecret and the formattedTotal in sessionStorage with the unique ID
          sessionStorage.setItem(`${clientSecretId}_clientSecret`, clientSecret);
          // console.log("formatted total: ", formattedTotal);
          sessionStorage.setItem(`${clientSecretId}_formattedTotal`, formattedTotal);
          sessionStorage.setItem(`${clientSecretId}_newOrder`, JSON.stringify(newOrder));

          //console.log("Client order: ", newOrder);
          //console.log("Sending Client order: as ", JSON.stringify(newOrder));

          // Navigate to the checkout page with the random ID
          router.push({
            pathname: "/checkout/[id]",
            query: { id: clientSecretId } // Pass the ID instead of the clientSecret
          });
        } catch (error) {
          console.error("Error during checkout:", error);
          toast.error("Error during checkout. Please try again.");
        }
      }
    } else{ // User not logged in
      router.push("/auth/login");
      toast.error("You must be logged in to create an order");
    }
  };

  const handleIncrement = (product) => {
    // console.log("Incrementing product with id:", id);
    dispatch(quantityIncrease({ product }));
  };

  const handleDecrement = (product) => {
    // console.log("Decrementing product with id:", id);
    dispatch(quantityDecrease({ product }));
  };


  const handleRemove = (id) => {
    console.log("Removing product with id:", id);
    // Here, we filter out the product with the given id
    const updatedProducts = cart.products.filter(
      (product) => product._id !== id
    );
    setProductState(updatedProducts);
    // Then, we calculate the new total and quantity
    const updatedTotal = updatedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const updatedQuantity = updatedProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );
    dispatch(
      reset({
        products: updatedProducts,
        total: updatedTotal,
        quantity: updatedQuantity,
      })
    );
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 mt-60">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.products.length === 0 ? (
                <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
                  Shopping cart is empty.
                </p>
              ) : (
                cart.products.map((product, index) => (
                  <CartItem
                    key={product._id}
                    product={product}
                    title={product.title}
                    price={product.price}
                    quantity={product.foodQuantity}
                    onIncrement={() => handleIncrement(product)}
                    onDecrement={() => handleDecrement(product)}
                    onRemove={() => handleRemove(product._id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${originalPrice.toFixed(2)}
                    </dd>
                  </dl>


                  {selectedOption === "delivery" ? (
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery Fee
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {cart.products.length === 0 ? "$0.00" : "$2.00"}
                        </dd>
                      </dl>
                  ) : (
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery Fee
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          $0.00
                        </dd>
                      </dl>
                  )}

                  {/* Pass the selected option and handler */}
                  <RadioButtons
                      selectedOption={selectedOption}
                      onOptionChange={handleOptionChange}
                  />


                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                  </dd>
                </dl>
              </div>

              <a
                  onClick={handleCheckout}
                  className="flex w-full items-center dark:text-white text-black justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Checkout
              </a>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Do you have a voucher or gift card?
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center dark:text-white text-black justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Apply Code
                </button>
                {invalidCode && (
                  <p className="text-red-500 text-sm">Code invalid</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async ({req}) => {
  const session = await getSession({req});

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user){
    return {
      props: {
        userList: res.data ? res.data : [],
      },
    };
  }

  return {
    props: {},
  };
};

export default Cart;

const RadioButtons = ({ selectedOption, onOptionChange }) => {

  const refreshPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (typeof window !== 'undefined') {
      window.location.reload(false);
    }
  };

  const [selected, setSelected] = useState(() => {
    // Retrieve the stored option from sessionStorage, or default to 'delivery'
    try {
      return sessionStorage.getItem('selectedOption') || 'delivery';
    } catch (error) {
      console.log(error);
      return 'delivery'; // Return a default value even in case of error
    }
  });

  const handleChange = (e) => {
    const selectedOption = e.target.id;
    setSelected(selectedOption);
    onOptionChange(selectedOption);
    // Store the selected option in sessionStorage
    sessionStorage.setItem('selectedOption', selectedOption);
  };

  return (
      <div className="flex gap-10">
        <div className="inline-flex items-center">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="delivery">
            <input
                name="type"
                type="radio"
                id="delivery"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                onChange={handleChange}
                checked={selected === 'delivery'}
            />
            <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
          </label>
          <dl className="flex items-center ml-6 justify-between pt-2 dark:border-gray-700">
            <dt className="text-base text-gray-900 dark:text-white">
              Delivery
            </dt>
          </dl>
        </div>
        <div className="inline-flex items-center">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="collection">
            <input
                name="type"
                type="radio"
                id="collection"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                onChange={handleChange}
                checked={selected === 'collection'}
            />
            <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
          </label>
          <dl className="flex items-center ml-6 justify-between pt-2 dark:border-gray-700">
            <dt className="text-base text-gray-900 dark:text-white">
              Pay at Collection
            </dt>
          </dl>
        </div>
      </div>
  );
};