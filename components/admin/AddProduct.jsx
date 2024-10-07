import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useFormik } from "formik";
import { productSchema } from "../../schema/product";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import {useMediaQuery} from "react-responsive";

const AddProduct = ({ setIsProductModal }) => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);

  const getProducts = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        .then((res) => setCategories(res.data));

      // setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const getProductList = async () => {
  //   await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`).then((res) => setProductList(res.data))
  // };
  getProducts();
  // useEffect(() => {
  //   getProducts();
  // }, []);

  useEffect(() => {
    if (title.trim() && desc.trim() && category && price && imageSrc) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [title, desc, category, price, imageSrc]);

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        image: imageUrl,
        title: "Testing",
        desc: desc,
        category: category,
        price: "5",
        smallPrice: 6,
        mediumPrice: 7,
        largePrice: 8,
        extras: extraOptions,
      },
      onSubmit,
      validationSchema: productSchema,
    });

  const handleOnchange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (loadEvent) {
      setImageSrc(loadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleCreate = async () => {
    if (btnDisabled) return;
    setBtnDisabled(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-ordering");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dp5whpvw0/image/upload",
        formData
      );
      const { url } = uploadRes.data;
      setImageUrl(url);
      const newProduct = {
        img: url,
        title,
        desc,
        prices: price,
        category: category.toLowerCase(),
        extraOptions,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Product Created Successfully", {
          position: "top-right",
          closeOnClick: true,
        });
        getProducts();
        refreshPage();
      }
    } catch (error) {
      console.log(error);
    }
    setBtnDisabled(false);
  };

  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

  const refreshPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    window.location.reload(false);
  };

  // const changePrice = (e, index) => {
  //   const currentPrices = [...prices];
  //   currentPrices[index] = e.target.value;
  //   setPrice(currentPrices);
  // };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    isIPhone ? (
        <>
          <div
              className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
            <OutsideClickHandler
                onOutsideClick={() => {
                  if (confirm("Are you sure you want to exit?")) {
                    setIsProductModal(false);
                  }
                }}
            >
              <div className="w-full bg-white h-full grid place-content-center relative">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}
                    className="relative z-50 md:w-[600px] w-[370px] border-2 p-10 rounded-3xl"
                >
                  <Title addClass="text-[40px] text-center">Add a New Product</Title>

                  <div className="flex flex-row text-sm mt-8 gap-5 h-20">
                    <label className="flex gap-2 items-center">
                      <input
                          type="file"
                          className={`hidden ${
                              errors.image && touched.image && "border-red-500"
                          }`}
                          onChange={(e) => {
                            handleOnchange(e);
                            handleChange(e);
                          }}
                          name="image"
                      />
                      <button className="btn-primary  !bg-blue-600 pointer-events-none">
                        Choose an Image
                      </button>
                      {errors.image && touched.image && (
                          <span className="text-xs mt-1 text-danger">
                    {errors.image}
                  </span>
                      )}
                      {imageSrc && (
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="rounded-full border-2 border-primary"
                                src={imageSrc}
                                alt=""
                                width={90}
                                height={90}
                            />
                          </div>
                      )}
                    </label>
                  </div>

                  <div className="flex flex-col text-sm mt-4">
                    <span className="font-semibold mb-1">TITLE</span>
                    <input
                        type="text"
                        className={`border border-gray-400 h-8 p-3 text-sm outline-none rounded-md ${
                            errors.title && touched.title
                                ? "border-red-500"
                                : "border-gray-400"
                        }`}
                        placeholder="Write a Title"
                        name="title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                          handleChange(e);
                        }}
                        value={title}
                    />
                    {errors.title && touched.title && (
                        <span className="text-xs mt-1 text-danger">{errors.title}</span>
                    )}
                  </div>

                  <div className="flex flex-col text-sm mt-4">
                    <span className="font-semibold mb-1">DESCRIPTION</span>
                    <textarea
                        className={`border border-gray-400 h-16 p-3 text-sm outline-none rounded-md ${
                            errors.desc && touched.desc
                                ? "border-red-500"
                                : "border-gray-400"
                        }`}
                        placeholder="Write a Description"
                        onChange={(e) => {
                          setDesc(e.target.value);
                          handleChange(e);
                        }}
                        name="desc"
                        value={desc}
                    />
                    {errors.desc && touched.desc && (
                        <span className="text-xs mt-1 text-danger">{errors.desc}</span>
                    )}
                  </div>

                  <div className="flex flex-col text-sm mt-4">
                    <span className="font-semibold mb-1">SELECT CATEGORY</span>
                    <select
                        className={`border border-gray-400 p-2 text-sm outline-none rounded-md ${
                            errors.category && touched.category
                                ? "border-red-500"
                                : "border-gray-400"
                        }`}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          handleChange(e);
                        }}
                        name="category"
                        value={category}
                    >
                      <option value="">Select a Category</option>
                      {categories.length > 0 &&
                          categories.map((category) => (
                              <option
                                  key={category._id}
                                  value={category.title.toLowerCase()}
                              >
                                {category.title}
                              </option>
                          ))}
                    </select>
                    {errors.category && touched.category && (
                        <span className="text-xs mt-1 text-danger">
                  {errors.category}
                </span>
                    )}
                  </div>

                  <div className="flex flex-col text-sm mt-4">
                    <span className="font-semibold mb-1">PRICE (£)</span>
                    <input
                        type="number"
                        className={`border border-gray-400 p-1 text-sm outline-none md:w-28 ${
                            errors.price && touched.price
                                ? "border-red-500"
                                : "border-gray-400"
                        }`}
                        placeholder="£6"
                        name="price"
                        onChange={(e) => {
                          setPrice(e.target.value);
                          handleChange(e);
                        }}
                        value={price}
                    />
                    {errors.price && touched.price && (
                        <span className="text-xs mt-1 text-danger">{errors.price}</span>
                    )}
                  </div>

                  <br/><br/>
                  <button
                      className={`btn-primary text-black bg-freshIngredients right-8 bottom-6 absolute ${
                          btnDisabled && "cursor-not-allowed opacity-50"
                      }`}
                      type="submit"
                      disabled={btnDisabled}
                  >
                    Create
                  </button>

                  <button
                      className="absolute top-4 right-4"
                      onClick={() => {
                        if (confirm("Are you sure you want to exit?")) {
                          setIsProductModal(false);
                        }
                      }}
                  >
                    <GiCancel size={25} className="transition-all"/>
                  </button>
                </form>
              </div>
            </OutsideClickHandler>
          </div>
        </>
    ) : (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
          <OutsideClickHandler
              onOutsideClick={() => {
                if (confirm("Are you sure you want to exit?")) {
                  setIsProductModal(false);
                }
              }}
          >
            <div className="w-full bg-white h-full grid place-content-center relative">
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                  }}
                  className="relative z-50 md:w-[600px] w-[370px] border-2 p-10 rounded-3xl"
              >
                <Title addClass="text-[40px] text-center">Add a New Product</Title>

                <div className="flex flex-row text-sm mt-8 gap-5 h-20">
                  <label className="flex gap-2 items-center">
                    <input
                        type="file"
                        className={`hidden ${
                            errors.image && touched.image && "border-red-500"
                        }`}
                        onChange={(e) => {
                          handleOnchange(e);
                          handleChange(e);
                        }}
                        name="image"
                    />
                    <button className="btn-primary  !bg-blue-600 pointer-events-none">
                      Choose an Image
                    </button>
                    {errors.image && touched.image && (
                        <span className="text-xs mt-1 text-danger">
                    {errors.image}
                  </span>
                    )}
                    {imageSrc && (
                        <div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                              className="rounded-full border-2 border-primary"
                              src={imageSrc}
                              alt=""
                              width={90}
                              height={90}
                          />
                        </div>
                    )}
                  </label>
                </div>

                <div className="flex flex-col text-sm mt-4">
                  <span className="font-semibold mb-1">TITLE</span>
                  <input
                      type="text"
                      className={`border border-gray-400 h-8 p-3 text-sm outline-none rounded-md ${
                          errors.title && touched.title
                              ? "border-red-500"
                              : "border-gray-400"
                      }`}
                      placeholder="Write a Title"
                      name="title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                        handleChange(e);
                      }}
                      value={title}
                  />
                  {errors.title && touched.title && (
                      <span className="text-xs mt-1 text-danger">{errors.title}</span>
                  )}
                </div>

                <div className="flex flex-col text-sm mt-4">
                  <span className="font-semibold mb-1">DESCRIPTION</span>
                  <textarea
                      className={`border border-gray-400 h-16 p-3 text-sm outline-none rounded-md ${
                          errors.desc && touched.desc
                              ? "border-red-500"
                              : "border-gray-400"
                      }`}
                      placeholder="Write a Description"
                      onChange={(e) => {
                        setDesc(e.target.value);
                        handleChange(e);
                      }}
                      name="desc"
                      value={desc}
                  />
                  {errors.desc && touched.desc && (
                      <span className="text-xs mt-1 text-danger">{errors.desc}</span>
                  )}
                </div>

                <div className="flex flex-col text-sm mt-4">
                  <span className="font-semibold mb-1">SELECT CATEGORY</span>
                  <select
                      className={`border border-gray-400 p-2 text-sm outline-none rounded-md ${
                          errors.category && touched.category
                              ? "border-red-500"
                              : "border-gray-400"
                      }`}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        handleChange(e);
                      }}
                      name="category"
                      value={category}
                  >
                    <option value="">Select a Category</option>
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <option
                                key={category._id}
                                value={category.title.toLowerCase()}
                            >
                              {category.title}
                            </option>
                        ))}
                  </select>
                  {errors.category && touched.category && (
                      <span className="text-xs mt-1 text-danger">
                  {errors.category}
                </span>
                  )}
                </div>

                <div className="flex flex-col text-sm mt-4">
                  <span className="font-semibold mb-1">PRICE (£)</span>
                  <input
                      type="number"
                      className={`border border-gray-400 p-1 text-sm outline-none md:w-28 ${
                          errors.price && touched.price
                              ? "border-red-500"
                              : "border-gray-400"
                      }`}
                      placeholder="£6"
                      name="price"
                      onChange={(e) => {
                        setPrice(e.target.value);
                        handleChange(e);
                      }}
                      value={price}
                  />
                  {errors.price && touched.price && (
                      <span className="text-xs mt-1 text-danger">{errors.price}</span>
                  )}
                </div>

                <button
                    className={`btn-primary text-black bg-freshIngredients right-8 bottom-6 absolute ${
                        btnDisabled && "cursor-not-allowed opacity-50"
                    }`}
                    type="submit"
                    disabled={btnDisabled}
                >
                  Create
                </button>

                <button
                    className="absolute top-4 right-4"
                    onClick={() => {
                      if (confirm("Are you sure you want to exit?")) {
                        setIsProductModal(false);
                      }
                    }}
                >
                  <GiCancel size={25} className="transition-all"/>
                </button>
              </form>
            </div>
          </OutsideClickHandler>
        </div>
    )
  );
};

export default AddProduct;
