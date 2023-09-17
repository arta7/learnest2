import React, { useState, useEffect } from "react";
import { useRef } from "react";
import {
  Player,
  LoadingSpinner,
  BigPlayButton,
  ControlBar,
  ForwardControl,
  VolumeMenuButton,
  PlaybackRateMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import useVisibilityChange from "../core/custom-hooks/useVisibilityChange.hook";
import { fileBaseUrl } from "../core/services/baseUrl";
///////
const VideoPlayer = ({ videoProps = {}, url = "" }) => {
  const videoPlayerRef = useRef();
  useVisibilityChange({
    onHide: () => {
      videoPlayerRef.current.actions.pause();
    },
  });

  console.log(videoProps);

  return (
    <Player
      ref={videoPlayerRef}
      muted={false}
      width="100%"
      height={"auto"}
      {...videoProps}
    >
      <source src={fileBaseUrl + url} />
      <LoadingSpinner />
      <BigPlayButton position="center" />
      <ControlBar autoHide={false}>
        <VolumeMenuButton vertical order={3.1} />
        {/* <ForwardControl seconds={5} order={3.2} /> */}
        {/* <PlaybackRateMenuButton rates={[2, 1, 0.5]} /> */}
      </ControlBar>
    </Player>
  );
};

export default VideoPlayer;
