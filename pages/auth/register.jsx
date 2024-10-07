import React from "react";
import axios from "axios";
import {useFormik} from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import {registerSchema} from "../../schema/register";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useMediaQuery} from "react-responsive";
import { useState } from 'react';


const Register = () => {
  const {push} = useRouter();
  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });
  // Check for Terms and Conditions
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onSubmit = async (values, actions) => {
    if (!isChecked) {
      toast.warn("You haven't accepted the Terms and Conditions and Privacy Policy.");
      return;  // Prevent form submission if the checkbox is not checked
    }
    try {
      const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
          values
      );
      if (res.status === 200) {
        toast.success("User created successfully");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
    actions.resetForm();
  };

  const {values, errors, touched, handleSubmit, handleChange, handleBlur} =
      useFormik({
        initialValues: {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        onSubmit,
        validationSchema: registerSchema,
      });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
      label: "",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "name@company.com",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
      label: "",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "••••••••",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
      label: "",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
      label: "",
    },
  ];

  return (
      isIPhone ? (
          <section className="bg-gray-50 dark:bg-gray-900">
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div
                  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ))}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" onChange={handleCheckboxChange} aria-describedby="terms" type="checkbox"
                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                               required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                          I have read and agree to the <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="/about/terms"
                            target="_blank">
                          Terms and Conditions
                        </a> and <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="/about/privacy-policy"
                            target="_blank">
                          Privacy Policy
                        </a>.
                        </label>
                      </div>
                    </div>
                    <button type="submit"
                            className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                      an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/auth/login"
                                                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                      here</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
      ) : (
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div
                  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ))}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" onChange={handleCheckboxChange} aria-describedby="terms" type="checkbox"
                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                               required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                          I have read and agree to the <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="/about/terms"
                            target="_blank">
                          Terms and Conditions
                        </a> and <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="/about/privacy-policy"
                            target="_blank">
                          Privacy Policy
                        </a>.
                        </label>
                      </div>
                    </div>
                    <button type="submit"
                            className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                      an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/auth/login"
                                                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                      here</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
      )
  );
};

export default Register;



