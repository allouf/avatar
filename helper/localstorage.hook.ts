export enum LocalStorageKeys {
  REGISTERED_USER_EMAIL = "registeredUserEmail",
}

export const isWindowInit = typeof window !== "undefined";

export const useLocalStorage = (key: LocalStorageKeys) => {
  const setItem = (value: unknown) => {
    try {
      if (isWindowInit) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log("Error setting from localstorage:", error);
    }
  };

  const getItem = () => {
    try {
      if (isWindowInit) {
        return JSON.parse(window.localStorage.getItem(key)!);
      }
    } catch (error) {
      console.log("Error getting from localstorage:", error);
    }
  };

  const removeItem = () => {
    try {
      if (isWindowInit) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log("Error removing from localstorage:", error);
    }
  };

  return { setItem, getItem, removeItem };
};
