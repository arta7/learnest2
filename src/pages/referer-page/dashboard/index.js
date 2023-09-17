import { Button, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUserProfileContext } from "../../../core/contexts/profile/profileProvider";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { refferer_apiCalls } from "../../../core/services/agent";
import RefererInvitaionItem from "./components/invitationItem.component";
import PageHeader from "./components/refererPageHeader.component";
//////////////////////
/*
reffererInfo:{
  income: "200000",
  totalInvitations: 15,
  discountPercent: 0.3,
  incomePercent: 0.5,
  refferalCode: "c525654",
  transactions: [
    {
      id: 0,
      fullName: "امیرمحمد حیدری",
      incomeFromThisBuy: "20000",
      price: "1000000",
      date: "1401/01/01",
    }
  ]
}

withdrawalInfo:{
  totalincome: 1200000,
  totalWithdrawal: 500000,
  remainedMoney: 700000,
  lastRequests: [
    {
      id: 0,
      amount: 10000,
      status: 0,
      requestDate: "1401/02/15",
      rejectReason: null,
      transactionDate: null,
    },
  ]
}

*/
const initialData = {
  totalIncome: "200000",
  totalInvitations: 15,
  discountPercent: 0.3,
  incomePercent: 0.5,
  refferalCode: "c525654",
  transactions: [
    {
      id: 0,
      refferId: 0,
      studentId: 0,
      studentName: "amir",
      studentPhone: "حیدری",
      courseId: 0,
      courseTitle: "starter",
      factorAmount: "10000",
      discountAmountApplied: "10",
      discountPercentApplied: 0,
      refferIncome: 0,
      refferIncomePercent: 0,
      createdAt: "1400/01/02",
    },
  ],
};
const RefererDashboard = () => {
  /////////
  const { profileData } = useUserProfileContext();
  /////////
  const [refererInfo, setRefererInfo] = useState();
  const [dataIsFetching, setDataIsFetching] = useState(false);
  const getRefererInfo = () => {
    apiCaller({
      api: refferer_apiCalls.apiCall_getReffererDashboard,
      apiArguments: profileData?.refferalCode ?? 0,
      toastMessage: true,
      onStart: () => setDataIsFetching(true),
      onEnd: () => setDataIsFetching(false),
      onErrorMessage: "دریافت اطلاعات معرف با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 1) {
          setRefererInfo(resp.data.data);
          console.log(resp.data.data);
        }
      },
    });
  };
  useEffect(() => {
    if (profileData?.refferalCode) {
      getRefererInfo();
    }
  }, []);
  /////////
  return (
    <div className="w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <PageHeader dataIsFetching={dataIsFetching} refererInfo={refererInfo} />
      <br />
      <br />
      {/* Invitations List */}
      <h1 className="fs-5">افراد دعوت شده توسط شما :</h1>
      <div
        style={{
          maxHeight: "50vh",
        }}
        className="pb-6 hidden-scrollbar d-flex flex-column justify-content-start align-items-stretch"
      >
        {!dataIsFetching &&
          refererInfo?.transactions.map((item) => (
            <RefererInvitaionItem key={item.id} {...item} />
          ))}
        {dataIsFetching &&
          [1, 2, 3, 4].map((it) => (
            <div
              style={{
                backgroundColor: "#f5ac91b3",
              }}
              className="mt-3 p-3 box-rounded-1 shadow d-flex flex-column justify-content-start align-items-stretch"
            >
              <div className="d-flex flex-row justify-content-between align-items-baseline">
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={80} height={30} />
              </div>
              <div className="mt-3">
                <Skeleton variant="text" width={200} height={30} />
              </div>
              <div className="mt-2">
                <Skeleton variant="text" width={200} height={30} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RefererDashboard;
