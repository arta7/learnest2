import React, { useState, useEffect, useRef } from "react";

const useInterval = ({
  period = 1000,
  onSecondsChangeCallback,
  intervalCallback,
}) => {
  //////////////
  const [seconds, setSeconds] = useState(0);
  const interval = useRef(null);
  //
  useEffect(() => {
    if (onSecondsChangeCallback) {
      onSecondsChangeCallback(seconds);
    }
  }, [seconds]);
  //
  const startCounter = () => {
    interval.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
      if (intervalCallback) {
        intervalCallback();
      }
    }, period);
  };
  //
  const stopCounter = () => clearInterval(interval.current);
  //
  useEffect(() => {
    startCounter();
    return () => {
      stopCounter();
    };
  }, []);
  //

  return {
    secondsPassed: seconds,
    intervalRef: interval,
    stopCounter: stopCounter,
  };
};

export default useInterval;
