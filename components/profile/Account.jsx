import React, {useEffect, useState} from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";
import {useMediaQuery} from "react-responsive";

const Account = ({ user }) => {
  const onSubmit = async (values, actions) => {
    if (JSON.stringify(values) === JSON.stringify(initialValues)) {
      toast.warn("No changes detected.");
      return;
    }

    try {
      const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
          values
      );
      if (res.status === 200) {
        toast.success("Profile Updated Successfully");
        await refreshPage();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      fullName: user?.fullName, // 1
      phoneNumber: user?.phoneNumber, //2
      email: user?.email, //3
      postcode: user?.postcode, // 4
      address: user?.address // 5
    });
  }, [user]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
      useFormik({
        enableReinitialize: true,
        initialValues: {
          fullName: user?.fullName, // 1
          phoneNumber: user?.phoneNumber, //2
          email: user?.email, //3
          postcode: user?.postcode, // 4
          address: user?.address // 5
        },
        onSubmit,
        validationSchema: profileSchema,
      });
  const inputs = [
    // {
    //   id: 1,
    //   name: "fullName",
    //   type: "text",
    //   placeholder: "Your Full Name",
    //   value: values.fullName,
    //   errorMessage: errors.fullName,
    //   touched: touched.fullName,
    // },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "postcode",
      type: "text",
      placeholder: "Postal code",
      value: values.postcode,
      errorMessage: errors.postcode,
      touched: touched.postcode,
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Address",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    // {
    //   id: 5,
    //   name: "job",
    //   type: "text",
    //   placeholder: "Your Job",
    //   value: values.job,
    //   errorMessage: errors.job,
    //   touched: touched.job,
    // },
    // {
    //   id: 6,
    //   name: "bio",
    //   type: "text",
    //   placeholder: "Your Bio",
    //   value: values.bio,
    //   errorMessage: errors.bio,
    //   touched: touched.bio,
    // },
  ];
  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});

  function sleep(seconds){
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
  }
  async function refreshPage(){
    await sleep(3);
    window.location.reload(false);
  }

  return (
      isIPhone ? (
          <>
            <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
              <Title addClass="text-[40px] font-bold">Account Settings</Title>
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
            <div className="mt-60">
              <br/>
              <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                <Title addClass="text-[40px] font-bold">Account Settings</Title>
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
            </div>
          </>
      )
  );
};

export default Account;