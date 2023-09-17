import { Button, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useWindowDimensions } from "../../../../core/custom-hooks/getWindowDimensions";
import { formatNumber } from "../../../../core/utils/formatPrice";
///
const PageHeader = ({ dataIsFetching, refererInfo }) => {
  ///
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const getFontSize = () => {
    if (width >= 576) return "";
    if (width >= 450) return "fs-7";
    return "fs-8";
  };
  ///
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        boxShadow: "0 10px 15px #ebebeb",
        paddingBottom: "2rem",
      }}
      className="border pt-3 px-3 d-flex flex-column justify-content-start align-items-stretch"
    >
      <div className="mt-3 fs-6 d-flex flex-row justify-content-center align-items-center">
        {` درآمد کل : `}
        <strong className="fs-5 mx-1 fw-bold">
          {dataIsFetching ? (
            <Skeleton variant="text" height={50} width={70} />
          ) : (
            formatNumber(refererInfo?.totalIncome) ?? ""
          )}
        </strong>
        {` تومان `}
      </div>
      <div className="mt-3 d-flex flex-row justify-content-center align-items-center"></div>
      <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
        <span
          className={
            getFontSize() +
            " pe-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          <span>{`تعداد افراد دعوت شده توسط شما : `}</span>
          <strong className="mx-1 d-inline-block">
            {dataIsFetching ? (
              <Skeleton variant="text" height={35} width={20} />
            ) : (
              refererInfo?.totalInvitations ?? ""
            )}
          </strong>
          <span>{` نفر `}</span>
        </span>
        <span
          className={
            getFontSize() +
            " ps-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          <span>{`کد دعوت : `}</span>
          <code className="fw-bold d-inline-block">
            {dataIsFetching ? (
              <Skeleton variant="text" height={35} width={30} />
            ) : refererInfo?.refferalCode ? (
              refererInfo?.refferalCode
            ) : (
              ""
            )}
          </code>
        </span>
      </div>
      <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
        <span
          className={
            getFontSize() +
            " pe-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          {dataIsFetching ? (
            <>
              درصد سود شما از هر خرید :{" "}
              <Skeleton variant="text" width={20} height={35} />
            </>
          ) : (
            `درصد سود شما از هر خرید : %${refererInfo?.incomePercent ?? ""}`
          )}
        </span>
        <span
          className={
            getFontSize() +
            " ps-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          {dataIsFetching && (
            <>
              درصد تخفیف کد شما :{" "}
              <Skeleton variant="text" width={20} height={35} />
            </>
          )}
          {!dataIsFetching &&
            `درصد تخفیف کد شما : %${refererInfo?.discountPercent ?? ""} `}
        </span>
      </div>
      <div className="mt-4 d-flex flex-row justify-content-center align-items-center">
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{
            minWidth: "250px",
            fontSize: "1.2rem",
            borderRadius: "0.5rem",
          }}
          onClick={() => {
            navigate("/referer-withdrawal");
          }}
        >
          درخواست برداشت
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
