import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { adminSchema } from "../../schema/admin";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {useMediaQuery} from "react-responsive";
import React, {useEffect, useState} from "react";

const Login = () => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        actions.resetForm();
        toast.success("Admin Login Success!");
        await push("/admin/profile");
      }
    } catch (err) {
      toast.error("Ops, something went wrong");
      console.log(err);
    }
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});

  const [isUnsupportedBrowser, setIsUnsupportedBrowser] = useState(false);

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isFirefox = userAgent.includes('firefox');
      const isTor = userAgent.includes('tor');
      const isChrome = userAgent.includes('chrome');


      // Unsupported: Desktop version of Firefox or Tor.
      //if (!isIPhone && (isFirefox || isTor || isChrome)) {
      if (!isIPhone && (isFirefox || isTor)) {
        setIsUnsupportedBrowser(true);
      }
    };

    detectBrowser();
  }, [isIPhone]);

  if (isUnsupportedBrowser) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-red-100 text-center p-4">
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <h1 className="text-xl font-bold">Incompatible Browser</h1>
            <p className="mt-2">
              Our website is currently not compatible with your browser. Please use a different browser such as Google Chrome, Safari, Opera, Microsoft Edge, Brave, or similar to access our site. We apologize for any inconvenience this may cause.
            </p>
          </div>
        </div>
    );
  }


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "name@company.com",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "••••••••",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
      isIPhone ? (
          <>
            <section className="h-full w-full items-center dark:border-gray-700 dark:bg-gray-900">
              <br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full h-full items-center rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 w-full h-full space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Admin Login
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
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
      ) : (
          <>
            <section className="bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Admin Login
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
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
      )
      // <div className="container mx-auto py-3 flex h-screen items-center">
    //   <form
    //     className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
    //     onSubmit={handleSubmit}
    //   >
    //     <Title addClass="text-[40px] mb-6">Admin Logina</Title>
    //     <div className="flex flex-col gap-y-3 w-full">
    //       {inputs.map((input) => (
    //         <Input
    //           key={input.id}
    //           {...input}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //       ))}
    //     </div>
    //     <div className="flex flex-col w-full gap-y-3 mt-6">
    //       <button className="btn-primary">LOGIN</button>
    //       <Link href="/">
    //         <span className="text-sm underline cursor-pointer text-secondary">
    //           Home Page
    //         </span>
    //       </Link>
    //     </div>
    //   </form>
    // </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
