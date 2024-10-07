import {useEffect, useState} from "react";
import Title from "../ui/Title";
import axios from "axios";
import {toast} from "react-toastify";
import {useMediaQuery} from "react-responsive";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["Preparing", "Ready for Pickup", "Out for Delivery", "Completed"];
  const delivery = ["No", "Delivery"];
  const payAtCollect = ["No", "Pay at collection"];

  const [hasExtra, setHasExtra] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleStatusNext = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {status: currentStatus + 1}
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusPrior = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {status: currentStatus - 1}
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await axios.delete(
            ` ${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
        );
        setOrders(orders.filter((order) => order._id !== id));
        if (res.data) {
          toast.success("Order deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});


  return (
      isIPhone ? (
          <>
            <br/><br/>
            <div className="relative -ml-16 overflow-x-auto shadow-md sm:rounded-lg">
              <div className="ml-8 font-bold text-1xl mt-10 text-gray-900">ORDERS</div>
              <div className="ml-8 mt-10 text-gray-900">
                <div>Please note:</div>
                <ul className="list-disc ml-5 mt-2">
                  <li><strong>Total:</strong> This represents the final amount a customer has paid, including any delivery charges, or the amount a customer will need to pay at the restaurant when collecting the order.
                  </li>
                  <li><strong>Basket Value Total:</strong> Represents the total value of the items in a customer’s basket at the time of checkout.
                  </li>
                </ul>
              </div>
              <div className="overflow-x-auto w-full mt-5 max-h-screen overflow-y-auto">
                <table className="text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                  <thead className="text-xs text-white uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 bg-black py-3">
                      PRODUCT ID
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      ACTION
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
                                  <div className="flex gap-3">
                                    <button
                                        className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
                                        onClick={() => handleStatusPrior(order?._id)}
                                        disabled={order?.status < 1}
                                    >
                                      Prior Stage
                                    </button>
                                    {/*<button*/}
                                    {/*    className="btn-primary !bg-yellow-600 w-28 !pl-0 !pr-0"*/}
                                    {/*    onClick={() => handleDelete(order?._id)}*/}
                                    {/*>*/}
                                    {/*  Delete Order*/}
                                    {/*</button>*/}
                                    <button
                                        className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
                                        onClick={() => handleStatusNext(order?._id)}
                                        disabled={order?.status > 2}
                                    >
                                      Next Stage
                                    </button>
                                  </div>
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
          <div className="relative shadow-md sm:rounded-lg">
            <div className="ml-4 font-bold text-xl mt-10 text-gray-900">ORDERS</div>
            <div className="ml-8 mt-10 text-gray-900">
              <div>Please note:</div>
              <ul className="list-disc ml-5 mt-2">
                <li><strong>Total:</strong> This represents the final amount a customer has paid, including any delivery
                  charges, or the amount a customer will need to pay at the restaurant when collecting the order.
                </li>
                <li><strong>Basket Value Total:</strong> Represents the total value of the items in a customer’s basket
                  at the time of checkout.
                </li>
              </ul>
            </div>
            <div className="w-full mt-5 max-h-screen overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="text-xs text-white uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 bg-black py-3">
                    PRODUCT ID
                  </th>
                  <th scope="col" className="px-6 bg-black py-3">
                    ACTION
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
                                <div className="flex gap-3">
                                  <button
                                      className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
                                      onClick={() => handleStatusPrior(order?._id)}
                                      disabled={order?.status < 1}
                                  >
                                    Prior Stage
                                  </button>
                                  {/*<button*/}
                                  {/*    className="btn-primary !bg-yellow-600 w-28 !pl-0 !pr-0"*/}
                                  {/*    onClick={() => handleDelete(order?._id)}*/}
                                  {/*>*/}
                                  {/*  Delete Order*/}
                                  {/*</button>*/}
                                  <button
                                      className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
                                      onClick={() => handleStatusNext(order?._id)}
                                      disabled={order?.status > 2}
                                  >
                                    Next Stage
                                  </button>
                                </div>
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
      )
  );
};

export default Order;

// <div className="lg:p-8 flex-1 lg:mt-0 mt-5  text-white lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
//   <div className=" font-bold text-1xl text-white">ORDERS</div>
//   <div className="overflow-x-auto w-full text-white mt-5">
//     <table className="w-full text-sm text-center text-gray-500">
//       <thead className="text-xs bg-black text-white uppercase">
//       <tr>
//         <th scope="col" className="py-3 px-6">
//           PRODUCT ID
//         </th>
//         <th scope="col" className="py-3 px-6">
//           CUSTOMER
//         </th>
//         <th scope="col" className="py-3 px-6">
//           Products
//         </th>
//         {/*<th scope="col" className="py-3">*/}
//         {/*  EXTRAS*/}
//         {/*</th>*/}
//         <th scope="col" className="py-3 px-6">
//           TOTAL
//         </th>
//         {/*<th scope="col" className="py-3 px-6">*/}
//         {/*  PAYMENT*/}
//         {/*</th>*/}
//         {/*<th scope="col" className="py-3 px-6">*/}
//         {/*  STATUS*/}
//         {/*</th>*/}
//         {/*<th scope="col" className="py-3 px-6">*/}
//         {/*  ACTION*/}
//         {/*</th>*/}
//       </tr>
//       </thead>
//       <tbody>
//       {orders.length > 0 &&
//           orders
//               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//               .map((order) => (
//                   <tr
//                       className="transition-all text-white bg-secondary border-gray-700 hover:bg-primary "
//                       key={order._id}
//                   >
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
//                       {order?._id.substring(0, 7)}
//                     </td>
//                     <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                       {order?.customer}
//                     </td>
//                     <td className="py-4 px-6 font-medium  hover:text-white flex-wrap w-[100px] whitespace-nowrap">
//                       {order?.products.map((product, index) => (
//                           <span key={index}>
//                           {product.title} * {product.foodQuantity} <br/>
//                         </span>
//                       ))}
//                     </td>
//                     {/*<td className="py-4 font-medium hover:text-white">*/}
//                     {/*  {order?.products.map((item) => {*/}
//                     {/*    return (*/}
//                     {/*        <div key={item._id}>*/}
//                     {/*          {item.extras &&*/}
//                     {/*              item.extras.length > 0 &&*/}
//                     {/*              item.extras.map((extra) => (*/}
//                     {/*                  <span key={extra._id}>{extra.text}, </span>*/}
//                     {/*              ))}*/}
//                     {/*        </div>*/}
//                     {/*    );*/}
//                     {/*  })}*/}
//                     {/*</td>*/}
//                     <td className="py-4 px-6 font-medium whitespace-nowrap text-green-500 hover:text-white">
//                       ${order?.total}
//                     </td>
//
//                     {/*<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">*/}
//                     {/*  {order?.method === 0 ? "Cash" : "Card"}*/}
//                     {/*</td>*/}
//                     {/*<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">*/}
//                     {/*  {status[order?.status]}*/}
//                     {/*</td>*/}
//                     {/*<td className="py-4 px-1 font-small whitespace-nowrap hover:text-white flex gap-3">*/}
//                     {/*  <button*/}
//                     {/*      className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"*/}
//                     {/*      onClick={() => handleStatusPrior(order?._id)}*/}
//                     {/*      disabled={order?.status < 1}*/}
//                     {/*  >*/}
//                     {/*    Prior Stage*/}
//                     {/*  </button>*/}
//                     {/*  <button*/}
//                     {/*      className="btn-primary !bg-yellow-600 w-28 !pl-0 !pr-0"*/}
//                     {/*      onClick={() => handleDelete(order?._id)}*/}
//                     {/*  >*/}
//                     {/*    Delete Order*/}
//                     {/*  </button>*/}
//                     {/*  <button*/}
//                     {/*      className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"*/}
//                     {/*      onClick={() => handleStatusNext(order?._id)}*/}
//                     {/*      disabled={order?.status > 1}*/}
//                     {/*  >*/}
//                     {/*    Next Stage*/}
//                     {/*  </button>*/}
//                     {/*</td>*/}
//                   </tr>
//               ))}
//       </tbody>
//     </table>
//   </div>
// </div>