import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../../../core/custom-hooks/getWindowDimensions";
import { formatNumber } from "../../../../core/utils/formatPrice";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import useWithdrawalRequestDrawer from "./withdrawalRequestDrawer";
/////////////////////
const WithdrawalPageHeader = ({
  dataIsFetching,
  withdrawalInfo,
  getWithdrawalInfo,
}) => {
  ///
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const getFontSize = () => {
    if (width >= 576) return "";
    if (width >= 450) return "fs-7";
    return "fs-8";
  };
  ///
  const { render, isOpen, toggleDrawer } = useWithdrawalRequestDrawer({
    getWithdrawalInfo,
  });
  ///
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        boxShadow: "0 10px 15px #ebebeb",
        paddingBottom: "2rem",
      }}
      className="border p-3 py-4 d-flex flex-column justify-content-start align-items-stretch"
    >
      {/* Total Salary */}
      <div className=" text-center fs-6 d-flex flex-row justify-content-center align-items-center ">
        <span>درآمد کل : </span>
        <strong className="fs-5 mx-1 fw-bold">
          {dataIsFetching ? (
            <Skeleton variant="text" height={50} width={70} />
          ) : withdrawalInfo?.totalIncome ? (
            formatNumber(withdrawalInfo?.totalIncome)
          ) : (
            ""
          )}
        </strong>
        <span>تومان</span>
      </div>
      {/* Total Salary */}
      <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
        <span
          className={
            getFontSize() +
            " pe-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          <span>{`مجموع برداشت ها : `}</span>
          <strong className="mx-1 d-inline-block">
            {dataIsFetching ? (
              <Skeleton variant="text" height={35} width={20} />
            ) : (
              formatNumber(withdrawalInfo?.totalApprovedWithdraw) ?? ""
            )}
          </strong>
          <span>{` تومان `}</span>
        </span>
        <span
          className={
            getFontSize() +
            " ps-2 d-flex flex-row justify-content-between align-items-center"
          }
          style={{ textAlign: "center" }}
        >
          <span>{`قابل برداشت : `}</span>
          <span className="fw-bold d-inline-block mx-1">
            {dataIsFetching ? (
              <Skeleton variant="text" height={35} width={20} />
            ) : (
              formatNumber(
                withdrawalInfo?.totalIncome -
                  withdrawalInfo?.totalPendingWithdraw
              )
            )}
          </span>
          <span>{` تومان `}</span>
        </span>
      </div>
      <span
        className={
          getFontSize() +
          " mt-2 d-flex flex-row justify-content-center align-items-center"
        }
        style={{ textAlign: "center" }}
      >
        <span>{`مجموع مبلغ درخواستی در حال انتظار برای تایید : `}</span>
        <span className="fw-bold d-inline-block mx-1">
          {dataIsFetching ? (
            <Skeleton variant="text" height={35} width={20} />
          ) : (
            formatNumber(withdrawalInfo?.totalPendingWithdraw)
          )}
        </span>
        <span>{` تومان `}</span>
      </span>
      {/*  */}
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
          onClick={toggleDrawer}
          disabled={dataIsFetching}
        >
          ثبت درخواست برداشت
        </Button>
        {render()}
      </div>
    </div>
  );
};

export default WithdrawalPageHeader;
