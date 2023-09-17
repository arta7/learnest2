import React, { useState, useEffect } from "react";
import { formatNumber } from "../../../../core/utils/formatPrice";
import { convertFullDateAndTime } from "../../../../core/utils/utils";
//
const RefererInvitaionItem = ({
  id,
  refferId,
  studentId,
  studentName,
  studentPhone,
  courseId,
  courseTitle,
  factorAmount,
  discountAmountApplied,
  discountPercentApplied,
  refferIncome,
  refferIncomePercent,
  createdAt,
}) => {
  const getPhoneNumber = () => {
    const ph1 = studentPhone.slice(0, 4);
    const ph2 = studentPhone.slice(9);
    return ph2 + " ***** " + ph1;
  };
  return (
    <div
      style={{
        border: "1px solid #ccc",
      }}
      className="mt-3 p-3 box-rounded-1 shadow d-flex flex-column justify-content-start align-items-stretch"
    >
      <span className="fs-6 fw-bold">
        {` عنوان دوره : ${courseTitle ? courseTitle : ""} `}
      </span>
      <span className=" mt-3  fs-7">
        {` خریدار : ${studentName ? studentName : ""} `}
      </span>
      <span className=" mt-3  fs-7">
        {`  شماره همراه خریدار : ${studentPhone ? getPhoneNumber() : ""} `}
      </span>

      <div className="mt-2 align-self-start  fs-7">{`تاریخ خرید : ${
        createdAt
          ? convertFullDateAndTime(createdAt, {
              second: false,
              minute: true,
            })?.replace("،", " ، ")
          : ""
      } `}</div>
      <span className=" mt-3  fs-7">
        {`  تخفیف : ${
          discountPercentApplied ? discountPercentApplied : ""
        } درصد`}
      </span>
      <div className="mt-2 d-flex flex-row justify-content-between align-items-baseline">
        <div className="mt-2 fs-7">{`مبلغ خرید : ${
          factorAmount ? formatNumber(factorAmount) : ""
        } تومان`}</div>
        <div className="mt-2 fs-7">{`سود شما : ${
          refferIncome ? formatNumber(refferIncome) : ""
        } تومان`}</div>
      </div>
    </div>
  );
};

export default RefererInvitaionItem;
