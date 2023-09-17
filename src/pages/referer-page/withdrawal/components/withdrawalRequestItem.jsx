import React, { useState, useEffect } from "react";
import { formatNumber } from "../../../../core/utils/formatPrice";
import { convertFullDateAndTime } from "../../../../core/utils/utils";
///
const WithdrawalRequestItem = ({
  id,
  refferId,
  amount,
  status,
  description,
  adminComment,
  requestDate,
  transactionDate,
  createdAt,
}) => {
  //
  const getCardBg = () => {
    if (status === 0) return "#fff";
    if (status === 1) return "#effff7";
    if (status === 2) return "#ffe9eb";
  };
  const getStatusText = () => {
    if (status === 0) return "وضعیت : در انتظار تایید";
    if (status === 1) return "وضعیت : موفقیت آمیز";
    if (status === 2) return "وضعیت : ناموفق";
  };
  const getStatusColor = () => {
    if (status === 0) return "#444";
    if (status === 1) return "#198754";
    if (status === 2) return "#dc3545";
  };
  //
  return (
    <div
      style={{
        border: "2px solid " + getStatusColor(),
        borderRadius: "0.75rem",
        backgroundColor: getCardBg(),
      }}
      className={
        " mt-3 p-3 shadow d-flex flex-column justify-content-between align-items-stretch gap-3"
      }
    >
      <h4
        className="fs-5 fw-bold"
        style={{
          color: getStatusColor(),
          textAlign: "center",
        }}
      >
        {getStatusText()}
      </h4>
      {/*  */}
      <div className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="">مبلغ درخواستی : </span>

        <span className="">
          <strong
            style={{
              color: getStatusColor(),
            }}
            className="fs-5"
          >
            {formatNumber(amount)}{" "}
          </strong>
          تومان
        </span>
      </div>
      {/*  */}
      <div className="d-flex flex-column justify-content-start align-items-stretch">
        <div className="d-flex flex-row justify-content-between align-items-baseline">
          <span>تاریخ درخواست :</span>
          <span dir="ltr">
            {convertFullDateAndTime(createdAt, {
              minute: true,
              second: false,
            })?.replace("،", " ، ")}{" "}
          </span>
        </div>
        {status === 1 && (
          <div className="mt-3 d-flex flex-row justify-content-between align-items-baseline">
            <span>تاریخ واریز :</span>
            <span dir="ltr">
              {convertFullDateAndTime(transactionDate, {
                minute: true,
                second: false,
              })?.replace("،", " ، ")}
            </span>
          </div>
        )}
        {adminComment && (
          <div className="mt-3 d-flex flex-row justify-content-start align-items-baseline">
            {`توضیحات ادمین  : ${adminComment}`}
          </div>
        )}
        {description && (
          <div className="mt-3 d-flex flex-row justify-content-start align-items-baseline">
            {`توضیحات برداشت  : ${description}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequestItem;
