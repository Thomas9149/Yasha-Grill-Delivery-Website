import React from "react";

const Title = ({ children, addClass }) => {
  return <div className={`${addClass}font-open-sans`}>{children}</div>;
};

export default Title;
