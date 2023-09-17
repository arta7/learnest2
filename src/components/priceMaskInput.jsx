import React, { useState, useEffect } from "react";
import { formatNumber } from "../core/utils/utils";

export const PriceMaskInput = ({ handleChange, value, ...rest }) => {
  const [inputVal, set_inputVal] = useState("");

  useEffect(() => {
    set_inputVal(formatNumber(value));
  }, [value]);

  const handleChange_inputVal = (e) => {
    const val = e.target.value;

    if (val.toString().includes(",")) {
      const val2 = val.split("").filter((item) => item !== ",");
      let str = "";
      val2.forEach((item) => {
        str += item;
      });
      handleChange(str);
      set_inputVal(formatNumber(str));
    } else {
      handleChange(val);
      set_inputVal(formatNumber(val));
    }
  };

  return <input value={inputVal} onChange={handleChange_inputVal} {...rest} />;
};
