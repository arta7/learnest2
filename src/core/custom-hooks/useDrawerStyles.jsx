import { useWindowDimensions } from "./getWindowDimensions";
import makeStyles from "@mui/styles/makeStyles";

export const useCaculateLeftPixels = () => {
  const { width } = useWindowDimensions();

  if (width <= 800) {
    return 0;
  } else return (width - 800) / 2;
};
const useCaculateLeft = () => {
  const { width } = useWindowDimensions();

  if (width <= 800) {
    return "0px";
  } else return "calc((100vw - 800px)/2)";
};
const useCaculateRight = () => {
  const { width } = useWindowDimensions();

  if (width <= 800) {
    return "0px";
  } else return "calc((100vw - 800px)/2)";
};

export const useLeftDrawerStyles = () => {
  return makeStyles({
    root: {
      maxWidth: "800px",
      margin: "0 auto",
      overflow: "hidden",
      "& .MuiBackdrop-root": {
        maxWidth: "800px",
        margin: "0 auto",
      },
      "& .MuiDrawer-paper": {
        left: useCaculateLeft(),
      },
    },
  })();
};

export const useRightDrawerStyles = () => {
  return makeStyles({
    root: {
      maxWidth: "800px",
      margin: "0 auto",
      overflow: "hidden",
      "& .MuiBackdrop-root": {
        maxWidth: "800px",
        margin: "0 auto",
      },
      "& .MuiDrawer-paper": {
        // position: "absolute"
        right: useCaculateRight(),
      },
    },
  })();
};
