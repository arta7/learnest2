import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { API_URLs } from "../core/services/CONSTANTS";
import { Button } from "@mui/material";
import { useHandleAddToLeitner } from "./toolbar/components/addToLeitner.component";
import { useLoadingContext } from "../core/contexts/loading/loading";
import { apiCaller } from "../core/custom-hooks/useApi";
import { leitners_apiCalls } from "../core/services/agent";

////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

export const Popover = ({
  checkoutInMeaningsHistory,
  set_clientRect,
  clientRect,
  handleClosePopover,
  meaning,
  set_meaning,
  selectedText,
  set_selectedText,
  handleAddToLeitner,
  hasItemAddedToLeitner,
  addToMeaningsHistory,
  meaningsHistory,
  selectedRef,
}) => {
  //////////
  //////////
  //////////
  //////////
  const style = {
    position: "absolute",
    left: `${clientRect?.left + clientRect?.width / 2}px`,
    top: `${clientRect?.top - (hasItemAddedToLeitner ? 40 : 90)}px`,
    marginLeft: `-${hasItemAddedToLeitner ? 50 : 75}px`,
    width: `${hasItemAddedToLeitner ? 100 : 150}px`,
    background: "#fff",
    boxShadow: `0 0 5px 3px #ebebeb`,
    padding: "0.5rem",
    textAlign: "center",
    color: "#333",
    borderRadius: "3px",
  };
  //////////////
  const [isFetching, set_isFetching] = useState(false);
  let controller;

  useEffect(() => {
    controller = new AbortController();

    const callApi = async (txt) => {
      // if (isFetching) {
      // if (isFetching) controller.abort();
      // return;
      // }

      // set_controller(new AbortController());
      set_isFetching(true);
      return await axios
        .get(API_URLs.dictionary.search + "?search=" + txt, {
          signal: controller.signal,
        })
        .then((resp) => {
          if (resp.status === 200 && resp?.data?.status == 1) {
            return resp.data.data.meaning;
          }
        })
        .catch((ex) => {
          return null;
        })
        .finally(() => {
          set_isFetching(false);
        });
    };

    if (selectedText) {
      const { exists, index } = checkoutInMeaningsHistory(selectedText);
      if (!exists) {
        // if (isFetching) controller?.abort();
        callApi(selectedText).then((data) => {
          if (data) {
            set_meaning(data);
            addToMeaningsHistory(selectedText, data);
            selectedRef.current.style.color = "red";
          } else {
            set_selectedText(null);
            set_clientRect(null);
            if (selectedRef?.current) {
              selectedRef.current.style.color = "inherit";
              selectedRef.current = null;
            }
          }
        });
      } else {
        set_meaning(meaningsHistory[index].meaning);
        selectedRef.current.style.color = "red";
      }
    }

    return () => controller?.aboart();
  }, []);
  //////////////
  const onClick = (e) => {
    e.stopPropagation();
    controller?.aboart();
    handleClosePopover();
  };

  return (
    <Portal>
      <ClickAwayListener onClickAway={onClick}>
        <div
          style={style}
          className="d-flex flex-column justify-content-start align-items-center"
        >
          {/* <div className="border p-2" onClick={onClick}>
            close
          </div> */}
          <div>{meaning}</div>
          {!hasItemAddedToLeitner && (
            <>
              <hr className="my-1 w-100" />
              <div className="mt-1 p-0 m-0">
                <Button
                  onClick={handleAddToLeitner}
                  variant="contained"
                  color="primary"
                  className="text-nowrap w-100"
                >
                  افزودن به لایتنر
                </Button>
              </div>
            </>
          )}
        </div>
      </ClickAwayListener>
    </Portal>
  );
};
////////////////////////
////////////////////////
////////////////////////
////////////////////////
const WithTextSelection = ({ children, className = "" }) => {
  ///

  //////////////
  const { handleOpen, handleClose } = useLoadingContext();
  const [leitnerHistory, set_leitnerHistory] = useState([]);
  const hasItemAddedToLeitner = (selectedText) => {
    console.log(
      leitnerHistory.some((item) => item.selectedText === selectedText)
    );
    return leitnerHistory.some((item) => item.front === selectedText);
  };

  const handleAddToLeitner = async () => {
    if (hasItemAddedToLeitner(selectedText)) return;
    await apiCaller({
      api: leitners_apiCalls.apiCall_addtoleitner,
      apiArguments: {
        front: selectedText,
        back: meaning,
        isVocab: true,
      },
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onSuccess: () => {
        set_leitnerHistory([
          ...leitnerHistory,
          {
            front: selectedText,
            back: meaning,
            isVocab: true,
          },
        ]);
      },
      onSuccessMessage: "با موفقیت به لایتنر افزوده شد",
      onErrorMessage: "افزودن به لایتنر با خطا مواجه شد",
    });
  };
  //////////
  //////////
  const [meaningsHistory, set_meaningsHistory] = useState([]);
  const checkoutInMeaningsHistory = (phrase) => {
    if (meaningsHistory?.length > 0) {
      const index = meaningsHistory?.findIndex(
        (item) => item.phrase === phrase
      );

      return { exists: index >= 0, index };
    }

    return { exists: false, index: -1 };
  };
  const addToMeaningsHistory = (phrase, meaning) => {
    set_meaningsHistory([
      ...meaningsHistory,
      { phrase: phrase, meaning: meaning },
    ]);
  };
  /////
  const [meaning, set_meaning] = useState("");
  const [selectedText, set_selectedText] = useState("");

  //////////////
  const [clientRect, set_clientRect] = useState(null);
  const ref = useRef();
  const selectedRef = useRef();

  const handleClosePopover = () => {
    set_clientRect(null);
    set_meaning(null);
    selectedRef.current.style.color = "inherit";
    selectedRef.current = null;
    set_selectedText(null);
  };

  const handleClick = (e) => {
    // if (isFetching) controller?.abort();
    if (selectedRef?.current) {
      selectedRef.current.style.color = "inherit";
    }

    set_selectedText(e.target.innerText);
    selectedRef.current = e.target;
    // console.log(selectedRef.current);
    set_clientRect(e.target.getBoundingClientRect());
  };
  // useEffect(()=>{})
  /////////
  useEffect(() => {
    ref?.current?.querySelectorAll("span").forEach((node) => {
      node.addEventListener("click", handleClick);
    });
    ref?.current?.querySelectorAll("u").forEach((node) => {
      node.addEventListener("click", handleClick);
    });

    return () => {
      ref?.current?.querySelectorAll("span").forEach((node) => {
        node.removeEventListener("click", handleClick);
      });
      ref?.current?.querySelectorAll("u").forEach((node) => {
        node.removeEventListener("click", handleClick);
      });
    };
  }, []);
  ///////////

  return (
    <>
      {clientRect && selectedText && (
        <Popover
          selectedText={selectedText}
          set_selectedText={set_selectedText}
          selectedRef={selectedRef}
          handleClosePopover={handleClosePopover}
          set_clientRect={set_clientRect}
          clientRect={clientRect}
          meaning={meaning}
          set_meaning={set_meaning}
          handleAddToLeitner={handleAddToLeitner}
          hasItemAddedToLeitner={hasItemAddedToLeitner(selectedText)}
          addToMeaningsHistory={addToMeaningsHistory}
          checkoutInMeaningsHistory={checkoutInMeaningsHistory}
          meaningsHistory={meaningsHistory}
        />
      )}
      <div ref={ref} className={className + " p-0 m-0 w-100 h-100"}>
        {children}
      </div>
    </>
  );
};

function CallApiWithComponent({ selectedText, onTranslated }) {
  let controller;

  useEffect(() => {
    controller = new AbortController();
    axios
      .post(API_URLs.dictionary.search + "?search=" + selectedText, {
        signal: controller.signal,
      })
      .then((resp) => {
        if (resp.status === 200 && resp?.data?.status == 1) {
          onTranslated(resp.data.data.meaning);
        }
      });

    return controller.abort();
  }, []);

  return <></>;
}

export default WithTextSelection;
