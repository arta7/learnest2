import { Button, Drawer } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PriceMaskInput } from "../../../../components/priceMaskInput";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { refferer_apiCalls } from "../../../../core/services/agent";
import { toEnglishDigit } from "../../../../core/utils/utils";
import PriceInputError from "./priceInputError";
///
const useWithdrawalRequestDrawer = ({ getWithdrawalInfo }) => {
  ///// loading
  const { handleOpen, handleClose } = useLoadingContext();
  ///// handle drawer
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((o) => !o);

  const [withDrawalAmount, setWithDrawalAmount] = useState();
  const [withDrawalAmountError, setWithDrawalAmountError] = useState("");
  const handleChange = (val) => {
    setWithDrawalAmount(val);
    if (withDrawalAmountError && val >= 10_000) {
      setWithDrawalAmountError("");
    }
  };
  const handleMoneyInputBlur = (e) => {
    if (withDrawalAmount && withDrawalAmount < 10_000) {
      setWithDrawalAmountError("حداقل مبلغ قابل برداشت 10,000 تومان میباشد .");
    }
  };
  const [description, setDescription] = useState();
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCaller({
      api: refferer_apiCalls.apiCall_requestwithdraw,
      apiArguments: { amount: withDrawalAmount, description: description },
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "ثبت درخواست با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 1) {
          toast.success("ثبت درخواست با موفقیت انجام شد .");
          getWithdrawalInfo({
            onSuccessCallback: () => {
              toggleDrawer();
              setWithDrawalAmount("");
              setDescription("");
            },
          });
        }
        if (resp.status === 200 && resp.data?.status == 0) {
          toast.error(resp.data?.message ?? "ثبت درخواست با خطا مواجه شد .");
        }
      },
    });
  };

  const render = () => (
    <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer}>
      <form
        onSubmit={handleSubmit}
        className="p-3 pb-5 d-flex flex-column justify-content-start align-items-stretch gap-3"
      >
        <label htmlFor="withdrawal-input" className="m-0">
          مبلغ مورد نظر را وارد کنید : (تومان)
        </label>
        <PriceMaskInput
          className="auth-input m-0 px-3  "
          type="tel"
          style={{
            borderRadius: "0.5rem",
          }}
          onKeyPress={(e) => {
            const reg1 = new RegExp("^[0-9]+$");
            const reg2 = new RegExp("^[۰-۹]+$");
            if (!reg1.test(e.key) && !reg2.test(e.key)) {
              e.preventDefault();
            }
          }}
          id={"withdrawal-input"}
          value={withDrawalAmount}
          handleChange={handleChange}
          onBlur={handleMoneyInputBlur}
          placeholder="10,000"
        />
        {/* <div className="fs-8 text-danger mt-0">{withDrawalAmountError}</div> */}
        <PriceInputError
          // className="fs-8 text-danger mt-0"
          isOpen={withDrawalAmountError}
        >
          <div style={{ height: "1rem", width: "100%" }}>
            {withDrawalAmountError}
          </div>
        </PriceInputError>
        <label htmlFor="withdraw-description" className="mt-2">
          توضیحات برداشت :
        </label>
        <textarea
          id="withdraw-description"
          className=" py-2 px-3 auth-input"
          onChange={handleDescriptionChange}
          value={description}
          style={{
            height: "120px",
            resize: "none",
            borderRadius: "0.5rem",
          }}
          placeholder={`برای مثال : 
لطفا به شماره کارت زیر واریز شود :

 **** **** **** 6037
          `}
        />
        <Button
          className="mt-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          ثبت درخواست
        </Button>
      </form>
    </Drawer>
  );

  return { render, isOpen, toggleDrawer };
};

export default useWithdrawalRequestDrawer;
