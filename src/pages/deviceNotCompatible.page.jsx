import { isAndroid, isIos } from "../core/utils/utils";

const DeviceNotCompatible = () => {
  return (
    <div className="text-center p-3 pt-5 w-100-vw h-100-vh">
      {isIos() && (
        <h3 className="text-center  mt-5">
          کاربر گرامی متاسفانه وب اپ لرنست با ورژن IOS 11 به پایین سازگار نیست .
        </h3>
      )}
      {isAndroid() && (
        <h3 className="text-center mt-5">
          کاربر گرامی متاسفانه وب اپ لرنست با ورژن اندروید پایین تر از 7 سازگار
          نیست .
        </h3>
      )}
    </div>
  );
};

export default DeviceNotCompatible;
