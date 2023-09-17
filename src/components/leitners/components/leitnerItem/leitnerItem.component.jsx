import React, { useState, useEffect, useRef } from "react";

import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { imagesBaseUrl, fileBaseUrl } from "../../../../core/services/baseUrl";
import { useSpeechSynthesis } from "react-speech-kit";
import "./leitnerItem.styles.scss";

const LeitnerItem = ({
  id,
  front,
  back,
  imageUrl,
  voiceUrl,
  box,
  shouldStudyToday,
  onDelete,
}) => {
  const [innerCartTransform, set_innerCartTransform] = useState(0);
  // const { speak } = useSpeechSynthesis();
  const audioRef = useRef();
  useEffect(() => {
    if (!audioRef?.current) {
      audioRef.current = new Audio(fileBaseUrl + voiceUrl);
      console.log(audioRef.current);
    }
  }, [audioRef?.current]);

  const handlePlayAudio = () => {
    if (voiceUrl) {
      audioRef?.current?.play();
    }
  };
  //////////
  const handleFlipCart = () => {
    set_innerCartTransform(innerCartTransform === 0 ? 180 : 0);
  };

  const renderCard = ({ isFront = true, text, imgUrl }) => {
    return (
      <div
        className={`flip-card-${
          isFront ? "front" : "back"
        } m-0 p-3 pb-1 d-flex flex-column justify-content-start align-items-center`}
      >
        <div
          className="content d-flex flex-column justify-content-start align-items-center"
          style={{
            marginTop: isFront ? "100px" : "0",
            height: "calc(100% - 45px)",
          }}
        >
          {imgUrl && (
            <div
              style={{
                height: "calc(100% - 100px)",
                height: "calc(100% - 45px)",
              }}
            >
              <img
                className=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={fileBaseUrl + imgUrl}
                alt="..."
              />
            </div>
          )}
          <span className="my-3 fs-6">{text}</span>
          {isFront && (
            <IconButton onClick={handlePlayAudio}>
              <VolumeUpIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <div
          className={
            (isFront ? "justify-content-between" : "justify-content-end") +
            " w-100 mt-auto d-flex flex-row  align-items-center"
          }
        >
          {isFront && (
            <span
              className="text-danger cursor-pointer fs-6"
              onClick={onDelete}
            >
              حذف کارت
            </span>
          )}
          <IconButton className="" onClick={handleFlipCart}>
            <ThreeSixtyIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className="flip-card">
      <div
        style={{
          transform: `rotateY(${innerCartTransform}deg)`,
        }}
        className="flip-card-inner"
      >
        {renderCard({ isFront: true, text: front })}
        {renderCard({ isFront: false, text: back, imgUrl: imageUrl })}
      </div>
    </div>
  );
};

export default LeitnerItem;
