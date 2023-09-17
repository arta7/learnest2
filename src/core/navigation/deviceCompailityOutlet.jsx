import { Navigate, Outlet } from "react-router";
import {
  getAndroidVersion,
  isAndroid,
  isIos,
  checkIosVersion,
} from "../utils/utils";

const DeviceCompabilityOutlet = () => {
  if (isAndroid() && parseInt(getAndroidVersion()) >= 7) return <Outlet />;
  if (isIos() && parseInt(checkIosVersion()) > 11) return <Outlet />;

  return <Navigate to="/device-not-compatible" />;
};

export default DeviceCompabilityOutlet;
