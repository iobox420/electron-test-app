import React from "react";
const Flag = ({ url }) => {
  if (url === "") {
    return null;
  }
  return <img src={url} alt={url} />;
};

export default Flag;
