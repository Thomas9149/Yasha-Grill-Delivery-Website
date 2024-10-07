import {useEffect, useState} from "react";
import Title from "../ui/Title";
import Image from "next/image";
import AddProduct from "./AddProduct";
import axios from "axios";
import {toast} from "react-toastify";
import {useMediaQuery} from "react-responsive";

const Products = () => {
  const [isProductModal, setIsProductModal] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product deleted successfully");
          getProducts();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});


  return (
      isIPhone ? (
          <>
            <br/><br/>
            <div className="relative -ml-16 overflow-x-auto shadow-md sm:rounded-lg">
              <div className="ml-8 font-bold text-1xl mt-10 text-gray-900">PRODUCTS</div>
              {isProductModal && <AddProduct setIsProductModal={setIsProductModal}/>}
              <button
                  className="btn-primary ml-40 -mt-16 w-10 h-10 !p-0 text-3xl"
                  onClick={() => setIsProductModal(true)}
              >
                +
              </button>
              <div className="overflow-x-auto w-full mt-5 max-h-screen overflow-y-auto">
                <table className="text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                  <thead className="text-xs text-white uppercase">
                  <tr>
                    <th scope="col" className="px-6 bg-black py-3">
                      IMAGE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      TITLE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      PRICE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      ACTION
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {products &&
                      products.map((product) => (
                          <tr
                              key={product._id}
                          >
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white flex items-center gap-x-1">
                              <Image src={product.img} alt="" width={50} height={50}/>
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              {product._id.substring(0, 11)}...
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              {product.title}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              ${product.prices[0]}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </button>
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="ml-8 font-bold text-1xl mt-10 text-gray-900">PRODUCTS</div>
              {isProductModal && <AddProduct setIsProductModal={setIsProductModal}/>}
              <button
                  className="btn-primary ml-40 -mt-16 w-10 h-10 !p-0 text-3xl"
                  onClick={() => setIsProductModal(true)}
              >
                +
              </button>
              <div className="w-full mt-5 max-h-screen overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                  <thead className="text-xs text-white uppercase">
                  <tr>
                    <th scope="col" className="px-6 bg-black py-3">
                      IMAGE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      TITLE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      PRICE
                    </th>
                    <th scope="col" className="px-6 bg-black py-3">
                      ACTION
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {products &&
                      products.map((product) => (
                          <tr
                              key={product._id}
                          >
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white flex items-center gap-x-1">
                              <Image src={product.img} alt="" width={50} height={50}/>
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              {product._id.substring(0, 11)}...
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              {product.title}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                              ${product.prices[0]}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </button>
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

export default Products;


// <div
//     className="bg-freshIngredients lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
//   <div className="ml-5 font-bold text-1xl text-white">PRODUCTS</div>
//   {isProductModal && <AddProduct setIsProductModal={setIsProductModal}/>}
//   <button
//       className="btn-primary ml-32 -mt-10 w-12 h-12 !p-0  text-3xl"
//       onClick={() => setIsProductModal(true)}
//   >
//     +
//   </button>
//   <div className="overflow-x-auto w-full mt-5">
//     <table className="w-full ml-5 text-sm h-full bg-amber-500 text-center text-white">
//       <thead className="text-xs text-gray-400 bg-black uppercase">
//       <tr>
//         <th scope="col" className="py-3 px-6 text-white">
//           IMAGE
//         </th>
//         <th scope="col" className="py-3 px-6 text-white">
//           ID
//         </th>
//         <th scope="col" className="py-3 text-white">
//           TITLE
//         </th>
//         <th scope="col" className="py-3 px-6 text-white">
//           PRICE
//         </th>
//         <th scope="col" className="py-3 px-6 text-white">
//           ACTION
//         </th>
//       </tr>
//       </thead>
//       <tbody>
//       {products &&
//           products.map((product) => (
//               <tr
//                   className="transition-all bg-secondary border-gray-700 hover:bg-primary"
//                   key={product._id}
//               >
//                 <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
//                   <Image src={product.img} alt="" width={50} height={50}/>
//                 </td>
//                 <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                   {product._id.substring(0, 5)}...
//                 </td>
//                 <td className="py-4 font-medium whitespace-nowrap hover:text-white">
//                   {product.title}
//                 </td>
//                 <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                   ${product.prices[0]}
//                 </td>
//                 <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
//                   <button
//                       className="btn-primary !bg-danger"
//                       onClick={() => handleDelete(product._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//           ))}
//       </tbody>
//     </table>
//   </div>
//
// </div>
// <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//   // <div className="ml-8 font-bold text-1xl mt-10 text-gray-900 dark:text-white">PRODUCTS</div>
//   // {isProductModal && <AddProduct setIsProductModal={setIsProductModal}/>}
//   // <button
//       className="btn-primary ml-40 -mt-16 w-10 h-10 !p-0 text-3xl"
//       onClick={() => setIsProductModal(true)}
//   >
//     +
//   </button>
//   <div className="max-h-screen overflow-y-auto w-full mt-5">
//     <table className="w-full text-sm text-left ml-8 rtl:text-right text-gray-500 dark:text-gray-400">
//       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" className="px-6 bg-black py-3">
//           IMAGE
//         </th>
//         <th scope="col" className="px-6 bg-black py-3">
//           ID
//         </th>
//         <th scope="col" className="px-6 bg-black py-3">
//           TITLE
//         </th>
//         <th scope="col" className="px-6 bg-black py-3">
//           PRICE
//         </th>
//         <th scope="col" className="px-6 bg-black py-3">
//           ACTION
//         </th>
//       </tr>
//       </thead>
//       <tbody>
//       {products &&
//           products.map((product) => (
//               <tr
//                   className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//                   key={product._id}
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-x-1">
//                   <Image src={product.img} alt="" width={50} height={50}/>
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {product._id.substring(0, 11)}...
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {product.title}
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   ${product.prices[0]}
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       onClick={() => handleDelete(product._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//           ))}
//       </tbody>
//     </table>
//   </div>
// </div>






