import { STORAGE_KEYS } from "../constants/storageKeys";
import { storageService } from "../services/Storage";

export const useCartStorage = () => {
  const getAllItems = () => {
    return storageService.getItem(STORAGE_KEYS.cart) ?? [];
  };

  const setItem = (id, data) => {
    const items = getAllItems().filter((item) => item.id != id);
    storageService.setItem(STORAGE_KEYS.cart, items.concat(data));
    changeCartCount();
  };

  const removeItem = (id) => {
    const items = getAllItems().filter((item) => item.id != id);
    storageService.setItem(STORAGE_KEYS.cart, items);
    changeCartCount();
  };

  const changeCartCount = () => {
    document.querySelector(".total-price").innerHTML = getAllItems().length;
  };

  return {
    getAllItems,
    setItem,
    removeItem,
  };
};
