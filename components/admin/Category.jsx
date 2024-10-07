import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { toast } from "react-toastify";
import axios from "axios";
import {useMediaQuery} from "react-responsive";

const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([""]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  async function refreshPage() {
    await sleep(3); // Pause for 3 seconds
    window.location.reload(false); // Reload the page without using the cache
  }

  const handleCreate = async () => {
    if (!inputText.trim()) {
      toast.warning("Please input a category", {
        position: "bottom-left",
      });
      return;
    }

    try {
      const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            title: inputText,
          }
      );
      setCategories([...categories, res?.data]);
      setInputText("");
      toast.success("Category Created", {
        position: "bottom-left",
      });
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure you want to delete this category?")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(categories.filter((cat) => cat._id !== id));
        toast.warning("Category Deleted", {
          position: "bottom-left",
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});


  return (
      isIPhone ? (
          <>
            <div className="lg:p-8 -ml-16 flex-1 lg:mt-0 mt-5">
              <div className="ml-8 font-bold text-1xl mt-10 text-gray-900">CATEGORY</div>
              <div className="mt-5">
                <div className="flex text-white gap-4 ml-8 flex-1 items-center">
                  <Input
                      placeholder="Add a new Category..."
                      onChange={(e) => setInputText(e.target.value)}
                      value={inputText}
                  />
                  <button className="btn-primary bg-white" onClick={handleCreate}>
                    Add
                  </button>
                </div>
                <div className="mt-10  max-h-[40rem] overflow-auto p-4 flex flex-col justify-center ">
                  {categories.map((category) => (
                      <div
                          className="flex justify-between bg-white mt-4 border p-3 items-center border-r-4 border-b-8 border-primary rounded-lg hover:border-secondary transition-all"
                          key={category._id}
                      >
                        <b className="sm:text-xl text-md">{category.title}</b>
                        <button
                            className="btn-primary !bg-danger text-sm sm:text-base"
                            onClick={(e) => handleDelete(e, category._id)}
                        >
                          Delete
                        </button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </>
      ) : (
          <>
            <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
              <div className="ml-8 font-bold text-1xl mt-10 text-gray-900">CATEGORY</div>
              <div className="mt-5">
                <div className="flex text-white gap-4 ml-8 flex-1 items-center">
                  <Input
                      placeholder="Add a new Category..."
                      onChange={(e) => setInputText(e.target.value)}
                      value={inputText}
                  />
                  <button className="btn-primary bg-white" onClick={handleCreate}>
                    Add
                  </button>
                </div>
                <div className="mt-10  max-h-[40rem] overflow-auto p-4 flex flex-col justify-center ">
                  {categories.map((category) => (
                      <div
                          className="flex justify-between bg-white mt-4 border p-3 items-center border-r-4 border-b-8 border-primary rounded-lg hover:border-secondary transition-all"
                          key={category._id}
                      >
                        <b className="sm:text-xl text-md">{category.title}</b>
                        <button
                            className="btn-primary !bg-danger text-sm sm:text-base"
                            onClick={(e) => handleDelete(e, category._id)}
                        >
                          Delete
                        </button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </>
      )
  );
};

export default Category;
