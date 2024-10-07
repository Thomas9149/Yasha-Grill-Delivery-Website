import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/register";
import { newPasswordSchema } from "../../schema/newPassword";
import axios from "axios";
import {useMediaQuery} from "react-responsive";
import {toast} from "react-toastify";

const Password = ({ user }) => {
  // const onSubmit = async (values, actions) => {
  //   try {
  //     const res = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
  //       values
  //     );
  //     actions.resetForm();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
    function sleep(seconds){
        return new Promise(resolve => setTimeout(resolve, seconds*1000));
    }
    async function refreshPage(){
        await sleep(3);
        window.location.reload(false);
    }

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
                values
            );
            if (res.status === 200) {
                // console.log("success");
                toast.success("Password Updated Successfully");
                refreshPage();
            }
        } catch (err) {
            toast.error("Ops, something went wrong");
            // console.log(err);
        }
    };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "New Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];
    const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });
  return (
      isIPhone ? (
          <>
              <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                  <Title addClass="text-[40px] font-bold">Password</Title>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                      {inputs.map((input) => (
                          <Input
                              key={input.id}
                              {...input}
                              onBlur={handleBlur}
                              onChange={handleChange}
                          />
                      ))}
                  </div>
                  <button className="btn-primary mt-4" type="submit">
                      Update
                  </button>
              </form>
          </>
      ) : (
          <>
              <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  <Title addClass="text-[40px] font-bold">Password</Title>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                      {inputs.map((input) => (
                          <Input
                              key={input.id}
                              {...input}
                              onBlur={handleBlur}
                              onChange={handleChange}
                          />
                      ))}
                  </div>
                  <button className="btn-primary mt-4" type="submit">
                      Update
                  </button>
              </form>
          </>
      )
  );
};

export default Password;
