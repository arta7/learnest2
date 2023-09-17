import React, { useState, useEffect } from "react";
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { leitners_apiCalls } from "../../../core/services/agent";
import { fileBaseUrl } from "../../../core/services/baseUrl";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UndoIcon from "@mui/icons-material/Undo";

const CompletedLeitnersPage = () => {
  const { handleOpen, handleClose } = useLoadingContext();
  const [completedLeitnerItems, setCompletedLeitnerItems] = useState([]);
  const { isVocab } = useParams();
  ////
  const deleteFromList = (id) => {
    const clonedCompletedLeitnerItems = JSON.parse(
      JSON.stringify(completedLeitnerItems)
    );
    const index = clonedCompletedLeitnerItems.findIndex(
      (item) => item.id == id
    );
    clonedCompletedLeitnerItems.splice(index, 1);
    setCompletedLeitnerItems(clonedCompletedLeitnerItems);
  };
  ////
  const [initalDataIsFetching, setInitalDataIsFetching] = useState(false);
  const handleGetAll = () => {
    apiCaller({
      api: leitners_apiCalls.apiCall_getCompleteds,
      apiArguments: Boolean(isVocab),
      onStart: () => {
        handleOpen();
        setInitalDataIsFetching(true);
      },
      onEnd: () => {
        handleClose();
        setInitalDataIsFetching(false);
      },
      toastMessage: true,
      onErrorMessage: "دریافت لیست لایتنر با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status == 200 && resp.data.status == 1)
          setCompletedLeitnerItems(resp.data.data);
      },
    });
  };
  const handleDeleteItem = (id) => {
    apiCaller({
      api: leitners_apiCalls.apiCall_deleteItemFromLeitner,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "حذف با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status == 200 && resp.data.status == 1) deleteFromList(id);
      },
    });
  };
  const handleReturnVocabToLeitner = (item) => {
    apiCaller({
      api: leitners_apiCalls.apiCall_addtoleitner,
      apiArguments: {
        front: item?.front,
        back: item?.back,
        isVocab: Boolean(isVocab),
        imageUrl: item?.imageUrl ? "/" + item?.imageUrl : "",
        voiceUrl: item?.voiceUrl ? "/" + item?.voiceUrl : "",
      },
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onSuccessMessage: "با موفقیت به لایتنر افزوده شد",
      onErrorMessage: "افزودن به لایتنر با خطا مواجه شد",
      onSuccess: (resp) => {
        if (resp.status == 200 && resp.data.status == 1)
          deleteFromList(item.id);
      },
    });
  };
  ///////
  useEffect(() => {
    if (isVocab == "false" || isVocab == "true") handleGetAll();
  }, [isVocab]);
  ///////
  return (
    <div className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      {initalDataIsFetching && "در حال بارگذاری ..."}
      {!initalDataIsFetching &&
        completedLeitnerItems?.length == 0 &&
        "در حال حاضر شما لایتنر تکمیل شده ای ندارید ."}
      {completedLeitnerItems?.length > 0 &&
        completedLeitnerItems.map((it) => (
          <div className="m-0 mt-3 p-3 shadow rounded rounded-lg d-flex flex-column justify-content-start align-items-stretch">
            <div className="m-0 mt-0 d-flex flex-row justify-content-between align-items-stretch">
              {it.imageUrl && (
                <div className="me-3">
                  <img
                    style={{ maxHeight: "100%", width: "70px" }}
                    src={
                      fileBaseUrl +
                      (it.imageUrl.startsWith("u")
                        ? it.imageUrl
                        : "u" + it.imageUrl)
                    }
                  />
                </div>
              )}
              <div className="flex-grow-1 d-flex flex-row justify-content-between align-items-baseline">
                <span className="fs-6">{it?.front ?? ""}</span>
                <span className="fs-6 ">{it?.back ?? ""}</span>
              </div>
            </div>
            <div className="mt-2 align-self-end d-flex flex-row-reverse justify-content-start align-items-stretch gap-2">
              <span>
                <Button
                  className="mt-2 pe-0"
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    handleDeleteItem(it.id);
                  }}
                  endIcon={<DeleteForeverIcon className="ms-2" />}
                >
                  حذف
                </Button>
              </span>
              <span>
                <Button
                  className="mt-2 pe-0"
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    handleReturnVocabToLeitner(it);
                  }}
                  endIcon={<UndoIcon className="ms-2" />}
                >
                  برگرداندن به لایتنر
                </Button>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CompletedLeitnersPage;
