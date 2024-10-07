"use client";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/login";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };

    try {
      const res = await signIn("credentials", options);

      if (res.ok) {
        toast.success("Login successful", {
          position: "bottom-left",
          theme: "colored",
        });
        actions.resetForm();

        // Explicit redirection after successful login
        if (session) {
          const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const user = userRes.data?.find((user) => user.email === email);
          if (user) {
            await push("/profile/" + user._id);
          }
        }
      } else {
        toast.error("Login failure", {
          position: "bottom-left",
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Ops, something went wrong", {
        position: "bottom-left",
        theme: "colored",
      });
    }
  };

  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    if (session && !currentUser) {
      const getUser = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const user = res.data?.find((user) => user.email === session.user.email);
          if (user) {
            setCurrentUser(user);
            await push("/profile/" + user._id);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
  }, [session, push, currentUser]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
      useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit,
        validationSchema: loginSchema,
      });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "name@company.com",
      // errorMessage: errors.email,
      // touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "••••••••",
      value: values.password,
      // errorMessage: errors.password,
      // touched: touched.password,
    },
  ];

  const GeneralLoginHelpDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-6">
          <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full p-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <span>Trouble Logging In?</span>
            <svg
                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
              <div className="p-4 mt-2 text-sm font-light text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                If you're experiencing issues with our website, such as problems with logging in or certain features not working, it could be due to browser settings or extensions. Common issues include ad blockers or privacy settings that prevent cookies or other essential data from being saved. Please check your browser's privacy settings and temporarily disable any ad blockers or cookie blockers.
              </div>
          )}
        </div>
    );
  };


  const LoginHelpDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-6">
          <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full p-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <span>Having trouble logging in on iOS?</span>
            <svg
                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
              <div className="p-4 mt-2 text-sm font-light text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                If you experience issues logging in on iOS, please go to your device's system settings. Under
                "Safari," select "Privacy & Security," and temporarily disable the "Block All Cookies" option, as some
                features or login sessions may rely on cookies. Once you have finished using the website, we recommend re-enabling this setting to maintain your privacy protection.
              </div>
          )}
        </div>
    );
  };

  return (
        isIPhone ? (
            <section className="bg-gray-50 dark:bg-gray-900">
              <br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-y-3 w-full">
                        {inputs.map((input) => (
                            <Input
                                key={input.id}
                                placeholder={inputs}
                                {...input}
                                onChange={handleChange}
                            />
                        ))}
                        {/*<Input></Input>*/}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                   required=""/>
                          </div>
                          <div className="ml-3 text-sm rounded-lg">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                        </div>
                        {/*<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot*/}
                        {/*  password?</a>*/}
                      </div>
                      <button type="submit"
                              className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                        in
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/auth/register"
                                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                        up</a>
                      </p>
                      <LoginHelpDropdown></LoginHelpDropdown>
                    </form>
                  </div>
                </div>
              </div>
            </section>
        ) : (
            <>
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div
                      className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-3 w-full">
                      {inputs.map((input) => (
                          <Input
                              key={input.id}
                              placeholder={inputs}
                              {...input}
                              onChange={handleChange}
                          />
                      ))}
                      {/*<Input></Input>*/}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox"
                                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                 required=""/>
                        </div>
                        <div className="ml-3 text-sm rounded-lg">
                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                      </div>
                      {/*<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot*/}
                      {/*  password?</a>*/}
                    </div>
                    <button type="submit"
                            className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                      in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/auth/register"
                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                      up</a>
                    </p>
                    <GeneralLoginHelpDropdown></GeneralLoginHelpDropdown>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
        )
  );
};

export async function getServerSideProps({req}) {
  const session = await getSession({req});

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
