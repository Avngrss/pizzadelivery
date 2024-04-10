import { TOAST_TYPE } from "../../constants/toast";

export const getToastType = (type) => {
  const types = {
    [TOAST_TYPE.error]: "bg-red-500",
    [TOAST_TYPE.info]: "bg-blue-500",
    [TOAST_TYPE.warning]: "bg-yellow-500",
    [TOAST_TYPE.success]: "bg-green-500",
  };

  return types[type];
};
