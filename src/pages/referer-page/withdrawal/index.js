import { Button, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUserProfileContext } from "../../../core/contexts/profile/profileProvider";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { refferer_apiCalls } from "../../../core/services/agent";
import PageHeader from "./components/pageHeader";
import WithdrawalRequestItem from "./components/withdrawalRequestItem";
//////////////////////
const initialData = {
  totalIncome: 1200000,
  totalApprovedWithdraw: 500000,
  totalPendingWithdraw: 50000,
  requests: [
    {
      id: 0,
      refferId: 12,
      amount: 10000,
      status: 0,
      description: "asdasd",
      adminComment: "asdasd4545sd",
      requestDate: "1401/02/15",
      createdAt: "1401/02/15",
      transactionDate: null,
    },
  ],
};
const Withdrawal = () => {
  /////////
  const { profileData } = useUserProfileContext();
  /////////
  const [dataIsFetching, setDataIsFetching] = useState(true);
  const [withdrawalInfo, setwithdrawalInfo] = useState();
  const getWithdrawalInfo = ({ onSuccessCallback = () => {} }) => {
    apiCaller({
      api: refferer_apiCalls.apiCall_getWithdrawdashboard,
      apiArguments: profileData?.refferalCode ?? 0,
      toastMessage: true,
      onStart: () => setDataIsFetching(true),
      onEnd: () => setDataIsFetching(false),
      onErrorMessage: "دریافت اطلاعات با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 1) {
          setwithdrawalInfo(resp.data.data);
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        }
      },
    });
  };
  useEffect(() => {
    if (profileData?.refferalCode) {
      console.log(profileData?.refferalCode);
      getWithdrawalInfo({ onSuccessCallback: () => {} });
    }
  }, []);

  /////////
  return (
    <div className="w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <PageHeader
        dataIsFetching={dataIsFetching}
        withdrawalInfo={withdrawalInfo}
        getWithdrawalInfo={getWithdrawalInfo}
      />
      <br />
      <br />
      {/* Invitations List */}
      <h1 className="fs-5">درخواست های اخیر :</h1>
      <div
        style={{
          maxHeight: "50vh",
        }}
        className="pb-6 hidden-scrollbar d-flex flex-column justify-content-start align-items-stretch"
      >
        {!dataIsFetching &&
          withdrawalInfo?.requests?.length > 0 &&
          withdrawalInfo?.requests.map((item) => (
            <WithdrawalRequestItem key={item.id} {...item} />
          ))}
        {!dataIsFetching && withdrawalInfo?.requests?.length === 0 && (
          <p>رکوردی یافت نشد .</p>
        )}
        {dataIsFetching &&
          [1, 2, 3, 4].map((it) => (
            <div
              style={{
                border: "2px solid #444",
                borderRadius: "0.75rem",
              }}
              className=" mt-3 p-3 shadow d-flex flex-column justify-content-between align-items-stretch gap-3"
            >
              <Skeleton
                className="align-self-center"
                variant="text"
                width={100}
                height={40}
              />
              <div className="d-flex flex-row justify-content-between align-items-baseline">
                <Skeleton
                  className="align-self-center"
                  variant="text"
                  width={70}
                  height={30}
                />
                <Skeleton
                  className="align-self-center"
                  variant="text"
                  width={70}
                  height={30}
                />
              </div>{" "}
              <div className="d-flex flex-row justify-content-between align-items-baseline">
                <Skeleton
                  className="align-self-center"
                  variant="text"
                  width={70}
                  height={30}
                />
                <Skeleton
                  className="align-self-center"
                  variant="text"
                  width={70}
                  height={30}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Withdrawal;
