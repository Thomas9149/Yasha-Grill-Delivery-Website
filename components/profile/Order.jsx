import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {useMediaQuery} from "react-responsive";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const status = ["Preparing", "Ready for Pickup", "Out for Delivery", "Completed"];
  const delivery = ["No", "Delivery"];
  const payAtCollect = ["No", "Pay at collection"];

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(
          res.data.filter((order) => order.customer === currentUser?.fullName)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data.filter((user) => user.email === session.user.email)[0]
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [session]);

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

  const getPayAtCollect = (collect) => {
    switch(collect) {
      case 0:
        return "No";
      case 1:
        return "Pay At Collection";
      default:
        return "Unknown";
    }
  };


  return (
    isIPhone ? (
        <>
          <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
            <Title addClass="text-[40px] font-bold">Order History</Title>
            <div className="ml-8 mt-10 text-gray-900">
              <div>Please note:</div>
              <ul className="list-disc ml-5 mt-2">
                <li><strong>Total:</strong> This represents the final amount you have paid, including any delivery
                  charges, or the amount you will need to pay at the restaurant when collecting your order.
                </li>
                <li><strong>Basket Value Total:</strong> Represents the total value of the items in your basket at the
                  time of checkout.
                </li>
              </ul>
            </div>
            <div className="overflow-x-auto w-full mt-5 max-h-screen overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="text-xs text-white uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 bg-black py-3">
                    PRODUCT ID
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    STATUS
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    DELIVERY
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    ORDER TO COLLECT
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    BASKET VALUE TOTAL
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    CUSTOMER
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    TIMESTAMP
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    ADDRESS
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    POSTCODE
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    PRODUCTS
                  </th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 &&
                    orders
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((order) => (
                            <tr
                                className=""
                                key={order._id}
                            >
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?._id.substring(0, 11)}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {status[order?.status]}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {delivery[order?.delivery]}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {payAtCollect[order?.payAtCollect]}
                              </td>
                              <td className="px-6 py-4 font-medium text-green-500 whitespace-nowrap">
                                {/* Conditionally render the total value */}
                                {order?.payAtCollect === 1 ? `$${order?.basketValueTotal - 1}` : `$${order?.total}`}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {`$${order?.basketValueTotal}`}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.customer}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.address}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.postcode}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap flex-wrap w-[100px]">
                                {order?.products.map((product, index) => (
                                    <span key={index}>
                      {product.title} * {product.foodQuantity} <br/>
                    </span>
                                ))}
                              </td>
                            </tr>
                        ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
    ) : (
        <>
          <div className="relative shadow-md sm:rounded-lg p-8">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="font-bold text-xl mt-10 text-gray-900">ORDERS</div>
            <div className="mt-10 text-gray-900">
              <div>Please note:</div>
              <ul className="list-disc ml-5 mt-2">
                <li><strong>Total:</strong> This represents the final amount you have paid, including any delivery
                  charges, or the amount you will need to pay at the restaurant when collecting your order.
                </li>
                <li><strong>Basket Value Total:</strong> Represents the total value of the items in your basket at the
                  time of checkout.
                </li>
              </ul>
            </div>
            <div className="overflow-x-auto max-w-screen-lg mt-5 max-h-screen overflow-y-auto">
              <table className="max-w-screen-lg text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="text-xs text-white uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 bg-black py-3">
                    PRODUCT ID
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    STATUS
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    DELIVERY
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    ORDER TO COLLECT
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    BASKET VALUE TOTAL
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    CUSTOMER
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    TIMESTAMP
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    ADDRESS
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    POSTCODE
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    PRODUCTS
                  </th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 &&
                    orders
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((order) => (
                            <tr
                                className=""
                                key={order._id}
                            >
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?._id.substring(0, 11)}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {status[order?.status]}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {delivery[order?.delivery]}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {payAtCollect[order?.payAtCollect]}
                              </td>
                              <td className="px-6 py-4 font-medium text-green-500 whitespace-nowrap">
                                {/* Conditionally render the total value */}
                                {order?.payAtCollect === 1 ? `$${order?.basketValueTotal - 1}` : `$${order?.total}`}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {`$${order?.basketValueTotal}`}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.customer}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.address}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {order?.postcode}
                              </td>
                              <td className="px-6 py-4 font-medium text-black whitespace-nowrap flex-wrap w-[100px]">
                                {order?.products.map((product, index) => (
                                    <span key={index}>
                      {product.title} * {product.foodQuantity} <br/>
                    </span>
                                ))}
                              </td>
                            </tr>
                        ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
    )
  );
};

export default Order;
