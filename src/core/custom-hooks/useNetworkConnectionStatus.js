import React, { useState, useEffect } from "react";
const useNetworkConnectionStatus = () => {
  const [isOnline, set_isOnline] = useState(true);

  const becameOnline = () => {
    alert("isOnline");
    set_isOnline(true);
  };
  const becameOffline = () => {
    alert("isOffline");
    set_isOnline(false);
  };

  useEffect(() => {
    window.addEventListener("online", becameOnline);
    window.addEventListener("offline", becameOffline);

    return () => {
      window.removeEventListener("online", becameOnline);
      window.removeEventListener("offline", becameOffline);
    };
  });

  return { isOnline: isOnline };
};

export default useNetworkConnectionStatus;
