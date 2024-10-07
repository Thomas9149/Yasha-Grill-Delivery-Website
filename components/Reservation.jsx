import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";
import {useMediaQuery} from "react-responsive";
{
}

const Reservation = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };
  const isIPhone = useMediaQuery({query: "(max-width: 600px)"});


  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How Many Persons?",
      value: values.persons,
      errorMessage: errors.persons,
      touched: touched.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      value: values.date,
      errorMessage: errors.date,
      touched: touched.date,
    },
  ];

  return (
      isIPhone ? (
              <>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.2626606479707!2d-1.9288034481773253!3d52.43815655301203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bde84877aab3%3A0x815900570b8b2c27!2sYasha%20Grill%20Pizza%20%26%20Burgers!5e0!3m2!1sen!2suk!4v1717192869899!5m2!1sen!2suk"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[490px] w-full"
                ></iframe>
              </>
          ) :(
              <>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.2626606479707!2d-1.9288034481773253!3d52.43815655301203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bde84877aab3%3A0x815900570b8b2c27!2sYasha%20Grill%20Pizza%20%26%20Burgers!5e0!3m2!1sen!2suk!4v1717192869899!5m2!1sen!2suk"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[590px] w-full"
                ></iframe>
              </>
          )
  );
};

export default Reservation;

{/*<div className="container mx-auto py-12">*/
}
{/*<Title addClass="text-[40px] mb-10">Book A Table</Title>*/
}
{/*<div className="flex justify-between flex-wrap-reverse gap-10">*/
}
{/*<form className="lg:flex-1 w-full" onSubmit={handleSubmit}>*/
}
{/*  <div className="flex flex-col gap-y-3">*/
}
{/*    {inputs.map((input) => (*/
}
{/*      <Input*/
}
{/*        key={input.id}*/
}
{/*        {...input}*/
}
{/*        onChange={handleChange}*/
}
{/*        onBlur={handleBlur}*/
}
{/*      />*/
}
{/*    ))}*/
}
{/*  </div>*/
}
{/*  <button className="btn-primary mt-4" type="submit">*/}
{/*    BOOK NOW*/}
{/*  </button>*/}
{/*</form>*/}