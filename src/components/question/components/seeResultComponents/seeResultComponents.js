import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";
import { useWindowDimensions } from "../../../../core/custom-hooks/getWindowDimensions";
import WithTextSelection from "../../../withTextSelection.hoc";
var ReactFitText = require("react-fittext");

const SeeResultComponents = ({
  className = "",
  hiddenContent,
  baseAnsweringType,
  gotoNextQuestion,
  isLastQuestion,
  answeringResult,
  handleSeeResult,
  handleDontShowAgain,
  enableOptionalButtons,
}) => {
  const [showExplain, set_showExplain] = useState(false);
  /////////////////////
  const { width } = useWindowDimensions();
  /////////////////////
  const handleToggleExplainQuestion = () => {
    set_showExplain(!showExplain);
  };
  /////////////////////
  const getButtonText = () => {
    if (isLastQuestion) {
      if (baseAnsweringType === 3) {
        return "ادامه";
      }
      return "بازگشت";
    } else {
      return "سوال بعدی";
    }
  };
  /////////////////////
  const getHiddenContentText = (text) => {
    let str = text;
    if (text?.includes("\r\n")) {
      for (let i = 0; i < text?.split("\r\n")?.length - 1; i++) {
        str = str.replace("\r\n", "<br />");
      }
    }
    return str;
  };
  /////////////////////
  const hasHiddenContent = (hd) => {
    if (hd) {
      if (
        hd.toString().trim() !== "<p><br/></p>" &&
        hd.toString().trim() !== "" &&
        hd.toString().trim() !== "<p></p>" &&
        hd.toString().trim() !== "<p><br/><br/></p>"
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  /////////////////////
  const renderAudioComponent = () => {
    if (document.querySelector(".question-audio")) {
      const audioSrc = document
        .querySelector(".question-audio")
        .getElementsByTagName("source")[0]
        .getAttribute("src");
      if (audioSrc)
        return (
          <div className="mb-3 m-0 p-3">
            <audio controls className="w-100">
              <source src={audioSrc} />
            </audio>
          </div>
        );

      return <></>;
    }

    return <></>;
  };
  /////////////////////
  const handleAnswerAgain = () => {
    if (document.getElementById("answer-again-btn")) {
      document.getElementById("answer-again-btn").click();
    }
  };
  /////////////////////
  const getTextFontSize = () => {
    if (width < 545 && width >= 465) {
      return "12px !important";
    }
    if (width < 465 && width >= 410) return "11px !important";
    if (width < 410 && width >= 380) return "10px !important";
    return "9px !important";
  };

  /////////////////////
  return (
    <div
      className={
        className +
        " w-100 m-0 p-0 d-flex flex-row justify-content-center align-items-baseline"
      }
    >
      {!answeringResult && baseAnsweringType !== 3 && (
        <Button
          // sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
          variant="contained"
          color="primary"
          onClick={handleSeeResult}
          className="w-100"
        >
          مشاهده نتیجه
        </Button>
      )}
      {!answeringResult && baseAnsweringType === 3 && (
        <Button
          // sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
          variant="contained"
          color="primary"
          onClick={handleSeeResult}
          className="w-100"
        >
          سوال بعدی
        </Button>
      )}

      {answeringResult && (
        <div className="m-0 w-100  p-2 d-flex flex-row flex-wrap justify-content-center align-items-stretch">
          <>
            <div
              className={
                (parseInt(answeringResult?.status) === 0 &&
                baseAnsweringType !== 3 &&
                hasHiddenContent(hiddenContent)
                  ? "col-4"
                  : parseInt(answeringResult?.status) !== 0 &&
                    baseAnsweringType === 3 &&
                    !hasHiddenContent(hiddenContent)
                  ? "col-12"
                  : "col-6") + " m-0 pe-1 "
              }
            >
              <Button
                className={"w-100 h-100 text-nowrap"}
                variant="contained"
                color="primary"
                onClick={() => {
                  gotoNextQuestion(parseInt(answeringResult?.status) === 1);
                }}
                sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
              >
                {getButtonText()}
              </Button>
            </div>
            {hasHiddenContent(hiddenContent) && (
              <div
                className={
                  (parseInt(answeringResult?.status) === 0 &&
                  baseAnsweringType !== 3
                    ? "col-4"
                    : "col-6") + " m-0 px-1 "
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleToggleExplainQuestion}
                  endIcon={
                    <VisibilityIcon
                      className="ms-2 m-0 p-0"
                      fontSize="inherit"
                    />
                  }
                  className="w-100 h-100 text-nowrap pe-1"
                  sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
                >
                  پاسخنامه تشریحی
                </Button>
              </div>
            )}
          </>

          {parseInt(answeringResult?.status) === 0 && baseAnsweringType !== 3 && (
            <>
              <div
                className={
                  (hasHiddenContent(hiddenContent) ? "col-4" : "col-6") +
                  " m-0 ps-1 "
                }
              >
                <Button
                  className={"w-100 h-100 text-nowrap"}
                  variant="contained"
                  color="primary"
                  onClick={handleAnswerAgain}
                  sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
                >
                  پاسخ دهی مجدد
                </Button>
              </div>

              {enableOptionalButtons && (
                <Button
                  className="m-0 mt-2 text-nowrap col-12"
                  variant="outlined"
                  color="primary"
                  onClick={handleDontShowAgain}
                  // sx={width < 545 ? { fontSize: getTextFontSize() } : {}}
                >
                  دیگر این سوال را نشان نده
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {hiddenContent && (
        <Dialog onClose={handleToggleExplainQuestion} open={showExplain}>
          {renderAudioComponent()}
          <div
            dir={"auto"}
            className="m-0 p-3 answersheet-explanations"
            style={{
              minHeight: "300px",
              minWidth: "250px",
            }}
          >
            <WithTextSelection>
              {parse(
                getHiddenContentText(hiddenContent)
                  ?.toString()
                  ?.replaceAll("<p>", '<p dir="auto">')
              )}
            </WithTextSelection>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default SeeResultComponents;
