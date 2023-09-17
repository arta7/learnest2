import React, { useState, useEffect, useReducer, useRef } from "react";

import parse from "html-react-parser";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import { fileBaseUrl } from "../../../core/services/baseUrl";
import { hasPersianCharacter } from "../../../core/utils/utils";
//mui icons
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { Dialog, IconButton } from "@mui/material";
import Toolbar from "../../toolbar/toolbar.component";
import useVisibilityChange from "../../../core/custom-hooks/useVisibilityChange.hook";
import WithTextSelection from "../../withTextSelection.hoc";
import VideoPlayer from "../../videoPlayer.component";

const TwoStepQuestion = ({ ...rest }) => {
  const {
    id,
    title,
    content,
    voiceUrl,
    videoUrl,
    imageUrl,
    difficulty,
    data,
    questionType,
  } = rest;
  const { children } = rest;

  const adiuoPlayerRef = useRef();
  const adiuoPlayerRef1 = useRef();
  const videoPlayerRef = useRef();
  const videoPlayerRef1 = useRef();

  useVisibilityChange({
    onHide: () => {
      if (videoPlayerRef?.current) videoPlayerRef?.current?.pause();
      if (adiuoPlayerRef?.current) adiuoPlayerRef?.current?.pause();
      if (videoPlayerRef1?.current) videoPlayerRef1?.current?.pause();
      if (adiuoPlayerRef1?.current) adiuoPlayerRef1?.current?.pause();
    },
  });

  const [part, set_part] = useState(1);

  const goto_nextPart = () => {
    if (part < 3) {
      set_part(part + 1);
      document.querySelector(".hidden-scrollbar").scrollTop = 0;
    }
  };
  const goto_PreviousPart = () => {
    if (part >= 2) {
      set_part(part - 1);
    }
  };

  const dialogsInitialState = {
    showVideo: false,
    showAudio: false,
    showImage: false,
  };
  const dialogsActions = {
    SHOWIMAGE: "SHOWIMAGE",
    SHOWAUDIO: "SHOWAUDIO",
    SHOWVIDEO: "SHOWVIDEO",
  };
  const dialogsReducer = (state, action) => {
    switch (action.type) {
      case dialogsActions.SHOWIMAGE:
        return { ...state, showImage: !state.showImage };
      case dialogsActions.SHOWAUDIO:
        return { ...state, showAudio: !state.showAudio };
      case dialogsActions.SHOWVIDEO:
        return { ...state, showVideo: !state.showVideo };
    }
  };
  const [dialogsState, dispatch_dialogsState] = useReducer(
    dialogsReducer,
    dialogsInitialState
  );

  return (
    <section className="m-0 p-0 q-page pb-6">
      {/* <Toolbar isVocab={false} isBookmark={false}  /> */}
      <div className="m-0  px-3 pb-6 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
        {part === 1 && (
          <div
            dir="auto"
            className="mb-5 question-firstview d-flex flex-column justify-content-start align-items-stretch"
          >
            <div dir={"auto"} className="m-0 p-0 my-3 fw-bold fs-6">
              {title}
            </div>
            {content && content?.trim() !== "" && (
              <div dir={"auto"} className="m-0 p-0 my-3">
                <WithTextSelection>
                  {parse(
                    content.toString()?.replaceAll("<p>", '<p dir="auto">')
                  )}
                </WithTextSelection>
              </div>
            )}
            {imageUrl && imageUrl?.trim() !== "" && (
              <div className="m-0 p-0 my-3 d-flex flex-column justify-content-start align-items-center">
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                  }}
                  src={fileBaseUrl + imageUrl}
                  alt="..."
                  className=""
                />
              </div>
            )}
            {voiceUrl && voiceUrl?.trim() !== "" && (
              <div className="m-0 p-0 my-3">
                {/* <ReactAudioPlayer
                  style={{ width: "100%" }}
                  src={fileBaseUrl + voiceUrl}
                  controls
                /> */}
                <audio style={{ width: "100%" }} ref={adiuoPlayerRef} controls>
                  <source
                    src={fileBaseUrl + voiceUrl}
                    // type="audio/mp3"
                  />
                </audio>
              </div>
            )}
            {videoUrl && videoUrl?.trim() !== "" && (
              <div dir="ltr" className="m-0 p-0 my-3">
                {/* <video
                  ref={videoPlayerRef}
                  controls
                  width="100%"
                  height={"auto"}
                  muted={false}
                >
                  <source src={fileBaseUrl + videoUrl} />
                </video> */}
                <VideoPlayer url={videoUrl} />
              </div>
            )}

            <Button
              className="mt-auto"
              variant="contained"
              onClick={goto_nextPart}
            >
              مشاهده سوال
            </Button>
          </div>
        )}
        <div
          className={(part === 2 ? "" : "d-none") + " question-secondview pb-6"}
        >
          <div className="mb-2 m-0 py-2 d-flex flex-row justify-content-between align-item-center">
            {videoUrl && videoUrl?.trim() !== "" && (
              <>
                <IconButton
                  onClick={() => {
                    dispatch_dialogsState({ type: dialogsActions.SHOWVIDEO });
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <OndemandVideoIcon color="primary" fontSize="large" />
                  <span className="" style={{ fontSize: "0.5rem" }}>
                    مشاهده ویدیو
                  </span>
                </IconButton>
                <Dialog
                  open={dialogsState.showVideo}
                  onClose={() => {
                    dispatch_dialogsState({ type: dialogsActions.SHOWVIDEO });
                  }}
                >
                  <div dir="ltr" className="m-0 p-0 p-3">
                    {/* <video
                      ref={videoPlayerRef1}
                      controls
                      width="100%"
                      height={"auto"}
                      muted={false}
                    >
                      <source src={fileBaseUrl + videoUrl} />
                    </video> */}
                    <VideoPlayer url={videoUrl} />
                  </div>
                </Dialog>
              </>
            )}
            {imageUrl && imageUrl?.trim() !== "" && (
              <>
                <IconButton
                  onClick={() => {
                    dispatch_dialogsState({ type: dialogsActions.SHOWIMAGE });
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <PhotoCameraBackIcon color="primary" fontSize="large" />
                  <span className="" style={{ fontSize: "0.5rem" }}>
                    مشاهده تصویر
                  </span>
                </IconButton>
                <Dialog
                  open={dialogsState.showImage}
                  onClose={() => {
                    dispatch_dialogsState({ type: dialogsActions.SHOWIMAGE });
                  }}
                >
                  <div className="m-0 p-0 p-3 d-flex flex-column justify-content-start align-items-center">
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                      }}
                      alt="..."
                      src={fileBaseUrl + imageUrl}
                    />
                  </div>
                </Dialog>
              </>
            )}
            {voiceUrl && voiceUrl?.trim() !== "" && part === 2 && (
              <audio
                style={{ width: "100%" }}
                ref={adiuoPlayerRef1}
                controls
                className="question-audio"
              >
                <source src={fileBaseUrl + voiceUrl} />
              </audio>
            )}
          </div>
          <div className="d-none" id="see-question" onClick={goto_PreviousPart}>
            مشاهده صورت سوال
          </div>
          {children}
        </div>
        {part === 3 && <div className="question-thirdview"></div>}
      </div>
    </section>
  );
};

export default TwoStepQuestion;

/*
   <div className="mb-2 m-0 p-2 d-flex flex-row justify-content-between align-item-center">
              {videoUrl && videoUrl?.trim() !== "" && (
                <>
                  <IconButton
                    onClick={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWVIDEO });
                    }}
                  >
                    <OndemandVideoIcon color="primary" fontSize="large" />
                  </IconButton>
                  <Dialog
                    open={dialogsState.showVideo}
                    onClose={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWVIDEO });
                    }}
                  >
                    <div className="m-0 p-0 p-3">
                      <ReactPlayer url={fileBaseUrl + videoUrl} />
                    </div>
                  </Dialog>
                </>
              )}
              {imageUrl && imageUrl?.trim() !== "" && (
                <>
                  <IconButton
                    onClick={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWIMAGE });
                    }}
                  >
                    <PhotoCameraBackIcon color="primary" fontSize="large" />
                  </IconButton>
                  <Dialog
                    open={dialogsState.showImage}
                    onClose={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWIMAGE });
                    }}
                  >
                    <div className="m-0 p-0 p-3 d-flex flex-column justify-content-start align-items-center">
                      <img
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                        }}
                        alt="..."
                        src={fileBaseUrl + imageUrl}
                      />
                    </div>
                  </Dialog>
                </>
              )}
              {voiceUrl && voiceUrl?.trim() !== "" && (
                <>
                  <IconButton
                    onClick={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWAUDIO });
                    }}
                  >
                    <MusicVideoIcon color="primary" fontSize="large" />
                  </IconButton>
                  <Dialog
                    open={dialogsState.showAudio}
                    onClose={() => {
                      dispatch_dialogsState({ type: dialogsActions.SHOWAUDIO });
                    }}
                  >
                    <div className="m-0 p-0 p-3">
                      <ReactAudioPlayer
                        src={fileBaseUrl + voiceUrl}
                        controls
                      />
                    </div>
                  </Dialog>
                </>
              )}
            </div>
*/
