import axios from "axios";
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

const Order = ({ order }) => {
  const status = order?.status;
  const delivery = order?.delivery;
  const payAtCollect = order?.payAtCollect;
  const statusClass = (index) => {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-pulse";
    if (index - status > 1) return "";
  };

  const [user, setUser] = useState(null);

  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

  const getStatusText = (status) => {
    switch(status) {
      case 0:
        return "Preparing";
      case 1:
        return "Ready for Pickup";
      case 2:
        return "Out for Delivery";
      case 3:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getDeliveryStatus = (delivery) => {
    switch(delivery) {
      case 0:
        return "No";
      case 1:
        return "Delivery";
      default:
        return "Unknown";
    }
  };

  const getPayAtCollectStatus = (payAtCollect) => {
    switch(payAtCollect) {
      case 0:
        return "No";
      case 1:
        return "Pay At Collection";
      default:
        return "Unknown";
    }
  };


  const {data: session} = useSession();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (session) {
          // Fetch user data from the API using the session user's email
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const foundUser = res.data?.find((user) => user.email === session.user.email);
          setUser(foundUser); // Store user data in state
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser(); // Call the getUser function
  }, [session]); // Add session as a dependency

  const router = useRouter();



  return (
      isIPhone ? (
          <>
            <div className="overflow-x-auto w-full -ml-4 mt-5 max-h-screen overflow-y-auto">
              <br/><br/><br/><br/><br/><br/><br/>
              <div
                  className="min-h-[calc(100vh_-_433px)] flex  justify-center items-center flex-col p-10  min-w-[1000px]">
                <div className=" flex items-center flex-1  w-full max-h-28">
                  <table className="w-full text-sm text-left ml-8 rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 bg-black py-3">ID</th>
                      <th scope="col" className="px-6 bg-black py-3">STATUS</th>
                      <th scope="col" className="px-6 bg-black py-3">DELIVERY</th>

                      {order?.delivery === 1 && (
                          <>
                            <th scope="col" className="px-6 bg-black py-3">
                              Delivery Postcode
                            </th>
                          </>
                      )}


                      <th scope="col" className="px-6 bg-black py-3">CUSTOMER</th>
                      <th scope="col" className="px-6 bg-black py-3">ORDER TO COLLECT</th>
                      <th scope="col" className="px-6 bg-black py-3">TIMESTAMP</th>
                      <th scope="col" className="px-6 bg-black py-3">PRODUCTS</th>
                      <th scope="col" className="px-6 bg-black py-3">
                        {order?.payAtCollect === 1 ? "Reserve Order Fee" : "TOTAL"}
                      </th>
                      {order?.payAtCollect === 1 && (
                          <>
                            <th scope="col" className="px-6 bg-black py-3">
                              Pay At Collection
                            </th>
                          </>
                      )}
                      {order?.payAtCollect === 1 && (
                          <>
                            <th scope="col" className="px-6 bg-black py-3">
                              Total
                            </th>
                          </>
                      )}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order._id.substring(0, 10)}...
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {getStatusText(order?.status)}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {getDeliveryStatus(order?.delivery)}
                      </td>


                      {order?.delivery === 1 && (
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {order?.postcode}
                          </td>
                      )}


                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order?.customer}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {getPayAtCollectStatus(order?.payAtCollect)}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order?.products.map((product, index) => (
                            <span key={index}>
                                            {product.title} * {product.foodQuantity}<br/>
                                        </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${order?.total}
                      </td>
                      {order?.payAtCollect === 1 && (
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${order?.basketValueTotal - 1}
                          </td>
                      )}
                      {order?.payAtCollect === 1 && (
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${order?.basketValueTotal}
                          </td>
                      )}
                    </tr>
                    </tbody>
                  </table>
                </div>
                {/*<div className="flex justify-between w-full p-10 bg-primary mt-6">*/}
                {/*  <div className={`relative flex flex-col ${statusClass(0)}`}>*/}
                {/*    <Image*/}
                {/*      src="/images/paid.png"*/}
                {/*      alt=""*/}
                {/*      width={40}*/}
                {/*      height={40}*/}
                {/*      objectFit="contain"*/}
                {/*    />*/}
                {/*    <span>Payment</span>*/}
                {/*  </div>*/}
                {/*  <div className={`relative flex flex-col ${statusClass(1)}`}>*/}
                {/*    <Image*/}
                {/*      src="/images/bake.png"*/}
                {/*      alt=""*/}
                {/*      width={40}*/}
                {/*      height={40}*/}
                {/*      objectFit="contain"*/}
                {/*    />*/}
                {/*    <span>Preparing</span>*/}
                {/*  </div>*/}
                {/*  <div className={`relative flex flex-col ${statusClass(2)}`}>*/}
                {/*    <Image*/}
                {/*      src="/images/bike.png"*/}
                {/*      alt=""*/}
                {/*      width={40}*/}
                {/*      height={40}*/}
                {/*      objectFit="contain"*/}
                {/*    />*/}
                {/*    <span>On the way</span>*/}
                {/*  </div>*/}
                {/*  <div className={`relative flex flex-col ${statusClass(3)}`}>*/}
                {/*    <Image*/}
                {/*      src="/images/delivered.png"*/}
                {/*      alt=""*/}
                {/*      width={40}*/}
                {/*      height={40}*/}
                {/*      objectFit="contain"*/}
                {/*    />*/}
                {/*    <span>Delivered</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <br/>
                <button
                    className="btn-primary !bg-green-700 w-44 -ml-[510px] !pl-0 !pr-0"
                    onClick={() => router.push('/profile/' + user._id)}
                >
                  View Order History
                </button>
              </div>
            </div>
          </>
      ) : (
          <div className="overflow-x-auto">
            <br/><br/><br/><br/><br/><br/><br/>
            <div
                className="min-h-[calc(100vh_-_433px)] flex  justify-center items-center flex-col p-10  min-w-[1000px]">
              <div className=" flex items-center flex-1  w-full max-h-28">
                <table className="w-full text-sm text-left ml-8 rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 bg-black py-3">ID</th>
                    <th scope="col" className="px-6 bg-black py-3">STATUS</th>
                    <th scope="col" className="px-6 bg-black py-3">DELIVERY</th>

                    {order?.delivery === 1 && (
                        <>
                          <th scope="col" className="px-6 bg-black py-3">
                            Delivery Postcode
                          </th>
                        </>
                    )}


                    <th scope="col" className="px-6 bg-black py-3">CUSTOMER</th>
                    <th scope="col" className="px-6 bg-black py-3">ORDER TO COLLECT</th>
                    <th scope="col" className="px-6 bg-black py-3">TIMESTAMP</th>
                    <th scope="col" className="px-6 bg-black py-3">PRODUCTS</th>
                    <th scope="col" className="px-6 bg-black py-3">
                      {order?.payAtCollect === 1 ? "Reserve Order Fee" : "TOTAL"}
                    </th>
                    {order?.payAtCollect === 1 && (
                        <>
                          <th scope="col" className="px-6 bg-black py-3">
                            Pay At Collection
                          </th>
                        </>
                    )}
                    {order?.payAtCollect === 1 && (
                        <>
                          <th scope="col" className="px-6 bg-black py-3">
                            Total
                          </th>
                        </>
                    )}
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order._id.substring(0, 10)}...
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {getStatusText(order?.status)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {getDeliveryStatus(order?.delivery)}
                    </td>


                    {order?.delivery === 1 && (
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order?.postcode}
                        </td>
                    )}



                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order?.customer}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {getPayAtCollectStatus(order?.payAtCollect)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order?.products.map((product, index) => (
                          <span key={index}>
                                            {product.title} * {product.foodQuantity}<br/>
                                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      ${order?.total}
                    </td>
                    {order?.payAtCollect === 1 && (
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          ${order?.basketValueTotal - 1}
                        </td>
                    )}
                    {order?.payAtCollect === 1 && (
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          ${order?.basketValueTotal}
                        </td>
                    )}
                  </tr>
                  </tbody>
                </table>
              </div>
              <br/>
              <button
                  className="btn-primary !bg-green-700 w-44 !pl-0 !pr-0"
                  onClick={() => router.push('/profile/' + user._id)}
              >
                View Order History
              </button>
            </div>
          </div>
      )
  );
};

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );
  const user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );
  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;
