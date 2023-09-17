import React, { useCallback, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";

import defImg from "../../../../../assets/img/babak-images/play-button.png";
import speakerAvatar from "../../../../../assets/img/speecher.jpeg";
import "./style/style.css";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";
import { useWindowDimensions } from "../../../../../core/custom-hooks/getWindowDimensions";
import useVisibilityChange from "../../../../../core/custom-hooks/useVisibilityChange.hook";
import WithTextSelection from "../../../../../components/withTextSelection.hoc";
import VideoPlayer from "../../../../../components/videoPlayer.component";
// import { useTextSelection } from "use-text-selection";

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}

const SessionPartSlideItem = (props) => {
  const { data = null } = props;

  const adiuoPlayerRef = useRef();
  // const videoPlayerRef = useRef();

  // const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  useVisibilityChange({
    onHide: () => {
      // if (videoPlayerRef?.current) videoPlayerRef?.current?.pause();
      // if (videoIsPlaying) setVideoIsPlaying(false);
      if (adiuoPlayerRef?.current) adiuoPlayerRef?.current?.pause();
    },
  });

  // useEffect(() => {
  //   console.log("videoIsPlaying : ", videoIsPlaying);
  // }, [videoIsPlaying]);

  return (
    <div
      dir="rtl"
      className=" tiny-scrollbar m-0 p-3 mx-auto grammar-item-holder"
    >
      {/*************** Has Voice ***************/}
      {data?.voiceUrl && data?.voiceUrl?.endsWith(".mp3") ? (
        <>
          <div className="p-0 m-0 mx-auto grammar-img-holder d-flex flex-column justify-content-start align-items-center">
            {data?.teacherImageUrl && (
              <img
                src={fileBaseUrl + data?.teacherImageUrl || ""}
                alt="NO_PIC"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  borderRadius: "1rem",
                }}
                className="grammar-img"
              />
            )}
            <strong className="my-3">
              {"استاد : " + data?.teacherName || ""}
            </strong>
          </div>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center mx-auto my-5">
            <audio ref={adiuoPlayerRef} controls>
              <source src={fileBaseUrl + data?.voiceUrl} type="audio/mp3" />
            </audio>
          </div>
        </>
      ) : (
        <></>
      )}
      {/*************** HAS VIDEO ***************/}

      {data?.voiceUrl &&
      (data?.voiceUrl?.endsWith(".mp4") || data?.voiceUrl?.endsWith(".m4v")) ? (
        <>
          {/* <video
            ref={videoPlayerRef}
            controls
            width="100%"
            height={"auto"}
            muted={false}
          >
            <source src={fileBaseUrl + data?.voiceUrl} />
          </video> */}
          <div className="w-100" dir="ltr" style={{ height: "auto" }}>
            <VideoPlayer url={data?.voiceUrl} />
          </div>
          <br />

          <WithTextSelection>
            {data?.content
              ? parse(
                  data?.content?.toString()?.replaceAll("<p>", '<p dir="auto">')
                )
              : null}
          </WithTextSelection>
        </>
      ) : (
        <></>
      )}

      {/*************** neither has VOICE nor VIDEO ***************/}

      {data?.content && !data?.voiceUrl ? (
        <div className="px-2 my-3">
          <WithTextSelection>
            {data?.content
              ? parse(
                  data?.content?.toString()?.replaceAll("<p>", '<p dir="auto">')
                )
              : null}
          </WithTextSelection>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SessionPartSlideItem;
