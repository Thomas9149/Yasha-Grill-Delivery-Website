import React from "react";

const Input = (props) => {
    const {type, errorMessage, touched, placeholder, label, ...inputProps} =
        props;

    return (
        <div>
            <div className="w-full">
                {label && <label className="block text-sm font-medium">{label}</label>}
                <label className="relative block cursor-text w-full">
                    <input
                        type={type}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
              ${type !== "datetime-local" && "pt-2"}
              ${touched && errorMessage ? "border-red-500" : "border-primary"}
              `}
                        required
                        placeholder={placeholder} // Set the placeholder attribute
                        {...inputProps}
                    />
                </label>
                {touched && <span className="text-xs text-danger">{errorMessage}</span>}
            </div>
        </div>
    );
};

export default Input;
//
// <div>
//     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//     <input type="email" name="email" id="email"
//            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//            placeholder="name@company.com" required=""/>
// </div>
// <div>
//     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//     <input type="password" name="password" id="password" placeholder="••••••••"
//            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//            required=""/>
// </div>
