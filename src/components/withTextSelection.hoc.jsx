import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { API_URLs } from "../core/services/CONSTANTS";
import { Button, IconButton } from "@mui/material";
import { useHandleAddToLeitner } from "./toolbar/components/addToLeitner.component";
import { useLoadingContext } from "../core/contexts/loading/loading";
import { apiCaller } from "../core/custom-hooks/useApi";
import { leitners_apiCalls } from "../core/services/agent";
import CloseIcon from "@mui/icons-material/Close";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

export const Popover = ({
  clientRect,
  handleClosePopover,
  meaning,
  handleAddToLeitner,
  hasItemAddedToLeitner,
}) => {
  console.log(hasItemAddedToLeitner);
  //////////
  //////////
  if (clientRect == null || !meaning) return null;
  //////////
  //////////

  const style = {
    position: "absolute",
    left: `${clientRect.left + clientRect.width / 2}px`,
    top: `${clientRect.top - (hasItemAddedToLeitner ? 40 : 90)}px`,
    marginLeft: `-${hasItemAddedToLeitner ? 50 : 75}px`,
    width: `${hasItemAddedToLeitner ? 100 : 150}px`,
    background: "#fff",
    boxShadow: `0 0 5px 3px #ebebeb`,
    padding: "0rem",
    textAlign: "center",
    color: "#333",
    borderRadius: "3px",
    zIndex: 1400,
  };
  //////////////
  const onClick = (e) => {
    e.stopPropagation();
    handleClosePopover();
  };

  return (
    <Portal>
      <ClickAwayListener onClickAway={onClick}>
        <div
          style={style}
          className="d-flex flex-column justify-content-start align-items-stretch"
        >
          {/* <IconButton onClick={onClick}> */}
          <div className="position-relative">
            <CancelIcon
              onClick={onClick}
              className="align-self-end"
              color="error"
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                cursor: "pointer",
              }}
            />
          </div>
          {/* </IconButton> */}
          <div className="p-2 pt-1 d-flex flex-column justify-content-start align-items-center">
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
  const [isFetching, set_isFetching] = useState(false);
  let controller;
  // const [controller, set_controller] = useState();
  useEffect(() => {
    // console.log(controller);
  }, [controller]);
  const callApi = async (txt) => {
    // if (isFetching) {
    if (isFetching) return;
    // return;
    // }
    controller = new AbortController();
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

  //////////////
  const { handleOpen, handleClose } = useLoadingContext();
  const [leitnerHistory, set_leitnerHistory] = useState([]);
  const hasItemAddedToLeitner = (selectedText) => {
    // console.log(
    //   leitnerHistory.some((item) => item.selectedText === selectedText)
    // );
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
      onSuccess: (resp) => {
        if (resp.status == 200) {
          if (resp.data.status == 0) {
            toast.error("افزودن به لایتنر با خطا مواجه شد");
          }
          if (resp.data.status == 1) {
            toast.success("با موفقیت به لایتنر افزوده شد");
            set_leitnerHistory([
              ...leitnerHistory,
              {
                front: selectedText,
                back: meaning,
                isVocab: true,
              },
            ]);
          } else if (resp.data.status == 2) {
            toast.warning("این لغت از قبل وارد لایتنر شده است .");
          }
        }
      },
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
  useEffect(() => {
    if (selectedText) {
      const { exists, index } = checkoutInMeaningsHistory(selectedText);
      if (!exists) {
        if (isFetching) controller?.abort();
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
  }, [selectedText]);
  //////////////
  const [clientRect, set_clientRect] = useState(null);
  const ref = useRef();
  const selectedRef = useRef();

  const handleClosePopover = () => {
    if (isFetching) {
      controller?.abort();
      return;
    }
    // controller?.abort();
    set_clientRect(null);
    set_meaning(null);
    selectedRef.current.style.color = "inherit";
    selectedRef.current = null;
    set_selectedText(null);
  };

  const handleClick = (e) => {
    if (isFetching) {
      return;
    }
    if (selectedRef?.current) {
      selectedRef.current.style.color = "inherit";
      return;
    }

    set_selectedText(e.target.innerText);
    selectedRef.current = e.target;

    set_clientRect(e.target.getBoundingClientRect());
  };
  /////////
  useEffect(() => {
    ref?.current?.querySelectorAll("span").forEach((node) => {
      node.addEventListener("click", handleClick);
    });
    ref?.current?.querySelectorAll("u").forEach((node) => {
      node.addEventListener("click", handleClick);
    });
    ref?.current?.querySelectorAll("em").forEach((node) => {
      node.addEventListener("click", handleClick);
    });

    return () => {
      ref?.current?.querySelectorAll("span").forEach((node) => {
        node.removeEventListener("click", handleClick);
      });
      ref?.current?.querySelectorAll("u").forEach((node) => {
        node.removeEventListener("click", handleClick);
      });
      ref?.current?.querySelectorAll("em").forEach((node) => {
        node.removeEventListener("click", handleClick);
      });
    };
  }, []);
  ///////////
  const handleClickOnParent = (e) => {
    // console.log("first");
  };
  ///////////

  return (
    <>
      <Popover
        handleClosePopover={handleClosePopover}
        clientRect={clientRect}
        meaning={meaning}
        handleAddToLeitner={handleAddToLeitner}
        hasItemAddedToLeitner={hasItemAddedToLeitner(selectedText)}
      />
      <div
        ref={ref}
        onClick={handleClickOnParent}
        className={className + " p-0 m-0 w-100 h-100"}
      >
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
